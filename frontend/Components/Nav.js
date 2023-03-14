import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useStateContext } from "../lib/context";
import { NavStyle } from "../styles/NavStyle";
import { NavItems } from "../styles/NavStyle";

import User from "./User.js";
import Cart from "./Cart";

const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <NavStyle>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      {/* used for detecting when the cart is closing and then apply the animations to it */}
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyle>
  );
}
