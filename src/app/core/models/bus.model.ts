export interface BusSearchCriteria {
  from: string;
  to: string;
  journeryDate: string;
  travelClass: string;
  traveller: string;
}

export type BusType = 'AC' | 'Non-AC' | 'Sleeper' | 'Seater';

export interface Bus {
  id: string;
  operator: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  travelClass: string;
  busTypes: BusType[];
  busTypeLabel: string;
  rating: number;
  price: number;
  availableSeats: number;
}
