import { Component } from '@angular/core';
import { BusSearchFormComponent } from "./bus-search-form/bus-search-form.component";
import { BannerComponent } from "../../shared/components/banner/banner.component";

@Component({
  selector: 'app-bus',
  imports: [BusSearchFormComponent, BannerComponent],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss'
})
export class BusComponent {

}
