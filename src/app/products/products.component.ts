import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ProductSummary } from '../_models/product-summary';
import { Product } from '../_models/product';
import { NgbModal, NgbModalRef } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/category';

@Component({
    templateUrl: 'products.component.html',
    selector: 'app-products',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    @ViewChild('contentEdit') templateEdit: any;

    products: ProductSummary[];
    categories: Category[];

    activeProduct: Product;
    checkedCategories: {[categoryId: number]: boolean};
    modalTitle: string;
    activeModal: NgbModalRef;
    viewOnly: boolean;
    loadingProduct: boolean;
    saving: boolean;

    modalTitles = {
        edit: 'Edit Product',
        add: 'Add Product',
        view: 'Product Details'
    };

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.getProducts();
        this.getCategories();
    }

    getCategories() {
        this.categoryService.getAll().subscribe(categories => this.categories = categories);
    }

    getCheckedCategories(product: Product, categories: Category[]): {[categoryId: number]: boolean} {
        var checkedCategories = {};
        product.Categories.forEach(pc => {
            checkedCategories[pc.CategoryId] = true;
        });
        return checkedCategories;
    }

    getProducts() {
        this.products = [];
        this.productService.getAll().subscribe(products => {
            this.products = products
        });
    }

    addProduct() {
        this.modalTitle = this.modalTitles.add;
        this.activeProduct = new Product();
        this.checkedCategories = {};
        this.activeModal = this.modalService.open(this.templateEdit, {});
    }

    viewProduct(id: number) {

        if (this.loadingProduct) return;

        this.modalTitle = this.modalTitles.view;
        this.viewOnly = true;
        this.loadingProduct = true;
        this.productService.getProduct(id).subscribe(product => {
            this.loadingProduct = false;
            this.activeProduct = product;
            this.checkedCategories = this.getCheckedCategories(product, this.categories);
            this.activeModal = this.modalService.open(this.templateEdit, {});
        })
    }

    editProduct(id: number) {

        if (this.loadingProduct) return;

        this.modalTitle = this.modalTitles.edit;
        this.viewOnly = false;
        this.loadingProduct = true;
        this.productService.getProduct(id).subscribe(product => {
            this.loadingProduct = false;
            this.activeProduct = product;
            this.checkedCategories = this.getCheckedCategories(product, this.categories);
            this.activeModal = this.modalService.open(this.templateEdit, {});
        })
    }

    switchToEdit() {

        this.modalTitle = this.modalTitles.edit;
        this.viewOnly = false;
    }

    saveChanges(product: Product) {

        if (this.saving) return;

        var request;

        product.Categories = this.categories.filter(c => this.checkedCategories[c.CategoryId]);

        if (!product.ProductId) {
            request = this.productService.addProduct(product);
        } else {
            request = this.productService.updateProduct(product);
        }

        this.saving = true;
        request.subscribe(x => {
            this.saving = false;
            this.activeModal && this.activeModal.close();
            this.getProducts();
        });
    }
}