import { useRouter } from "next/router";
import Image from "next/image";
import shiba from "../public/shiba.png";
import styled from "styled-components";

const { motion } = require("framer-motion");

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

//this function will run on the server side
export async function getServerSideProps(params) {
  //Session id sent through stripe is recieved here in the form of params
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      // session id does not show what data it contains so to decipher it or to get something specific we use expand
      //here line-items contain all the data so we are expanding it to access orders from it to check refer to stripe.js
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}
export default function Success({ order }) {
  const route = useRouter();
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.75 }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        {/* the prop order which has been returned by stripe is an object with predetermined data members */}
        <InfoWrapper>
          <Address>
            <h3>Address</h3>
            {/* To display both the data member  and its value we can map thprugh the object entries like we have done below */}
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key}:{val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity:{item.quantity}</p>
                <p>Price:{item.price.unit_amount}</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push("/")}>Continue Shopping</button>
        {/* <Image src={shiba} alt="Shiba Dog" /> */}
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 5rem 5rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 3rem;
  h1 {
    color: var(--primary);
    margin-bottom: 1rem;
  }
  h2 {
    color: var(--secondary);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  button {
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;
  }
`;
const Address = styled.div`
  font-size: 1rem;
  width: 100%;
`;
const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;
const InfoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
`;
