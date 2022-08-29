import { socialMedia } from "../constants"
import { facebook, instagram, linkedin, twitter } from "../assets"

const Footer = () => {
    return (
        <section className="flex flex-col min-h-screen">
            <div className="mt-auto w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
                <p className="font-normal text-center text-[18px] leading-[27px] text-white">
                    Copyright Ⓒ 2022 Demo Blockchain Pokemon. All Rights Reserved.
                </p>
                <div className="flex flex-row md:mt-0 mt-6">
                    <img src={facebook} onClick={() => window.open("https://www.facebook.com/")} />
                    <img
                        src={instagram}
                        onClick={() => window.open("https://www.instagram.com/")}
                    />
                    <img src={linkedin} onClick={() => window.open("https://www.linkedin.com/")} />
                    <img src={twitter} onClick={() => window.open("https://www.twitter.com/")} />
                </div>
            </div>
        </section>
    )
}

export default Footer
