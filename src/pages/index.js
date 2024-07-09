import { showToast } from "@/utils/toasts";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [primeNumber, setPrimeNumber] = useState('');
  const [isPrime, setIsPrime] = useState(null);
  const [numbers, setNumbers] = useState(Array(10).fill(''));
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const tCommon = useTranslation('common').t
  const tToasts = useTranslation('toasts').t

  const checkPrime = (num) => {
    if (num < 2) {
      if (!toastActive) {
        showToast({ type: "error", msg: "O número não é primo!" });
        setToastMessage("Por favor introduza um número");
        setToastActive(true);
        setTimeout(() => {
          setToastActive(false);
        }, 3000);
      }
      return false;
    } 
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        if (!toastActive) {
          showToast({ type: "error", msg: "O número não é primo!" });
          setToastMessage("Por favor introduza um número");
          setToastActive(true);
          setTimeout(() => {
            setToastActive(false);
          }, 3000);
        }
        return false;
      }
    }
    if (!toastActive) {
      showToast({ type: "success", msg: tToasts("is_prime") });
      setToastMessage("Por favor introduza um número");
      setToastActive(true);
      setTimeout(() => {
        setToastActive(false);
      }, 3000);
    }
    return true;
  };

  const handleCheckPrime = () => {
    const num = parseInt(primeNumber, 10);
    setIsPrime(checkPrime(num));
  };

  const handleSortNumbers = () => {
    const nums = numbers.map(num => parseInt(num, 10)).sort((a, b) => a - b);
    setSortedNumbers(nums);
  };

  const handleNumberChange = (index, value) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const handlePrimeNumberInputChange = (event) => {
    const { value } = event.target;
    if (Number.isNaN(Number(value))) {
      if (!toastActive) {
        showToast({ type: "error", msg: "Por favor introduza um número" });
        setToastMessage("Por favor introduza um número");
        setToastActive(true);
        setTimeout(() => {
          setToastActive(false);
        }, 3000);
      }
      } else {
        setPrimeNumber(value);
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
        <div className="prime-number-container">
          <p>Insira um número e clique no botão para conferir se é primo:</p>
          <input
            className="prime-number-input"
            value={primeNumber}
            onInput={handlePrimeNumberInputChange}
          />
          <button className="prime-number-button" onClick={handleCheckPrime}>
            {tCommon("verify")}
          </button>
          {isPrime !== null && (
            <p>{isPrime ? tToasts("is_prime") : 'O número não é primo'}</p>
          )}
        </div>
        <div className="prime-number-container">
          <p>Insira 10 números para ordenar:</p>
          {numbers.map((num, index) => (
            <input
              key={index}
              className="prime-number-input"
              type="number"
              value={num}
              onChange={(e) => handleNumberChange(index, e.target.value)}
            />
          ))}
          <button className="prime-number-button" onClick={handleSortNumbers}>
            Ordenar
          </button>
          {sortedNumbers.length > 0 && (
            <p>Números ordenados: {sortedNumbers.join(', ')}</p>
          )}
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps({ locale }) {

  return {
      props: {
          ...(await serverSideTranslations(locale, ["common", "toasts"]))
      }
  };
}
