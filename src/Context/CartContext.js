import { createContext } from "react";

export const  cartContext = createContext()

export  const cartProvider = ({children}) =>{
    const [addedToCartList, setAddedToCartList] = useState([]);
    return <cartContext.Provider value={{addedToCartList,setAddedToCartList}}>
        {children}
    </cartContext.Provider>
}