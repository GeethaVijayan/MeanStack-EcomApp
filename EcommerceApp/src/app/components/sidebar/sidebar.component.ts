import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';


import {
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { BrandsService } from '../../services/brands.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Products } from '../../models/products';
import { Brand } from '../../models/brands';
import { Category } from '../../models/category';

@Component({
  selector: 'app-sidebar',
   imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
 productService = inject(ProductsService);
  categoryService = inject(CategoriesService);
  brandService = inject(BrandsService);
  snackBar = inject(MatSnackBar);

  products: Products[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];

  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';
  minPrice = 0;
  maxPrice = 10000;
  sortBy = 'newest';

  pageIndex = 0;
  pageSize = 12;
  totalProducts = 0;
  pageSizeOptions = [6, 12, 24];

  ngOnInit() {
    this.loadCategories();
    this.loadBrands();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  loadBrands() {
    this.brandService.getBrands().subscribe(
      (data) => {
        this.brands = data;
      }
    );
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        let filtered = this.filterProducts(data);
        this.totalProducts = filtered.length;
        this.products = this.paginateProducts(filtered);
      }
    );
  }

  filterProducts(products: Products[]): Products[] {
    let filtered = products;

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === this.selectedCategory);
    }

    // Brand filter
    if (this.selectedBrand) {
      filtered = filtered.filter(p => p.brandId === this.selectedBrand);
    }

    // Price filter
    filtered = filtered.filter(p => {
      const discountedPrice = p.price - (p.price * (p.discount || 0) / 100);
      return discountedPrice >= this.minPrice && discountedPrice <= this.maxPrice;
    });

    return filtered;
  }

  paginateProducts(products: Products[]): Products[] {
    const start = this.pageIndex * this.pageSize;
    return products.slice(start, start + this.pageSize);
  }

  sortProducts(products: Products[]): Products[] {
    const sorted = [...products];
    switch (this.sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'featured':
        return sorted.filter(p => p.isFeatured);
      default: // newest
        return sorted;
    }
  }

  onSearch() {
    this.pageIndex = 0;
    this.loadProducts();
  }

  onFilterChange() {
    this.pageIndex = 0;
    this.loadProducts();
  }

  onSort() {
    this.pageIndex = 0;
    this.productService.getProducts().subscribe(
      (data) => {
        let filtered = this.filterProducts(data);
        let sorted = this.sortProducts(filtered);
        this.totalProducts = sorted.length;
        this.products = this.paginateProducts(sorted);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  addToCart(product: Products) {
    // Store in localStorage or cart service
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.snackBar.open('Product added to cart!', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }
}
