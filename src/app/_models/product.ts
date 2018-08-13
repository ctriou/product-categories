import { ProductSummary } from "./product-summary";
import { Category } from "./category";

export class Product extends ProductSummary {
    Url: string;
    Categories: Category[];
}