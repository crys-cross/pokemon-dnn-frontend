import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import Header from "../components/Header"

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Blockchain Pokemon Day and Night Demo</title>
                <meta name="description" content="Blockchain Pokemon Demo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
