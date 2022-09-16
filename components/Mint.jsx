import { useWeb3Contract } from "react-moralis"
import pokemonNftabi from "../constants/pokemonNftAbi.json"
import networkAddresses from "../constants/networkAddresses.json"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Button } from "web3uikit"
import Image from "next/image"
import { day, night } from "../assets/index"
import Link from "next/link"

const Mint = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()

    const chainId = parseInt(chainIdHex)
    const pkmnAddress =
        chainId in networkAddresses ? networkAddresses[chainId]["CatchNft"][0] : null
    console.log(`Network Chain ID is: ${parseInt(chainIdHex)}`)
    console.log(`Working with contract address: ${pkmnAddress}`)
    const [mintFee, setMintFee] = useState("0")
    const [commonCounter, setCommonCounter] = useState("0")
    const [shinyCounter, setShinyCounter] = useState("0")
    const [totalMinted, setTotalMinted] = useState("0")
    const [isItDay, setIsItDay] = useState("false")
    const dispatch = useNotification()

    const {
        runContractFunction: catchPkmn,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: pkmnAddress,
        functionName: "catchPkmn",
        params: {},
        msgValue: mintFee,
    })

    const { runContractFunction: getMintFee } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: pkmnAddress,
        functionName: "getMintFee",
        params: {},
    })

    const { runContractFunction: getCommonCounter } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: pkmnAddress,
        functionName: "getCommonCounter",
        params: {},
    })

    const { runContractFunction: getShinyCounter } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: pkmnAddress,
        functionName: "getShinyCounter",
        params: {},
    })

    const { runContractFunction: getTokenCounter } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: pkmnAddress,
        functionName: "getTokenCounter",
        params: {},
    })

    const { runContractFunction: getIsItDayTime } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: pkmnAddress,
        functionName: "getIsItDayTime",
        params: {},
    })

    const updateUI = async () => {
        const mintFeeFromCall = (await getMintFee()).toString()
        setMintFee(mintFeeFromCall)
        const commonCounterFromCall = (await getCommonCounter()).toString()
        setCommonCounter(commonCounterFromCall)
        const shinyCounterFromCall = (await getShinyCounter()).toString()
        setShinyCounter(shinyCounterFromCall)
        const tokenCounterFromCall = (await getTokenCounter()).toString()
        setTotalMinted(tokenCounterFromCall)
        const isItDayFromCall = (await getIsItDayTime()).toString()
        setIsItDay(isItDayFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleSuccessNotification(tx)
        updateUI()
    }

    const handleSuccessNotification = () => {
        dispatch({
            type: "sucess",
            message: "Entered Successfully",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <section>
            <div className="flex md:flex-row flex-col-reverse sm:py-16 py-6">
                <Image
                    src={isItDay === "true" ? day : night}
                    alt="time"
                    className="w-[100%] h-[100%] relative z-[5]"
                />
                <div className="flex-1 flex justify-center items-start flex-col">
                    <p className="indent-5 font-medium text-[18px] leading-[30.8px] max-w-[470px] mt-5 px-2">
                        Welcome! All assets and encounter rates from HeartGold. All trademarks and
                        copyright belongs to Nintendo. You may try your luck in catching a pokemon
                        by pressing the button below. Pokemon will vary from rarity and also the
                        time of the day. Currently only have Day and Night mode with Ho-oh
                        symbolizing the day and Lugia to symbolize the night. Please click{" "}
                        <Link href="/details">
                            <a className="cursor-pointer hover:text-white">details</a>
                        </Link>{" "}
                        for more info on encounter rate.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center py-10">
                {pkmnAddress ? (
                    <Button
                        onClick={async () =>
                            await catchPkmn({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        radius={50}
                        size="large"
                        text={`CATCH ${isItDay === "true" ? "DAY" : "NIGHT"} POKEMON`}
                        theme="outline"
                        isLoading={isLoading || isFetching ? true : false}
                        loadingText={
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full mr-8"></div>
                        }
                    />
                ) : (
                    <div>
                        <p>
                            Please Connect Wallet and switch to supported networks which are:
                            Goerli, Mumbai, Fantom Test, and Fuji.
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center">
                <h4 className="font-medium">INFO</h4>
                <ul>
                    <li className="flex flex-row">
                        <div className="font-semibold">Catch(Mint) Fee: &nbsp;</div>
                        {ethers.utils.formatUnits(mintFee, "ether")} ETH
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Current Mode: &nbsp;</div>
                        {isItDay === "true" ? "DAY" : "NIGHT"}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Total Common Caught: &nbsp;</div>
                        {commonCounter}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Total Shiny Caught: &nbsp;</div>
                        {shinyCounter}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Total Caught(Minted): &nbsp;</div>
                        {totalMinted}
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Mint
