export interface Feature {
    id: string;
    productId: string;
    attribute: string;
    value: string;
}

export interface Review {
    id: string;
    productId: string;
    reviewerId: string;
    description: string;
    rating: number;
    date: string;
    media: Media[];  // Fixed lowercase 'm'
}

export enum MediaType {
    Photo = "Photo",
    Video = "Video"
}

export enum MediaFor {
    Product = "Product",
    Review = "Review"
}

export interface Media {
    id: string;
    referenceId: string; // Fixed spelling
    type: MediaType;
    mediaFor: MediaFor;
    link: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    rating: number;
    imageLink: string;
    actualPrice: number;
    price: number;
    discount: number;
    description: string;
    stock: number;
    isAvailable: boolean;
    media: Media[];
    features: Feature[];  // Capitalized 'Feature'
    reviews: Review[];  // Capitalized 'Review'
    categories: Category[];
}
