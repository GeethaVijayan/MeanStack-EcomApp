import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Products } from '../models/products';

export interface CartItem extends Products {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shopping_cart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  cart$ = this.cartSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(this.getCartCount());
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}

  private loadCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: Products, quantity: number = 1) {
    const cart = this.cartSubject.value;
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    this.updateCart(cart);
  }

  removeFromCart(productId: string) {
    const cart = this.cartSubject.value.filter(item => item._id !== productId);
    this.updateCart(cart);
  }

  updateQuantity(productId: string, quantity: number) {
    const cart = this.cartSubject.value;
    const item = cart.find(i => i._id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.updateCart(cart);
    }
  }

  clearCart() {
    this.updateCart([]);
  }

  private updateCart(cart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
    this.cartCountSubject.next(this.getCartCount());
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, item) => {
      const price = item.price - (item.price * (item.discount || 0) / 100);
      return total + (price * item.quantity);
    }, 0);
  }

  getCartCount(): number {
    return this.cartSubject.value.reduce((count, item) => count + item.quantity, 0);
  }

  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }
}
