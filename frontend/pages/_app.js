import "../styles/globals.css";
import { Provider, createClient } from "urql"; //used for fetching adn other operations for graphql
import Nav from "../Components/Nav";
import { StateContext } from "../lib/context";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
//to use urql we need to pass a url for creating a client
//we can directly pass url but to secure it we make a .env file and declared that url as above mentioned name
// use NEXT_PUBLIC_<NAME> as the syntax for naming url in next js

//data is taken from the url
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </StateContext>
  );
}
export default MyApp;
