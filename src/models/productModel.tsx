import { CategoryModel } from "./CategoryModel";

export interface ProductModel {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[]; 
    category: CategoryModel; 
    creationAt: string;
    updatedAt: string;
}