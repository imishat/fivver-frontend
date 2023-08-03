import '@/styles/globals.css'
import { QueryClientProvider } from '@tanstack/react-query'


export default function App({ Component, pageProps }) {
  let myObject = { mount: true}

if (myObject && myObject.mount) {
  // Do something with myObject.mount
   return <QueryClientProvider  >
     <Component {...pageProps} />
  </QueryClientProvider>
   
} else {
  console.log('myObject or myObject.mount is undefined');
}


}
