//globally declared as data is shared for all the components
import React ,{createContext,useContext,useState} from  "react";

const ShopContext=createContext();

export const StateContext =({children})=>{
    //Adding data for state
    const [qty,setQty]= useState(1);
    const [showCart, setShowCart]=useState(false);
    const [cartItems, setCartItems] =useState([]);
    //Increase product Quantity
    const increaseQty = () => {
         setQty((prevQty)=>prevQty+1);
    };

    //Decrease product quantity
    const decreaseQty = () =>
    {
         setQty(prevQty=>{
            if(prevQty-1<1) return 1;
            return prevQty-1;
         });
    };

    //Add Product To Cart
    const onAdd=(product,quantity)=> {
       //Check if The product is already in the cart
       const exist =cartItems.find(item=>item.slug === product.slug);
       if(exist){
         setCartItems(cartItems.map((item)=>item.slug===product.slug ?{...exist,quantity: exist.quantity+quantity}:item))
       }
       else{
            setCartItems([...cartItems,{...product, quantity: quantity }])
       }
    }
    return(
        <ShopContext.Provider value={{qty,increaseQty,decreaseQty,showCart,setShowCart,cartItems,onAdd}}>
        {/*  children automatically detects all the components instead of specifying everyone */}
            {children}
        </ShopContext.Provider>
    );

}

export const useStateContext=()=>useContext(ShopContext);