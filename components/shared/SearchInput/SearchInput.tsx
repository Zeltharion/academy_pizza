'use client'

import { useRef, useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import { Product } from "@prisma/client"
import { useClickAway, useDebounce } from "react-use"
import { cn } from "@/shared/lib/utils"
import { Search } from "lucide-react"
import { Api } from "@/shared/services"
import s from './SearchInput.module.scss'

interface ISearchInput {
	className?: string
}

export const SearchInput: React.FC<ISearchInput> = ({ className }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [focused, setFocused] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const searchInputRef = useRef(null);

	useClickAway(searchInputRef, () => {
		setFocused(false);
	})

	useDebounce(async () => {
		try {
			const response = await Api.products.search(searchQuery);
			setProducts(response);
		} catch (error) {
			console.log(error);
		}
	}, 250, [searchQuery]);


	const handleOnClickProductItem = () => {
		setFocused(false);
		setSearchQuery('');
		setProducts([]);
	}

	return (
		<>
			{focused && <div className={s.searchInput__focusedOverlay} />}
			<div className={cn(s.searchInput, className)} ref={searchInputRef}>
				<Search className={s.searchInput__icon} />
				<input
					type="text"
					placeholder="Найти..."
					className={s.searchInput__input}
					onFocus={() => setFocused(true)}
					spellCheck={false}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div className={cn(s.searchInput__popUp, { [s.popUp__visible]: focused })}>
						{products.map((product) => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								className={s.searchInput__popUp__item}
								onClick={handleOnClickProductItem}
							>
								<Image
									src={product.imageUrl}
									alt={product.name}
									width={30}
									height={30}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>

				)}
			</div >
		</>
	)
}
