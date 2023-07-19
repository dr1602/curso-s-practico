import "../styles/globals.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';

function MyApp({ Component, pageProps }) {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {

    const {solana} = window;

    if(solana) {
      if(solana.isPhantom) {
        console.log("Phantom wallet was found!");
        const response = await solana.connect({onlyIfTrusted: true});
        setWalletAddress(response.publicKey.toString());
      }
    } else {
      console.log("Phantom wallet wasn't found!");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);

  }, []);

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public key: ', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  }

  const executeActionWithWallet = async (action) => {
    if (walletAddress) {
      console.log("Executing action with wallet: ", action);  
    } else {
      console.log("Wallet is no connected");
    }

  }

  return (
    <div>

      {!walletAddress  && (
          <div className={styles.container}>
            <button
              className={styles.walletButton}
              onClick={connectWallet}
            >
              Conectarse
            </button>
          </div>
        )
      }

      <div>
        <main>
          <nav className="flex justify-evenly border-b p-3">
            <h1 className="text-4xl font-bold text-[#003B00]">Platzi [Solana] Movies </h1>
            <div className="flex items-center text-[#4c5267]">
              <Link href="/">
                <a className="mr-4">Inicio</a>
              </Link>
              <Link href="/add-movie">
                <a className="mr-6">Agregar Películas</a>
              </Link>
              <Link href="/my-movies">
                <a className="mr-6">Mis Películas</a>
              </Link>
            </div>
          </nav>
        </main>
        <Component {...pageProps}/>
      </div>

    </div>
  );
}

export default MyApp;
