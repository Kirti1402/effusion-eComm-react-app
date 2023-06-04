import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "Polo Shirt",
    description: "Van Heusen Men's Regular Fit Polo Shirt",
    url:"https://m.media-amazon.com/images/I/71mabojWcsL._UX466_.jpg",
    rating:3.9,
    price: 625,
    discount:5,
    size:'M',
    categoryName: "Men",
  },
  {
    _id: uuid(),
    title: "Cotton Kurta with Palazzo Set",
    description: "Ethnic Motifs Embroidered Sequined Kurta with Palazzos",
    url:"https://m.media-amazon.com/images/I/51ITkdswJFL._UL1500_.jpg",
    rating:4.5,
    price: 999,
    discount:10,
    size:'M',
    categoryName: "Women",
  },
  {
    _id: uuid(),
    title: "Printed Straight Kurta",
    description: "Amayra Men's Cotton Printed Straight Kurta",
    url:"https://m.media-amazon.com/images/I/71G1BdaZzJL._UL1500_.jpg",
    rating:4.9,
    price: 829,
    discount:15,
    size:'L',
    categoryName: "Men",
  },
  {
    _id: uuid(),
    title: "Floral Jumpsuit for Girls",
    description: "Arshia Fashions Knee Length Cotton Floral Jumpsuit",
    url:"https://m.media-amazon.com/images/I/915Z4E-SIvL._UL1500_.jpg",
    rating:3.2,
    price: 1000,
    discount:3,
    size:"S",
    categoryName: "Juniors",
  },
  {
    _id: uuid(),
    title: "T-Shirt with Denim Shorts",
    description: "Googo Gaaga Boy's Cotton Printed T-Shirt",
    url:"https://m.media-amazon.com/images/I/51z0B0H2wLL.jpg",
    rating:3,
    price: 999,
    discount:3,
    size:"XL",
    categoryName: "Juniors",
  },
  {
    _id: uuid(),
    title: "Short A-Line Dress",
    description: "Leriya Fashion Western Dresses for Women",
    url:"https://m.media-amazon.com/images/I/713EWcF36KL._UL1500_.jpg",
    rating:4,
    price: 249,
    discount:2,
    size:"S",
    categoryName: "Women",
  },
  {
    _id: uuid(),
    title: "Cargo Trousers",
    description: "Broadstar Women High-Rise,Straight Fit trouser",
    url:"https://m.media-amazon.com/images/I/31XO1-rezAL.jpg",
    rating:5,
    price: 1499,
    discount:8,
    size:"L",
    categoryName: "Women",
  },
  {
    _id: uuid(),
    title: "DHRUVI TRENDZ Shirt",
    description: "Tropical Leaf Printed Shirt for Men,with turn down collar.",
    url:"https://m.media-amazon.com/images/I/519yrZ9qILL.jpg",
    rating:2.5,
    price: 1299,
    discount:10,
    size:"S",
    categoryName: "Men",
  },
  {
    _id: uuid(),
    title: "T-Shirt For Girl's",
    description: "Cherokee by Unlimited Girl's Regular T-Shirt",
    url:"https://m.media-amazon.com/images/I/71coy-sc6UL._UL1500_.jpg",
    rating:1.2,
    price: 2000,
    discount:25,
    size:"L",
    categoryName: "Juniors",
  },
  {
    _id: uuid(),
    title: "Oversized T-Shirt",
    description: "CALM DOWN Drop Shoulder T-Shirt for Women",
    url:"https://m.media-amazon.com/images/I/61q-DoKtFpL._UL1490_.jpg",
    rating:3,
    price: 799,
    discount:30,
    size:"XL",
    categoryName: "Women",
  },
  {
    _id: uuid(),
    title: "Casual Pants",
    description: "Amazon Brand - Symbol Men Regular Casual Pants",
    url:"https://m.media-amazon.com/images/I/71rQD1ndKpL._UL1500_.jpg",
    rating:3.5,
    price: 1599,
    discount:25,
    size:"XL",
    categoryName: "Men",
  },{
    _id: uuid(),
    title: "Cotton Kid's T-Shirt",
    description: "Bold N Elegant Half Sleeve Cotton Kid's T-Shirt",
    url:"https://m.media-amazon.com/images/I/61M0jzflioL._UL1018_.jpg",
    rating:2.9,
    price: 1999,
    discount:30,
    size:"M",
    categoryName: "Juniors",
  },
];
