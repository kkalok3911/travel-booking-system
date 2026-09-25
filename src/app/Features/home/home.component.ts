import { Component } from '@angular/core';
import { BusSearchFormComponent } from '../bus/bus-search-form/bus-search-form.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';

@Component({
  selector: 'app-home',
  imports: [BusSearchFormComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
