import '@/styles/globals.css'
import { QueryClientProvider } from '../components/provider/QueryClientProvider'
import { Provider } from 'react-redux';
import { store } from '@/components/redux/store';


export default function App({ Component, pageProps }) {
  let myObject = { mount: true ,}

if (myObject && myObject.mount) {
  // Do something with myObject.mount
   return<Provider store={store}><QueryClientProvider  >
     <Component {...pageProps} />
  </QueryClientProvider></Provider>
   
} else {
  console.log('myObject or myObject.mount is undefined');
}


}
