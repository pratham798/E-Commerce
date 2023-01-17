import { useStateContext } from "../lib/context";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards,
} from "../styles/CartStyles";
import {Quantity} from '../styles/ProductDetails'
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

//Animation Variants
//we can declare framer motion animations at the top then use it wherever we want in the file
 const card={
  hidden:{opacity:0,scale:0.8},
  show: {opacity:1,scale:1},
 };

 const cards={
  hidden:{opacity:1},
  show: {
    opacity:1,
    transition:{
      delayChildren:0.4,
      staggerChildren: 0.1,
    },
  },
 }


export default function Cart() {
  const { cartItems,showCart,setShowCart,qty,onAdd,onRemove,totalPrice} = useStateContext();
  return (
    <CartWrapper 
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    onClick={()=>setShowCart(false)}>
    {/* by giving the onclick property to cartwrapper if you click on any other child class below it will get activated so to avoid it
    we get the event and used e.stopPropogation which indicates that any child class including this one will not be running its parent function(the one on which it is used)  */}
      <CartStyle 
      initial={{x:'50%'}}
      animate={{x:'0%'}}
      transition={{type:"tween"}}
      exit={{x:"50%"}}
      onClick={(e)=>e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyStyle
          initial={{opacity:0,scale:0.8}}
          animate={{opacity:1, scale:1}}
          transition={{delay:0.2}}
          >
            <h1>Oh! seems you havent checked out anything for a while </h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {/* we dont need to define animate and show to all the children classes once they are specified to the parent class */}
        <Cards layout variants={cards} animate="show" initial="hidden">
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              //layout helps in resizing and give it a nice animation when things get rearranged              
              <Card layout variants={card} key={item.slug}>
                <img
                  src={item.image.data.attributes.formats.thumbnail.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}$</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button onClick={()=>onRemove(item)}>
                      <AiFillMinusCircle></AiFillMinusCircle>
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={()=>onAdd(item,1)}>
                      <AiFillPlusCircle></AiFillPlusCircle>
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
          </Cards>
          {cartItems.length>=1 && (
            <Checkout layout>
              <h3>Subtotal:{totalPrice}$</h3>
              <button>Purchase</button>
            </Checkout>
          )}
      </CartStyle>
    </CartWrapper>
  );
}
