"use client"
import LoginSignForm from "@/components/loginform/loginform";
import { Provider } from 'react-redux';
import { store } from '../lib/store';


export default function Home({ pageProps }: { pageProps: { foo: string } }) {

  //<LoginSignForm /> para form de login
  return (
  <Provider store={store}>
    <LoginSignForm {...pageProps} />
  </Provider>
  );
}
