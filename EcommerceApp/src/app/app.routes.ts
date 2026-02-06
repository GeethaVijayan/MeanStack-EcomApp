import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';

export const routes: Routes = [
    {
        path: "",
        component:CategoriesComponent
    },
    {
        path: "admin/categories",
        component:CategoriesComponent
    },
   {
        path: 'admin/categories/add',
        component:CategoryFormComponent
    },
    {
        path: 'admin/categories/:id',
        component:CategoryFormComponent
    },
//brands
{
        path: "admin/brands",
        component:BrandsComponent
    },
   {
        path: 'admin/brands/add',
        component:BrandFormComponent
    },
    {
        path: 'admin/brands/:id',
        component:BrandFormComponent
    },
    //product
{
        path: "admin/product",
        component:ProductsComponent
    },
   {
        path: 'admin/product/add',
        component:ProductFormComponent
    },
    {
        path: 'admin/product/:id',
        component:ProductFormComponent
    },

];
