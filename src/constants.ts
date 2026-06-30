// import { Hotel } from './types';

// export const REVIEWS = [
//   { id: 1, name: "Priya Sharma", rating: 5, comment: "An absolute dream! The Tara Heritage Palace was beyond my expectations. The service was impeccable.", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=150" },
//   { id: 2, name: "Rahul Verma", rating: 5, comment: "The Skyline Penthouse is the best urban stay in Gurugram. The infinity pool is breathtaking.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" },
//   { id: 3, name: "Ananya Iyer", rating: 4, comment: "Beautiful property in Udaipur. The boat ride to the sanctuary was very romantic.", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=150" },
//   { id: 4, name: "Vikram Singh", rating: 5, comment: "Top-notch luxury. The private chef in the Goa villa made our vacation truly special.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
//   { id: 5, name: "Sanya Malhotra", rating: 5, comment: "The Himalayan Estate is so peaceful. Perfect for a digital detox and spiritual rejuvenation.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
//   { id: 6, name: "Arjun Kapoor", rating: 5, comment: "Stayed at the Royal Palace in Hyderabad. Felt like a Nizam for a weekend. Highly recommended!", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150" },
//   { id: 7, name: "Meera Reddy", rating: 4, comment: "Excellent hospitality. The attention to detail in every corner of the house is amazing.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" },
//   { id: 8, name: "Kabir Das", rating: 5, comment: "The best luxury home collection in India. Tara Homes never disappoints.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
//   { id: 9, name: "Ishani Gupta", rating: 5, comment: "Luxury at its finest. The Vagator villa has the best sunset views I've ever seen.", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150" },
//   { id: 10, name: "Zaid Khan", rating: 5, comment: "Professional staff and stunning properties. Will definitely book again for my next trip.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" }
// ];

// export const HERO_IMAGES = [
//   "/src/images/app2 (2).jpg",
//   "/src/images/one.jpg",
//   "/src/images/view 1.jpg",
//   "/src/images/app (4).jpg",
//   "/src/images/hang.jpg"
// ];

// export const HOTELS: Hotel[] = [
//   {
//     id: 'tara-heritage-mumbai',
//     name: 'Tara Luxury Homes – 2 BHK',
//     location: 'Chester Hills, Solan, Himachal Pradesh',
//     price: 3699,
//     rating: 4.9,
//     reviews: 1420,
//     description: 'A majestic heritage landmark overlooking . The ultimate blend of history and luxury.',
//     image: '/src/images/app2 (6).jpg',
//     bhk: '2 BHK Grand Heritage Suite',
//     amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitechen' , 'Smart TV (Prime Video)'],
//     type: 'Taj',
//     gallery: [
//       '/src/images/app2 (3).jpg',
//       '/src/images/app2 (4).jpg',
//       '/src/images/app2 (8).jpg',
//       '/src/images/one one 1 (6).jpg',
//       '/src/images/one one 1 (4).jpg',
//       '/src/images/one one 1 (3).jpg',
//       '/src/images/one one 1 (1).jpg'
//     ]
//   },
//   {
//     id: 'tara-lake-udaipur',
//     name: 'Tara Luxury  Homes  – 1 BHK',
//     location: 'Chester Hills, Solan, Himachal Pradesh',
//     price: 1799,
//     rating: 5.0,
//     reviews: 940,
//     description: 'A floating marble marvel in the heart of Lake Pichola. Royal treatment.',
//     image: '/src/images/app (4).jpg',
//     bhk: '1 BHK  Heritage Sanctuary',
//     amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitechen' , 'Smart TV (Prime Video)'],
//     type: 'Taj',
//     gallery: [
//       '/src/images/one/one (1).jpg',
//       '/src/images/one/one (2).jpg',
//       '/src/images/one/one (3).jpg',
//       '/src/images/one/one (4).jpg',
//       '/src/images/one/one (5).jpg',
//       '/src/images/one/one (6).jpg'
//     ]
//   },
//   {
//     id: 'tara-sky-penthouse',
//     name: 'Tara Luxury Homes  – 2 BHK',
//     location: 'Chester Hills, Solan, Himachal Pradesh',
//     price: 3299,
//     rating: 4.8,
//     reviews: 156,
//     description: 'Ultra-modern 2 BHK penthouse . The pinnacle of urban luxury.',
//     image: '/src/images/app2 (4).jpg',
//     bhk: '2 BHK Smart Penthouse',
//     amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitechen' , 'Smart TV (Prime Video)'],
//     type: 'Private',
//     gallery: [
//         '/src/images/app2 (1).jpg',
//       '/src/images/app2 (4).jpg',
//       '/src/images/app2 (8).jpg',
//       '/src/images/one one 1 (6).jpg',
//       '/src/images/one one 1 (4).jpg',
//       '/src/images/one one 1 (3).jpg',
//       '/src/images/one one 1 (2).jpg'
//     ]
//   },
//   {
//     id: 'tara-azure-villa',
//     name: 'Tara Luxury Homes  – 1 BHK',
//     location: 'Chester Hills, Solan, Himachal Pradesh',
//     price: 2299,
//     rating: 4.9,
//     reviews: 245,
//     description: 'A contemporary 1 BHK villa nestled in the cliffs of Vagator. Sunset views.',
//     image: '/src/images/one.jpg',
//     bhk: '1 BHK Cliffside Villa',
//     amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitechen' , 'Smart TV (Prime Video)'],
//     type: 'Private',
//     gallery: [
//        '/src/images/one/one (1).jpg',
//       '/src/images/one/one (2).jpg',
//       '/src/images/one/one (3).jpg',
//       '/src/images/one/one (4).jpg',
//       '/src/images/one/one (5).jpg',
//       '/src/images/one/one (6).jpg'
//     ]
//   },
//   {
//     id: 'tara-himalayan-retreat',
//     name: 'Tara Luxury Homes  – 1 BHK',
//     location: 'Chester Hills, Solan, Himachal Pradesh',
//     price: 1999,
//     rating: 4.7,
//     reviews: 180,
//     description: 'A serene mountain estate overlooking the Ganges. Perfect for spiritual retreats and nature lovers.',
//     image: '/src/images/one one (3).jpg',
//     bhk: '1 BHK Mountain View',
//     amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitechen' , 'Smart TV (Prime Video)'],
//     type: 'Private',
//     gallery: [
//       '/src/images/two  (3).jpg',
//       '/src/images/two  (2).jpg',
//       '/src/images/two  (1).jpg',
//       '/src/images/two  (5).jpg',
//       '/src/images/two  (7).jpg',
//       '/src/images/two  (6).jpg',
//     ]
//   },
  

  
// ];
import { Hotel } from './types';

export const REVIEWS = [
  { id: 1, name: "Priya Sharma", rating: 5, comment: "An absolute dream! The Tara Heritage Palace was beyond my expectations. The service was impeccable.", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=150" },
  { id: 2, name: "Rahul Verma", rating: 5, comment: "The Skyline Penthouse is the best urban stay in Gurugram. The infinity pool is breathtaking.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" },
  { id: 3, name: "Ananya Iyer", rating: 4, comment: "Beautiful property in Udaipur. The boat ride to the sanctuary was very romantic.", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=150" },
  { id: 4, name: "Vikram Singh", rating: 5, comment: "Top-notch luxury. The private chef in the Goa villa made our vacation truly special.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
  { id: 5, name: "Sanya Malhotra", rating: 5, comment: "The Himalayan Estate is so peaceful. Perfect for a digital detox and spiritual rejuvenation.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
  { id: 6, name: "Arjun Kapoor", rating: 5, comment: "Stayed at the Royal Palace in Hyderabad. Felt like a Nizam for a weekend. Highly recommended!", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150" },
  { id: 7, name: "Meera Reddy", rating: 4, comment: "Excellent hospitality. The attention to detail in every corner of the house is amazing.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" },
  { id: 8, name: "Kabir Das", rating: 5, comment: "The best luxury home collection in India. Tara Homes never disappoints.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
  { id: 9, name: "Ishani Gupta", rating: 5, comment: "Luxury at its finest. The Vagator villa has the best sunset views I've ever seen.", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150" },
  { id: 10, name: "Zaid Khan", rating: 5, comment: "Professional staff and stunning properties. Will definitely book again for my next trip.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" }
];

export const HERO_IMAGES = [
  "/images/app2 (2).jpg",
  "/images/one.jpg",
  "/images/view 1.jpg",
  "/images/app (4).jpg",
  "/images/hang.jpg"
];

export const HOTELS: Hotel[] = [
  {
    id: 'tara-heritage-mumbai',
    name: 'Tara Luxury Homes – 2 BHK',
    location: 'Chester Hills, Solan, Himachal Pradesh',
    price: 3699,
    rating: 4.9,
    reviews: 1420,
    description: 'A majestic heritage landmark overlooking . The ultimate blend of history and luxury.',
    image: '/images/app2 (6).jpg',
    bhk: '2 BHK Grand Heritage Suite',
    amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitchen' , 'Smart TV (Prime Video)'],
    type: 'Taj',
    gallery: [
      '/images/app2 (3).jpg',
      '/images/app2 (4).jpg',
      '/images/app2 (8).jpg',
      '/images/one one 1 (6).jpg',
      '/images/one one 1 (4).jpg',
      '/images/one one 1 (3).jpg',
      '/images/one one 1 (1).jpg'
    ]
  },
  {
    id: 'tara-lake-udaipur',
    name: 'Tara Luxury  Homes  – 1 BHK',
    location: 'Chester Hills, Solan, Himachal Pradesh',
    price: 1799,
    rating: 5.0,
    reviews: 940,
    description: 'A floating marble marvel in the heart of Lake Pichola. Royal treatment.',
    image: '/images/app (4).jpg',
    bhk: '1 BHK  Heritage Sanctuary',
    amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitchen' , 'Smart TV (Prime Video)'],
    type: 'Taj',
    gallery: [
      '/images/one/one (1).jpg',
      '/images/one/one (2).jpg',
      '/images/one/one (3).jpg',
      '/images/one/one (4).jpg',
      '/images/one/one (5).jpg',
      '/images/one/one (6).jpg'
    ]
  },
  {
    id: 'tara-sky-penthouse',
    name: 'Tara Luxury Homes  – 2 BHK',
    location: 'Chester Hills, Solan, Himachal Pradesh',
    price: 3299,
    rating: 4.8,
    reviews: 156,
    description: 'Ultra-modern 2 BHK penthouse . The pinnacle of urban luxury.',
    image: '/images/app2 (4).jpg',
    bhk: '2 BHK Smart Penthouse',
    amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitchen' , 'Smart TV (Prime Video)'],
    type: 'Private',
    gallery: [
      '/images/app2 (1).jpg',
      '/images/app2 (4).jpg',
      '/images/app2 (8).jpg',
      '/images/one one 1 (6).jpg',
      '/images/one one 1 (4).jpg',
      '/images/one one 1 (3).jpg',
      '/images/one one 1 (2).jpg'
    ]
  },
  {
    id: 'tara-azure-villa',
    name: 'Tara Luxury Homes  – 1 BHK',
    location: 'Chester Hills, Solan, Himachal Pradesh',
    price: 2299,
    rating: 4.9,
    reviews: 245,
    description: 'A contemporary 1 BHK villa nestled in the cliffs of Vagator. Sunset views.',
    image: '/images/one.jpg',
    bhk: '1 BHK Cliffside Villa',
    amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitchen' , 'Smart TV (Prime Video)'],
    type: 'Private',
    gallery: [
      '/images/one/one (1).jpg',
      '/images/one/one (2).jpg',
      '/images/one/one (3).jpg',
      '/images/one/one (4).jpg',
      '/images/one/one (5).jpg',
      '/images/one/one (6).jpg'
    ]
  },
  {
    id: 'tara-himalayan-retreat',
    name: 'Tara Luxury Homes  – 1 BHK',
    location: 'Chester Hills, Solan, Himachal Pradesh',
    price: 1999,
    rating: 4.7,
    reviews: 180,
    description: 'A serene mountain estate overlooking the Ganges. Perfect for spiritual retreats and nature lovers.',
    image: '/images/one one (3).jpg',
    bhk: '1 BHK Mountain View',
    amenities: ['24/7 Staff', 'Free Wifi', 'Free Parking', 'Full Equipped Kitchen' , 'Smart TV (Prime Video)'],
    type: 'Private',
    gallery: [
      '/images/two  (3).jpg',
      '/images/two  (2).jpg',
      '/images/two  (1).jpg',
      '/images/two  (5).jpg',
      '/images/two  (7).jpg',
      '/images/two  (6).jpg',
    ]
  }
];