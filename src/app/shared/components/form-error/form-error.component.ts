import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true })
  control!: AbstractControl;

  @Input()
  reqMsg = '';

  @Input()
  reqMinMsg = '';

  @Input()
  reqMaxMsg = '';

  @Input()
  patternMsg = '';

  ngOnInit(): void {
    this.control.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
  }

  getErrorMsg(): string | null | undefined {
    if (!this.control.touched || !this.control.errors) {
      return null;
    }

    if (this.control.hasError('required')) {
      return this.reqMsg;
    }

    if (this.control.hasError('min')) {
      return this.reqMinMsg;
    }

    if (this.control.hasError('max')) {
      return this.reqMaxMsg;
    }

    if (this.control.hasError('pattern')) {
      return this.patternMsg;
    }
    return null;
  }
}
