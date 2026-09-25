import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Bus, BusSearchCriteria } from '../models/bus.model';

interface BusTemplate {
  operator: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  busTypes: Bus['busTypes'];
  busTypeLabel: string;
  rating: number;
  price: number;
  availableSeats: number;
}

const BUS_TEMPLATES: BusTemplate[] = [
  {
    operator: 'Prayag Express Bus',
    departureTime: '23:00',
    arrivalTime: '07:20',
    durationMinutes: 500,
    busTypes: ['AC', 'Sleeper'],
    busTypeLabel: 'AC Sleeper (2+1)',
    rating: 4.7,
    price: 1180,
    availableSeats: 6,
  },
  {
    operator: 'Sarathi Travels',
    departureTime: '21:30',
    arrivalTime: '06:10',
    durationMinutes: 520,
    busTypes: ['AC', 'Sleeper'],
    busTypeLabel: 'AC Sleeper (2+1)',
    rating: 4.5,
    price: 899,
    availableSeats: 32,
  },
  {
    operator: 'Mahanadi Coach',
    departureTime: '22:15',
    arrivalTime: '07:00',
    durationMinutes: 525,
    busTypes: ['AC', 'Seater'],
    busTypeLabel: 'AC Seater',
    rating: 4.2,
    price: 749,
    availableSeats: 11,
  },
  {
    operator: 'Neelkanth Roadlines',
    departureTime: '19:45',
    arrivalTime: '05:30',
    durationMinutes: 585,
    busTypes: ['Non-AC', 'Sleeper'],
    busTypeLabel: 'Non-AC Sleeper',
    rating: 3.9,
    price: 540,
    availableSeats: 24,
  },
];

@Injectable({ providedIn: 'root' })
export class BusService {
  // TODO: replace with a real HttpClient call once a backend endpoint exists.
  searchBuses(criteria: BusSearchCriteria): Observable<Bus[]> {
    const results: Bus[] = BUS_TEMPLATES.map((template, index) => ({
      id: `${index + 1}`,
      from: criteria.from,
      to: criteria.to,
      travelClass: criteria.travelClass,
      ...template,
    }));

    return of(results).pipe(delay(600));
  }
}
