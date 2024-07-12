import { showToast } from "@/utils/toasts";
import { isNotANumber } from "@/utils/validations";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from '@mantine/core';

export default function Home() {
  // const [loading, setLoading] = useState(null) - loading={loading}(inline/button)
  const [primeNumber, setPrimeNumber] = useState('');
  const [isPrime, setIsPrime] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentAddNumber, setCurrentAddNumber] = useState('');
  const [activeView, setActiveView] = useState('prime');

  const { i18n } = useTranslation();
  const tCommon = useTranslation('common').t;
  const tToasts = useTranslation('toasts').t;
  const tFooter = useTranslation('footer').t;

  const router = useRouter();



  /**
   * Checks the Language route and changes it accordingly.
   * @param {string} newLanguage - The new language to switch to.
  */
  function handleChangeLanguage(newLanguage) {
    if (router.locale !== newLanguage) {
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: newLanguage, scroll: false });
    }
  }


  /**
   * Toggles between the prime number view and the order numbers view.
  */
  const toggleView = () => {
    setActiveView((prevView) => (prevView === 'prime' ? 'order' : 'prime'));
  };


  /**
  * Handles key press events to trigger relevant actions.
  * @param {object} event - The key press event.
  */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (activeView === 'prime') {
        handleCheckPrime();
      } else {
        handleAddNumber();
      }
    }
  };


  /**
 * Displays a toast message.
 * @param {string} type - The type of the toast message ('error', 'success', etc.).
 * @param {string} message - The message to be displayed.
 */
  const showToastMessage = (type, message) => {
    if(toastActive){
      setToastActive(false)
    }
    if (!toastActive) {
      showToast({ type, msg: message });
      setToastMessage(message);
      setToastActive(true);
      setTimeout(() => {
        setToastActive(false);
      }, 3000);
    }
  };


  /**
   * Handles the change event for the prime number input.
   * @param {object} event - The input change event.
   */
  const handlePrimeNumberInputChange = (event) => {
    const { value } = event.target;

    if (value.length > 17) {
      showToastMessage("warning", tToasts("prime_number_too_long"));
    }

    if (isNotANumber(value)) {
      showToastMessage("error", tToasts("not_number"));
    } else {
      setIsPrime(null);
      setPrimeNumber(value);
    }
  };


  /**
 * Checks if a number is prime.
 * @param {number|string} num - The number to be checked.
 * @returns {boolean} - Returns true if the number is prime, false otherwise.
 */
  const checkPrime = (num) => {
    const bigNum = BigInt(num)
    const numSQRT = Math.sqrt(num)

    if (bigNum < 2) {
      showToastMessage("error", tToasts("isnt_prime"));
      // setLoading(false)
      return false;
    }

    for (let i = 2; i <= numSQRT; i++) {
      if (bigNum % BigInt(i) === 0n) {
        showToastMessage("error", tToasts("isnt_prime"));
        // setLoading(false)
        return false;
      }
    }

    showToastMessage("success", tToasts("is_prime"));
    // setLoading(false)
    return true;
  };


  /**
  * Handles the prime number check logic.
  */
  const handleCheckPrime = () => {
    // setLoading(true)
    if (primeNumber.toString().includes('.')) {
      showToastMessage("error", tToasts("decimal_number"));
      return false;
    }

    else if (primeNumber.length > 45) {
      showToastMessage("warning", tToasts("number_too_long"));
    }

    else if (!primeNumber) {
      showToastMessage("warning", tToasts("no_number"));
    }

    else if (isNotANumber(primeNumber)) {
      showToastMessage("error", tToasts("not_number"));
      return;
    }
    else { setIsPrime(checkPrime(primeNumber)); }
  };




  /**
 * Handles the change event for the add number input.
 * @param {object} event - The input change event.
 */
  const handleChangeAddNumber = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (value.length > 45) {
      showToastMessage("warning", tToasts("number_too_long"));
    }
    if (isNotANumber(value) || value === ".") {
      showToastMessage("error", tToasts("not_number"));
    } else {
      setCurrentAddNumber(value);
    }
  };


  /**
 * Handles adding a number to the list of numbers.
 */
  const handleAddNumber = () => {
    if (numbers.length >= 10) {
      showToastMessage("error", tToasts("limit_reached"));
    }
    else if (currentAddNumber.length === 0) {
      showToastMessage("warning", tToasts("no_number"));
    }
    else if (currentAddNumber.length > 45) {
      showToastMessage("warning", tToasts("number_too_long"));
    }
    else {
      setNumbers((prevNumbers) => [...prevNumbers, currentAddNumber].sort((a, b) => a - b));
      setCurrentAddNumber("");
    }
  };




  /**
 * Resets the list of numbers.
 */
  const handleResetNumbers = () => {
    if (numbers.length === 0) {
      showToastMessage("warning", tToasts("no_number"));
    } else {
      setNumbers([]);
      showToastMessage("success", tToasts("clear_success"));
    }
  };




  return (
    <>
      <Head>
        <title>Janz 2Logical Response</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/2logicallogo.webp" />
      </Head>
      <main>
        <div className="container">
          <img
            src="2logicallogo.webp"
            alt="2logical Main Logo"
            className="logical-main-logo"
            fetchpriority="high"
          />
          <span className="header-text">
            {tCommon("challenge_response_text")}
          </span>
          <img
            src="https://static.wixstatic.com/media/a4e037_9b1c4a0553f84e85b65301537e77c343~mv2.gif"
            alt="panel.gif"
            className="centered-image"
            fetchpriority="high"
          />
          <div className="button-group">
            <Button.Group className="main-button-group">
              <Button
                variant={i18n.language === "en" ? "filled" : "outline"}
                onClick={() => handleChangeLanguage("en")}
                autoContrast
                className="prime-number-button"
              >
                EN
              </Button>
              <Button
                variant={i18n.language === "pt" ? "filled" : "outline"}
                onClick={() => handleChangeLanguage("pt")}
                autoContrast
                className="prime-number-button"
              >
                PT
              </Button>
              <Button
                variant={i18n.language === "es" ? "filled" : "outline"}
                onClick={() => handleChangeLanguage("es")}
                autoContrast
                className="prime-number-button"
              >
                ES
              </Button>
            </Button.Group>
          </div>
          <Button.Group>
            <Button
              color="#FF4040"
              autoContrast
              onClick={() => toggleView('prime')}
              className={`toggle-button ${activeView === 'prime' ? 'active' : ''}`}
            >
              {tCommon("prime_number_check")}
            </Button>
            <Button
              color="#FF4040"
              autoContrast
              onClick={() => toggleView('order')}
              className={`toggle-button ${activeView === 'order' ? 'active' : ''}`}
            >
              {tCommon("order_numbers")}
            </Button>
          </Button.Group>
          {activeView === 'prime' ? (
            <div className="prime-number-container">
              <p className="prime-main-text">{tCommon("prime_main_text")}</p>
              <input
                className="prime-number-input"
                value={primeNumber}
                onChange={handlePrimeNumberInputChange}
                onKeyDown={handleKeyPress}
              />
              <Button className="prime-number-button" color="#FF4040" autoContrast onClick={() => { handleCheckPrime() }}>
                {tCommon("verify")}
              </Button>
              {isPrime !== null && (
                <p className="is-prime-text">{isPrime ? tToasts("is_prime") : tToasts("isnt_prime")}</p>
              )}
            </div>
          ) : (
            <div className="add-number-container">
              <p className="order-main-text">{tCommon("order_main_text")}</p>
              <input
                value={currentAddNumber}
                name="number"
                className="add-number-input"
                onChange={handleChangeAddNumber}
                onKeyDown={handleKeyPress}
              />
              {numbers.length > 0 && (
                <>
                  <p className="ordered-numbers-text">{tCommon("ordered_numbers")}</p>
                  <span> {numbers.join(', ')} </span>
                </>
              )}
              <Button.Group>
                <Button
                  color="#FF4040"
                  className="add-number-button"
                  type="submit"
                  onClick={handleAddNumber}
                >
                  {tCommon("add_number")}
                </Button>
                <Button style={{ opacity: numbers.length > 0 ? 1 : 0.6 }} color="#FF4040" className="reset-number-button" onClick={handleResetNumbers}>
                  {tCommon("reset_numbers")}
                </Button>
              </Button.Group>
            </div>
          )}
          <footer className="footer">
            <img
              src="Logotipo2LogicalBottom.webp"
              alt="2 Logical Bottom Logo"
              className="logical-bottom-logo"
            />
            <img
              src="UEBottomLogo.webp"
              alt="2 Logical Bottom Logo"
              className="UE-bottom-logos"
            />
            <span className="logical-reserved-text">{tFooter("date_variable", { year: new Date().getFullYear() })}</span>
          </footer>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "toasts", "footer"]))
    }
  };
}
