import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prismaClient";
import { compare } from "bcrypt";
import { UserRole } from "@prisma/client";
import argon2 from "argon2";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) { return null }

				const values = {
					email: credentials.email,
				}

				const findUser = await prisma.user.findFirst({ where: values })
				if (!findUser) { return null }

				const isPasswordValid = await compare(credentials.password, findUser.password)
				if (!isPasswordValid) { return null }
				if (!findUser.verified) { return null }

				return {
					id: findUser.id,
					email: findUser.email,
					name: findUser.fullName,
					role: findUser.role,
				}
			}
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: 'USER' as UserRole,
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === 'credentials') {
					return true;
				}

				if (!user.email) {
					return false;
				}

				const findUser = await prisma.user.findFirst({
					where: {
						OR: [
							{ provider: account?.provider, providerId: account?.providerAccountId },
							{ email: user.email },
						],
					}
				})

				if (findUser) {
					await prisma.user.update({
						where: {
							id: findUser.id
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
						},
					})
					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || "Пользователь #" + user.id,
						password: await argon2.hash(user.id.toString(), {
							type: argon2.argon2id,
							hashLength: 32,
							salt: Buffer.from(process.env.NEXTAUTH_SECRET!),
							parallelism: 4,
							timeCost: 4,
						}),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId,
					},
				})

				return true;
			} catch (error) {
				console.error('[LOGIN_CALLBACK]: ', error);
				return false;
			}
		},
		async jwt({ token }) {
			if (!token.email) { return token }

			const findUser = await prisma.user.findFirst({
				where: {
					email: token.email
				},
			})

			if (findUser) {
				token.id = String(findUser.id)
				token.email = findUser.email
				token.fullName = findUser.fullName
				token.role = findUser.role
			}

			return token;
		},
		session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id
				session.user.role = token.role
			}

			return session;
		}
	}
}