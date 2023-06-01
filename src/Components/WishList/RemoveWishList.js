export const RemoveFromWishList = async (id) => {
    console.log("delete wishlist api")
    const token = localStorage.getItem("Encodedtoken");
    const response = await fetch(`/api/user/wishlist/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `"${token}"`, // Assuming 'token' holds the actual token value
          },
    })
    // console.log("response",await response.json())
    const wishList = await response.json()
    return wishList;
}