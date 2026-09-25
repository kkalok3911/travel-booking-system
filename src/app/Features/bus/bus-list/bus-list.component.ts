import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Bus, BusSearchCriteria, BusType } from '../../../core/models/bus.model';
import { BusService } from '../../../core/services/bus.service';

type DepartureSlot = 'before18' | 'mid' | 'after22';
type SortOption = 'recommended' | 'price' | 'departure' | 'rating';

const BUS_TYPES: BusType[] = ['AC', 'Non-AC', 'Sleeper', 'Seater'];
const DEPARTURE_SLOTS: { key: DepartureSlot; label: string }[] = [
  { key: 'before18', label: 'Before 18:00' },
  { key: 'mid', label: '18:00 – 22:00' },
  { key: 'after22', label: 'After 22:00' },
];

function departureSlotOf(departureTime: string): DepartureSlot {
  const hour = Number(departureTime.split(':')[0]);
  if (hour < 18) return 'before18';
  if (hour < 22) return 'mid';
  return 'after22';
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

@Component({
  selector: 'app-bus-list',
  imports: [DatePipe],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly busService = inject(BusService);

  readonly busTypes = BUS_TYPES;
  readonly departureSlots = DEPARTURE_SLOTS;
  readonly formatDuration = formatDuration;

  readonly loading = signal(true);
  readonly buses = signal<Bus[]>([]);
  readonly criteria = signal<BusSearchCriteria>({
    from: '',
    to: '',
    journeryDate: '',
    travelClass: '',
    traveller: '',
  });

  readonly maxPrice = signal(9000);
  readonly selectedBusTypes = signal<Set<BusType>>(new Set());
  readonly selectedDepartureSlots = signal<Set<DepartureSlot>>(new Set());
  readonly sortBy = signal<SortOption>('recommended');

  readonly busTypeCounts = computed(() => {
    const counts: Record<BusType, number> = { AC: 0, 'Non-AC': 0, Sleeper: 0, Seater: 0 };
    for (const bus of this.buses()) {
      for (const type of bus.busTypes) {
        counts[type]++;
      }
    }
    return counts;
  });

  readonly departureSlotCounts = computed(() => {
    const counts: Record<DepartureSlot, number> = { before18: 0, mid: 0, after22: 0 };
    for (const bus of this.buses()) {
      counts[departureSlotOf(bus.departureTime)]++;
    }
    return counts;
  });

  readonly filteredBuses = computed(() => {
    const maxPrice = this.maxPrice();
    const busTypes = this.selectedBusTypes();
    const slots = this.selectedDepartureSlots();

    const filtered = this.buses().filter((bus) => {
      if (bus.price > maxPrice) return false;
      if (busTypes.size > 0 && !bus.busTypes.some((type) => busTypes.has(type))) return false;
      if (slots.size > 0 && !slots.has(departureSlotOf(bus.departureTime))) return false;
      return true;
    });

    switch (this.sortBy()) {
      case 'price':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'departure':
        return [...filtered].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  });

  constructor() {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          const criteria: BusSearchCriteria = {
            from: params.get('from') ?? '',
            to: params.get('to') ?? '',
            journeryDate: params.get('journeryDate') ?? '',
            travelClass: params.get('travelClass') ?? '',
            traveller: params.get('traveller') ?? '',
          };
          this.criteria.set(criteria);
          return this.busService.searchBuses(criteria);
        }),
        takeUntilDestroyed()
      )
      .subscribe((results) => {
        this.buses.set(results);
        this.loading.set(false);
      });
  }

  toggleBusType(type: BusType): void {
    const next = new Set(this.selectedBusTypes());
    next.has(type) ? next.delete(type) : next.add(type);
    this.selectedBusTypes.set(next);
  }

  toggleDepartureSlot(slot: DepartureSlot): void {
    const next = new Set(this.selectedDepartureSlots());
    next.has(slot) ? next.delete(slot) : next.add(slot);
    this.selectedDepartureSlots.set(next);
  }

  clearFilters(): void {
    this.maxPrice.set(9000);
    this.selectedBusTypes.set(new Set());
    this.selectedDepartureSlots.set(new Set());
  }

  setSort(option: SortOption): void {
    this.sortBy.set(option);
  }

  modifySearch(): void {
    this.router.navigate(['/bus']);
  }
}
