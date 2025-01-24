import apartment from '../assets/images/apartment.jpg';
import blueEmpire from '../assets/images/blue_empire.jpg';
import gh from '../assets/images/gh.jpeg';
import h1 from '../assets/images/h1.jpeg';
import h2 from '../assets/images/h2.jpeg';
import h3 from '../assets/images/h3.jpeg';
import l1 from '../assets/images/l1.jpeg';
import room from '../assets/images/room.webp';
import wdc from '../assets/images/wdc.jpeg';

export const sampleProperties = [
  {
    id: 1,
    title: "Agape House",
    type: "apartment",
    location: "Buea town",
    price: 55000,
    status: "available",
    images: [apartment],
    description: "Modern apartment in the heart of Buea"
  },
  {
    id: 2,
    title: "Jordan Breeze Cite",
    type: "room",
    location: "Ndongo",
    price: 350000,
    status: "available",
    images: [room],
    description: "Comfortable single room accommodation"
  },
  {
    id: 3,
    title: "Landed Property",
    type: "land",
    location: "Bokwai Buea",
    price: 4200000,
    status: "available",
    images: [l1],
    description: "Modern studio apartments"
  },
  {
    id: 4,
    title: "Blue Empire",
    type: "hotel",
    location: "Molyko",
    price: 80000,
    status: "available",
    images: [blueEmpire],
    description: "Luxury hotel accommodation"
  },
  {
    id: 5,
    title: "Botaffo House",
    type: "guest house",
    location: "Molyko",
    price: 20000,
    status: "available",
    images: [gh],
    description: "Cozy guest house with great amenities"
  },
  {
    id: 6,
    title: "WDC Hotel",
    type: "hotel",
    location: "Mile 17",
    price: 80000,
    status: "available",
    images: [wdc],
    description: "Premium hotel experience"
  }
]; 