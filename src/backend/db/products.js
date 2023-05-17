import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "SKINN",
    description: "by Titan Women Celeste Eau de Parfum 20 ml",
    rating:4.5,
    rated:3900,
    price: 500,
    discount:10,
    categoryName: "women",
  },
  {
    _id: uuid(),
    title: "Roadster",
    description: "Men By The Sea Eau De Parfum - 100 ml",
    rating:3.2,
    price: 1000,
    discount:50,
    categoryName: "men",
  },
  {
    _id: uuid(),
    title: "JAGUAR",
    description: "Men Classic Eau De Toilette 100 ml",
    rating:3,
    price: 2050,
    discount:40,
    categoryName: "men",
  },
  {
    _id: uuid(),
    title: "Carolina Herrera",
    description: "Good Girl Eau de Parfum 80 ml ",
    rating:4.6,
    price: 8100,
    discount:50,
    categoryName: "women",
  },

];
