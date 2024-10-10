import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/shared/lib";
import { Button } from "@/components/ui";
import { Title } from "@/components/shared";
import { IInfoBlock } from "./InfoBlock.types";
import s from './InfoBlock.module.scss'

export const InfoBlock: React.FC<IInfoBlock> = ({
	title,
	text,
	imageUrl,
	className
}) => {
	return (
		<div className={cn(s.infoBlock, className)}>
			<div className={s.infoBlock__content}>
				<div className="w-[445px]">
					<Title size="lg" text={title} className="font-extrabold" />
					<p className="text-gray-400 text-lg">{text}</p>
				</div>

				<div className={s.infoBlock__buttons}>
					<Link href="/">
						<Button variant="outline" className="gap-2">
							<ArrowLeft />
							На главную
						</Button>
					</Link>
					<a href="">
						<Button variant="outline" className={s.infoBlock_refreshButton}>
							Обновить
						</Button>
					</a>
				</div>
			</div>

			<img
				src={imageUrl}
				alt={title}
				width={300}
			/>
		</div>
	);
};