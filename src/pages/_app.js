import "@/styles/globals.css";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { appWithTranslation } from 'next-i18next';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';


const theme = createTheme({
 //
});

function App({ Component, pageProps }) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer
        newestOnTop
        stacked
        transition={Flip}
        style={{ color: 'white' }}
        pauseOnFocusLoss={false}
      />
    </MantineProvider>
  );
}

export default appWithTranslation(App);
