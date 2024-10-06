export interface ICartItemDetails {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}

export interface ICartItemDetailsImage {
  src: string;
  className?: string;
}

export interface ICartItemDetailsInfo {
  name: string;
  details: string;
  className?: string;
}

export interface ICartItemDetailsPrice {
  value: number;
  className?: string;
}