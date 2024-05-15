"use client"
import LoginSignForm from "@/components/loginform/loginform";
import { Provider } from 'react-redux';
import { store } from '../lib/store';


export default function Home({ pageProps }: { pageProps: { foo: string } }) {

  return (
  <Provider store={store}>
    <LoginSignForm {...pageProps} />
  </Provider>
  );
}
