import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Products } from '../../models/products';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);
  cartService = inject(CartService);
  snackBar = inject(MatSnackBar);

  product: Products | null = null;
  selectedImage: string | null = null;
  quantity = 1;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data) => {
          this.product = data;
          this.selectedImage = data.images && data.images.length > 0 ? data.images[0] : null;
        }
      );
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.snackBar.open(`${this.quantity} item(s) added to cart!`, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/shop');
  }
}
