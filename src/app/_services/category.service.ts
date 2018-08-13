import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../_models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Category[]>(`${config.apiUrl}/Categories`);
    }
}