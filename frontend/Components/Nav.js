import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useStateContext } from "../lib/context";
import { NavStyle } from "../styles/NavStyle";
import { NavItems } from "../styles/NavStyle";
import Cart from "./Cart";
export default function Nav() {
  const {showCart,setShowCart}=useStateContext();
  return (
    <NavStyle>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
      <div onClick={()=>setShowCart(true)}>
        <FiShoppingBag />
        <h3>Cart</h3>
      </div>
      </NavItems>
      {showCart && <Cart />}
    </NavStyle>
  );
}
