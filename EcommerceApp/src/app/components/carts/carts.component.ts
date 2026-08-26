import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carts',
  imports: [],
  standalone: true,
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent implements OnInit {
  private cartCount: number = 0;
    constructor(private router: ActivatedRoute) {

    }
    
    ngOnInit() {
        this.router.queryParams.subscribe(params => {
            const productId = params['productId'];
            const quantity = params['quantity'];
            console.log('Product ID:', productId);
            console.log('Quantity:', quantity);
        });
    }
  }

