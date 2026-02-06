import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriesService } from '../../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Brand } from '../../../models/brands';
import { BrandsService } from '../../../services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  displayedColumns: string[] = ['_id', 'name', 'Action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  brandService = inject(BrandsService);
  router = inject(Router);

  constructor() {
    this.dataSource = new MatTableDataSource<Brand>([]);
  }

  ngOnInit() {
    this.getServerData();
  }

  getServerData() {
    this.brandService.getBrands().subscribe((brands) => {
      console.log(brands);
      this.dataSource = new MatTableDataSource<Brand>(brands);
    });
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

  deleteBrand(id: string) {
    console.log('delete brand:', id);
    this.brandService.deleteBrandById(id).subscribe((result) => {
      alert('Brand deleted');
      this.getServerData();
    });
  }
}
