import { Component, inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoriesService } from '../../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Products } from '../../../models/products';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
 imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatButtonModule,RouterLink
  ],
    templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
displayedColumns: string[] = ['_id', 'name', 'description', 'price', 'Amount', 'Action'];
dataSource = new MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

productsService = inject(ProductsService);
router = inject(Router);

constructor(){
  this.dataSource = new MatTableDataSource<Products>([]);
}


ngOnInit(){
 this.getServerData();
}

getServerData(){
   this.productsService.getProducts().subscribe((products)=>{
    console.log(products);
     this.dataSource = new MatTableDataSource<Products>(products)
  })
}
ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
 }

   deleteProduct(id:string){
     console.log("delete product:", id);
    this.productsService.deleteProductById(id).subscribe(((result)=>{
      alert("Product deleted");
      this.getServerData();
    }))
  }}
