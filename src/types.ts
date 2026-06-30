export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  bhk: string;
  amenities: string[];
  type: 'Taj' | 'Private';
  gallery?: string[];
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  hotelId: string;
}
