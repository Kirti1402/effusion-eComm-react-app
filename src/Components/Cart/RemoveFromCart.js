export const RemoveFromCart = async (id) =>{
    console.log(`/api/user/cart/${id}`)
    const token = localStorage.getItem("Encodedtoken");
    const response = await fetch(`/api/user/cart/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `"${token}"`, // Assuming 'token' holds the actual token value
          },
           })

    console.log("Deleted",await response.json())
}
