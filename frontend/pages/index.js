import Head from "next/head"; // Allows us to name the website and link style sheet as specified under the head tag
import Image from "next/image"; //Allows us to optimize or make chnges to any image imported in nextjs
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../Components/Products";
import { Gallery } from "../styles/Gallery";
export default function Home() {
  //Fetch Products From Strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;
  //check for data incoming
  if (fetching) return <p>Loading..</p>;
  if (error) return <p>Oops!...{error.message}</p>;
  const products = data.products.data;
  return (
    <div>
      <Head>
        <title>Styled Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Gallery>
          {/* Travelling over all the products through map and passing it on to the product component */}
          {products.map((product) => (
            <Product key={product.attributes.slug} Product={product} />
          ))}
        </Gallery>
      </main>
    </div>
  );
}
