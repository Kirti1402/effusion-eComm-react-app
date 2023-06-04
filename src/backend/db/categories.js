import { v4 as uuid } from "uuid";


/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Men",
    url:'https://images.pexels.com/photos/2445783/pexels-photo-2445783.jpeg',

  },
  {
    _id: uuid(),
    categoryName: "Women",
    url:'https://thumbs.dreamstime.com/b/fashion-shopping-girl-portrait-beauty-woman-shopping-bags-shopping-mall-shopper-sales-shopping-center-fashion-shopping-179147985.jpg',

  },
  {
    _id: uuid(),
    categoryName: "Juniors",
    url:'https://images.pexels.com/photos/3582865/pexels-photo-3582865.jpeg',
  },
];
