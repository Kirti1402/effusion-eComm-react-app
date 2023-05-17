export const CartItems = () => {
  const CartList = [
    {
      id: 1,
      name: "shirt",
      price: 200,
    },
    { id: 2, name: "skirt", price: 400 },
    {
      id: 3,

      name: "jeans",
      price: 200,
    },
  ];

  return <>
  <div>{CartList.map(item=>
     <li key={item.id}>
        {item.name}
        {item.price}
    </li>)}</div>
  </>
};
