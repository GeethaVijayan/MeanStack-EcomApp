import { Component, inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CategoriesService } from '../../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../models/category';


@Component({
  selector: 'app-categories',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatButtonModule,MatIconModule,RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
displayedColumns: string[] = ['_id', 'name', 'Action'];
dataSource = new MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

catgeoryService = inject(CategoriesService);
router = inject(Router);

constructor(){
  this.dataSource = new MatTableDataSource<Category>([]);
}


ngOnInit(){
 this.getServerData();
}

getServerData(){
   this.catgeoryService.getCategories().subscribe((categories)=>{
    console.log(categories);
     this.dataSource = new MatTableDataSource<Category>(categories)
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

   deleteCategory(id:string){
     console.log("delete category:", id);
    this.catgeoryService.deleteCategoryById(id).subscribe(((result)=>{
      alert("Category deleted");
      this.getServerData();
    }))
  }
}
