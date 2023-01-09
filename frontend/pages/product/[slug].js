import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import { Buy, DetailsStyle,ProductInfo,Quantity} from "../../styles/ProductDetails";
import {AiFillPlusCircle,AiFillMinusCircle} from "react-icons/ai";
import { useStateContext } from "../../lib/context";
export default function ProductDetails() {

    //Use State
    const {qty,increaseQty,decreaseQty,onAdd}= useStateContext();
    //Fetch slug
    const {query}= useRouter();

    //Fetch GraphQL data
    const [results]=useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug: query.slug },
    });

    const {data,fetching,error}=results;
    //check for data coming in
    if(fetching) return <p>Loading..</p>;
    if(error) return <p>Oops!...{error.message}</p>;

    console.log(data);
    const { Title , Description , image} = data.products.data[0].attributes;

    return(
    <DetailsStyle>
        <img src={image.data.attributes.formats.medium.url} alt={Title}></img>
        <ProductInfo>
           <h3>{Title}</h3>
           <p>{Description}</p>
           <Quantity>
            <span>Quantity</span>
            <button onClick={decreaseQty}><AiFillMinusCircle /></button>
            <p>{qty}</p>
            <button onClick={increaseQty}><AiFillPlusCircle /></button>
            </Quantity>
        <Buy onClick={()=>onAdd(data.products.data[0].attributes,qty)}>Add to Cart</Buy>
        </ProductInfo>
        </DetailsStyle>
    );
}