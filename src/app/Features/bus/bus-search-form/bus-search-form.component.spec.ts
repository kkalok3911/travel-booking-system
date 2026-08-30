import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSearchFormComponent } from './bus-search-form.component';

describe('BusSearchFormComponent', () => {
  let component: BusSearchFormComponent;
  let fixture: ComponentFixture<BusSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
