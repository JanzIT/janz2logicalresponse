import "@/styles/globals.css";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { appWithTranslation } from 'next-i18next';

 function App({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />;
    <ToastContainer
      newestOnTop
      stacked
      transition={Flip}
      style={{ color: 'white' }}
      pauseOnFocusLoss={false}
    />
  </>
}

export default appWithTranslation(App)
