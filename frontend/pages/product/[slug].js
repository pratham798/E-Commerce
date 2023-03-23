import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  Buy,
  DetailsStyle,
  ProductInfo,
  Quantity,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

// const {motion} =require('framer-motion'); //we cant import framer motion like others as it gives error

export default function ProductDetails() {
  //Use State
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  useEffect(() => setQty(1), []);
  //Fetch slug
  //use router is a hook which creates an object with certain members
  //here we are taking slug from it which creates a string with the same name as the url entres after../ and we are passing it to the query
  const { query } = useRouter();

  //Fetch GraphQL data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug }, //passed on slug from query created through use router
  });

  const { data, fetching, error } = results;
  //check for data coming in
  if (fetching) return <p>Loading..</p>;
  if (error) return <p>Oops!...{error.message}</p>;

  const { Title, Description, image } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={Title}></img>
      <ProductInfo>
        <h3>{Title}</h3>
        <p>{Description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={increaseQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            toast(" ✅ Product Added To Cart");
          }}
        >
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
