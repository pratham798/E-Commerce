import "../styles/globals.css";
import { Provider, createClient } from "urql"; //used for fetching adn other operations for graphql
import Nav from "../Components/Nav";
import { StateContext } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast"; //for getting pop up after a certain action

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
//to use urql we need to pass a url for creating a client
//we can directly pass url but to secure it we make a .env file and declared that url as above mentioned name
// use NEXT_PUBLIC_<NAME> as the syntax for naming url in next js

//data is taken from the url
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}
export default MyApp;
