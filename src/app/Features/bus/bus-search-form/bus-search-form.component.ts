import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bus-search-form',
  imports: [ReactiveFormsModule],
  templateUrl: './bus-search-form.component.html',
  styleUrl: './bus-search-form.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BusSearchFormComponent {
private readonly fb = inject(FormBuilder)
readonly searchForm = this.fb.nonNullable.group({
  from:['',[Validators.required]],
  to:['',[Validators.required]],
  journeryDate:['',[Validators.required]],
  travelClass:['',[Validators.required]],
  travellers:['',[Validators.required,Validators.min(1), Validators.max(10)]]
})

onSubmit():void{
console.log(this.searchForm);
}
}
