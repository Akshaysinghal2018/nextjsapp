export type TRatingType = {
    count: number;
    rate: number
}

export type TProductType = {
    category?: string;
    description?: string;
    id: string;
    image: string;
    price: number;
    rating?: TRatingType;
    title: string;
}

export type TProductCardType = {
    id: string;
    image: string;
    title: string;
    product: TProductType;
    price: number;
}

export interface ICartItemType {
    category?: string;
    description?: string;
    id: string;
    image: string;
    price?: number;
    rating?: TRatingType;
    title: string;
    qty: number;
}