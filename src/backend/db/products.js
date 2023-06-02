import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "Printed Tshirt",
    description: "Regular fit round Neck",
    url:"https://tse1.mm.bing.net/th?id=OIP.6pN5s66ma4e6o7e0kbDOOgHaHa&pid=Api&P=0&h=180",
    rating:4.5,
    rated:3900,
    price: 500,
    discount:10,
    size:'L',
    categoryName: "Women",
  },
  {
    _id: uuid(),
    title: "Roadster",
    description: "Men By The Sea Eau De Parfum - 100 ml",
    rating:3.2,
    price: 1000,
    discount:50,
    size:"XL",
    categoryName: "Men",
  },
  {
    _id: uuid(),
    title: "JAGUAR",
    description: "Men Classic Eau De Toilette 100 ml",
    rating:3,
    price: 2050,
    discount:40,
    size:"XXL",
    categoryName: "Men",
  },
  {
    _id: uuid(),
    title: "Carolina Herrera",
    description: "Good Girl Eau de Parfum 80 ml ",
    rating:4,
    price: 8100,
    discount:50,
    size:"S",
    categoryName: "Women",
  },
  {
    _id: uuid(),
    title: "Perfume",
    description: "by Titan Women Celeste Eau de Parfum 20 ml",
    rating:4,
    rated:3900,
    price: 500,
    discount:10,
    size:"S",
    categoryName: "Juniors",
  },
  {
    _id: uuid(),
    title: "SKINN",
    description: "by Titan Women Celeste Eau de Parfum 20 ml",
    rating:5,
    rated:4082,
    price: 500,
    discount:10,
    size:"M",
    categoryName: "men",
  },
  {
    _id: uuid(),
    title: "SKINN",
    description: "by Titan Women Celeste Eau de Parfum 20 ml",
    rating:2,
    rated:3900,
    price: 500,
    discount:10,
    size:"L",
    categoryName: "women",
  }
];
