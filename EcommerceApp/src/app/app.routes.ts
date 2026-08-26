import { Routes } from '@angular/router';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard, adminGuard } from './guards/auth.guard';
import { SportsComponent } from './sports/sports.component';
import { FashionComponent } from './components/fashion/fashion.component';
import { CartsComponent } from './components/carts/carts.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "shop",
        component: ShopComponent
    },
    {
        path: "cart/:cartCount",
        component: CartsComponent
    },
     {
        path: "category/:categoryId",
        component: FashionComponent
    },
     {
        path: "category/:categoryId",
        component: SportsComponent
    },
    {
        path: "category/:id",
        component: ProductDetailComponent
    },
    {
        path: "admin/categories",
        component: CategoriesComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/categories/add',
        component: CategoryFormComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/categories/:id',
        component: CategoryFormComponent,
        canActivate: [adminGuard]
    },
    //brands
    {
        path: "admin/brands",
        component: BrandsComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/brands/add',
        component: BrandFormComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/brands/:id',
        component: BrandFormComponent,
        canActivate: [adminGuard]
    },
    //product
    {
        path: "admin/product",
        component: ProductsComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/product/add',
        component: ProductFormComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'admin/product/:id',
        component: ProductFormComponent,
        canActivate: [adminGuard]
    }
];
