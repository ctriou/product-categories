import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductSummary } from '../_models/product-summary';
import { Product } from '../_models/product';
import { ProductSave } from '../_models/product-save';

@Injectable({ providedIn: 'root' })
export class ProductService {

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<ProductSummary[]>(`${config.apiUrl}/Products`);
    }

    getProduct(id: number) {
        return this.http.get<Product>(`${config.apiUrl}/Products/${id}`);
    }

    updateProduct(product: Product) {
        var url = `${config.apiUrl}/Products/${product.ProductId}`;

        var productSave: ProductSave = {
            Url: product.Url,
            CategoryIds: product.Categories.map(x => x.CategoryId),
            Name: product.Name,
            Description: product.Description
        };

        return this.http.put<Product>(url, productSave, this.httpOptions);
    }

    addProduct(product: Product) {
        var productSave: ProductSave = {
            Url: product.Url,
            CategoryIds: product.Categories.map(x => x.CategoryId),
            Name: product.Name,
            Description: product.Description
        };

        return this.http.post<Product>(`${config.apiUrl}/Products`, productSave, this.httpOptions);
    }
}