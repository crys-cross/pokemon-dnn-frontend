import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import Mint from "../components/Mint"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className="bg-primary w-full overflow-hidden">
            {/* header / connect button / nav bar */}
            <Header />
            <Mint />
            <Footer />
        </div>
    )
}
