import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';

@Component({
  selector: 'app-bus-search-form',
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './bus-search-form.component.html',
  styleUrl: './bus-search-form.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BusSearchFormComponent {
private readonly fb = inject(FormBuilder)
private readonly router = inject(Router)
readonly searchForm = this.fb.nonNullable.group({
  from:['',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
  to:['',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
  journeryDate:['',[Validators.required]],
  travelClass:['',[Validators.required]],
  traveller:['',[Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(10)]]
})

onSubmit():void{
  if(this.searchForm.invalid){
    this.searchForm.markAllAsTouched()
    return
  }
  this.router.navigate(['/bus/results'], { queryParams: this.searchForm.getRawValue() })
}

allowOnlyAlphabets(event: KeyboardEvent): void {
  if (event.key.length === 1 && !/^[a-zA-Z\s]$/.test(event.key)) {
    event.preventDefault();
  }
}

allowOnlyNumbers(event: KeyboardEvent): void {
  if (event.key.length === 1 && !/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
}
}
