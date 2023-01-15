import { useStateContext } from "../lib/context";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Quantity,
} from "../styles/CartStyles";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
export default function Cart() {
  const { cartItems } = useStateContext();
  return (
    <CartWrapper>
      <CartStyle>
        {cartItems.length < 1 && (
          <EmptyStyle>
            <h1>Oh! seems you havent checked out anything for a while </h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card>
                <img
                  src={item.image.data.attributes.formats.thumbnail.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}</h3>
                  <Quantity>
                    <span>Quantity</span>
                    <button>
                      <AiFillMinusCircle></AiFillMinusCircle>
                    </button>
                    <p>{item.quantity}</p>
                    <button>
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
