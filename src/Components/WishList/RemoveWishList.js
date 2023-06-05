export const RemoveFromWishList = async (id) => {
  console.log("delete wishlist api");
  const token = localStorage.getItem("Encodedtoken");
  const response = await fetch(`/api/user/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `"${token}"`,
    },
  });
  const wishList = await response.json();
  return wishList;
};
