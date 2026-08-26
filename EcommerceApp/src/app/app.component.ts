import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooteerComponent } from './components/footeer/footeer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CategoryFormComponent,HeaderComponent,FooteerComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EcommerceApp';

}
