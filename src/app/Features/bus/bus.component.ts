import { Component } from '@angular/core';
import { BusSearchFormComponent } from "./bus-search-form/bus-search-form.component";

@Component({
  selector: 'app-bus',
  imports: [BusSearchFormComponent],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss'
})
export class BusComponent {

}
