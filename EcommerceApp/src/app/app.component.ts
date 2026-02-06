import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CategoryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EcommerceApp';

}
