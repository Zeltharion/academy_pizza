type PizzaImageSizes = 20 | 30 | 40;

export interface IPizzaImage {
	src: string;
	size: PizzaImageSizes;
	className?: string;
}