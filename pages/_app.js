import { store } from "@/components/redux/store";
import ContextProvider from "@/context/ContextProvider";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { QueryClientProvider } from "../components/provider/QueryClientProvider";

export default function App({ Component, pageProps }) {
  let myObject = { mount: true };

  if (myObject && myObject.mount) {
    // Do something with myObject.mount
    return (
      <Provider store={store}>
        <QueryClientProvider>
          <ContextProvider>
            <Component {...pageProps} />
          </ContextProvider>
        </QueryClientProvider>
      </Provider>
    );
  } else {
    console.log("myObject or myObject.mount is undefined");
  }
}
