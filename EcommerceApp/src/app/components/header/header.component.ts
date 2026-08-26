import { Component, inject,OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { selectCartCount } from '../../store/cart.selector';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CartState } from '../../store/cart.reducer';
import { selectCartCount, selectCartState } from '../../store/cart.selector';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterModule, MatButtonModule,MatIconModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent implements OnInit{
  categoryService = inject(CategoriesService);
  authService = inject(AuthService);
  categoryList: Category[] = [];
  currentUser$ = this.authService.currentUser$;
  router = inject(Router);
  cartCount$:Observable<number> = new Observable<number>();
  constructor(private store: Store<CartState>) {}
  ngOnInit() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categoryList = data;
      console.log('Fetched categories:', this.categoryList);
    });
    this.cartCount$ = this.store.select(selectCartCount);
    //this.cartCount$ = this.store.select(selectCartCount);
//     this.store.select(selectCartState).subscribe(state => {
//   console.log(state);

  
// });
  }

  logout() {
    this.authService.logout();
  }
  navigateToCart(cartCount$: Observable<number>) {
    this.router.navigate(['/cart', cartCount$]);
  }
}
