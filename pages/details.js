import Link from "next/link"

export default function Home() {
    return (
        <div className="bg-gray-400 min-h-screen">
            <div className={`sm:px-16 px-6 flex flex-col justify-center items-center`}>
                <p className="indent-5 font-medium text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-20 px-2">
                    All assests here are from Pokemon HeartGold. Offcourse you can't catch a
                    Legendary Pokemon that are shown in the banner(for now). Day Pokemon includes
                    CHARMANDER, SQUIRTLE, BULBASAUR, PIDGEY and one hidden Pokemon. Night Pokemon
                    includes CYNDAQUIL, TOTODILE, CHIKORITA, HOOTHOOT and also a hidden Pokemon. All
                    rates won't be mentioned here for now since this will be further populated on
                    later updates. Also you have a higher than the games (1%) chance of catching a
                    SHINY pokemon. Best of luck to all.
                </p>
                <br />
                <br />
                <br />
                <Link href="/" className="flex flex-col items-center">
                    <a className="font-semibold hover:text-white">HOME</a>
                </Link>
            </div>
        </div>
    )
}
