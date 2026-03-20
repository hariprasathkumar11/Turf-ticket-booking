import turf1 from '../assets/images/turf-1.jpg';
import turf2 from '../assets/images/turf-2.jpg';
import turf3 from '../assets/images/turf-3.jpg';
import turf4 from '../assets/images/turf-4.jpg';
import turf5 from '../assets/images/turf-5.jpg';
import turf6 from '../assets/images/turf-6.jpg';
import turf7 from '../assets/images/turf-7.jpg';
import turf8 from '../assets/images/turf-8.jpg';
import turf9 from '../assets/images/turf-9.jpg';

export const venues = [
  { id: 1, name: 'Marutham Sports Cricket', image: turf1, category: 'Nets',        price: 1200, type: 'Cricket', rating: 4.5, location: 'Karur' },
  { id: 2, name: 'Hi5s Turf',               image: turf2, category: 'Nets',        price: 900,  type: 'Cricket', rating: 4.2, location: 'Karur' },
  { id: 3, name: 'Karur Sports Arena',       image: turf3, category: 'Box-Cricket', price: 1600, type: 'Cricket', rating: 4.7, location: 'Karur' },
  { id: 4, name: 'Dugout Turf',              image: turf4, category: 'Nets',        price: 800,  type: 'Cricket', rating: 4.0, location: 'Karur' },
  { id: 5, name: 'Pavilion Turf',            image: turf5, category: 'Nets',        price: 1800, type: 'Cricket', rating: 4.8, location: 'Karur' },
  { id: 6, name: 'Gameon 360',               image: turf6, category: 'Box-Cricket', price: 1200, type: 'Cricket', rating: 4.3, location: 'Karur' },
  { id: 7, name: 'Playzo 33',                image: turf7, category: 'Nets',        price: 700,  type: 'Cricket', rating: 3.9, location: 'Karur' },
  { id: 8, name: 'Matrix Turf',              image: turf8, category: 'Nets',        price: 1800, type: 'Cricket', rating: 4.6, location: 'Karur' },
  { id: 9, name: 'Phoenix Sports Hub',       image: turf9, category: 'Box-Cricket', price: 1000, type: 'Cricket', rating: 4.1, location: 'Karur' },
];

export const timeSlotsByCategory = {
  Twilight: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM'],
  Morning:  ['6 AM',  '7 AM',  '8 AM',  '9 AM',  '10 AM', '11 AM'],
  Noon:     ['12 PM', '1 PM',  '2 PM',  '3 PM',  '4 PM',  '5 PM'],
  Evening:  ['6 PM',  '7 PM',  '8 PM',  '9 PM',  '10 PM', '11 PM'],
};

export const formatTypes = [
  { id: 1, name: 'Box Cricket',   icon: '🏏', desc: 'Enclosed box format with walls — fast-paced and fun for small groups.' },
  { id: 2, name: 'Nets Practice', icon: '🕸️', desc: 'Professional batting and bowling nets, ideal for skill improvement.' },
  { id: 3, name: 'Indoor Turf',   icon: '🏟️', desc: 'Climate-controlled indoor arena suitable for all weather conditions.' },
  { id: 4, name: 'Open Ground',   icon: '🌳', desc: 'Full-size open ground, perfect for complete match simulations.' },
];
