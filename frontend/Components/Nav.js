import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyle } from "../styles/NavStyle";
import { NavItems } from "../styles/NavStyle";
import Cart from "./Cart";
export default function Nav() {
  return (
    <NavStyle>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <FiShoppingBag />
        <h3>Cart</h3>
      </NavItems>
      <Cart />
    </NavStyle>
  );
}
