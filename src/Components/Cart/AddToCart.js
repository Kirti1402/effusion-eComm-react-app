export const AddToCart = async (productItem) => {
  const token = localStorage.getItem("Encodedtoken");
  const response = await fetch("/api/user/cart", {
    method: "POST",
    headers: {
      authorization: `"${token}"`, // Assuming 'token' holds the actual token value
    },
    body: JSON.stringify(productItem),
  });

  console.log(await response.json());
};
