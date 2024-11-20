import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <ToastContainer />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
