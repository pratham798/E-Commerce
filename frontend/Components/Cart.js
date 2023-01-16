import { useStateContext } from "../lib/context";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
} from "../styles/CartStyles";
import {Quantity} from '../styles/ProductDetails'
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
export default function Cart() {
  const { cartItems,showCart,setShowCart,qty,onAdd,onRemove} = useStateContext();
  return (
    <CartWrapper onClick={()=>setShowCart(false)}>
    {/* by giving the onclick property to cartwrapper if you click on any other child class below it will get activated so to avoid it
    we get the event and used e.stopPropogation which indicates that any child class including this one will not be running its parent function(the one on which it is used)  */}
      <CartStyle onClick={(e)=>e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyStyle>
            <h1>Oh! seems you havent checked out anything for a while </h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card key={item.slug}>
                <img
                  src={item.image.data.attributes.formats.thumbnail.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}</h3>
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
      </CartStyle>
    </CartWrapper>
  );
}
