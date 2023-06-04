import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    email: "JohnDeo@gmail.com",
    password: "12345678",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "kirt",
    lastName: "singh",
    email: "testuser123@gmail.com",
    password: "12345",
    createdAt: formatDate(),
    updatedAt: formatDate(),

  }
];
