export const RemoveFromWishList = async (id) => {
    const token = localStorage.getItem("Encodedtoken");
    const response = await fetch(`/api/user/wishlist/${id}`, {
        method: 'POST',
        headers: {
            authorization: `"${token}"`, // Assuming 'token' holds the actual token value
          },
    })
    console.log(await response.json())
}