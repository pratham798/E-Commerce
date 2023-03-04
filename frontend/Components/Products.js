import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link"; //used for redirecting
export default function Product({Product})
{
    const {Title,price,image,slug}=Product.attributes;
    return(
        <ProductStyle>
        <div>
            <div id="gridSize">
            <Link href={`product/${slug}`}>
                <img src={image.data.attributes.formats.small.url} alt="" />
            </Link>
                <h2>{Title}</h2>
                <h3>{price}</h3>
            </div>
        </div>
        </ProductStyle>
    );
}