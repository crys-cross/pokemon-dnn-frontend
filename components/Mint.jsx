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

const Mint = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const pkmnAddress =
        chainId in networkAddresses ? networkAddresses[chainId]["CatchNft"][0] : null
    console.log(`Working with contract address: ${pkmnAddress}`)
    const [mintFee, setMintFee] = useState("0")
    const [commonCounter, setCommonCounter] = useState("0")
    const [shinyCounter, setShinyCounter] = useState("0")
    const [totalMinted, setTotalMinted] = useState("0")
    const [isItDay, setIsItDay] = useState("false")
    const dispatch = useNotification()

    const {
        runContractFunction: catchNft,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: pkmnAddress,
        functionName: "catchNft",
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
                    src={isItDay ? day : night}
                    alt="time"
                    className="w-[100%] h-[100%] relative z-[5]"
                />
                <div className="flex-1 flex justify-center items-start flex-col">
                    <p className="font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-5 px-2">
                        This is for demo purposes to show a pokemon game catch encounter system on a
                        blockchain. All trademarks and copyrights belong to Nintendo. Press Catch
                        Button below to mint an NFT. Please click details for more info on encounter
                        rate.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center py-10">
                {pkmnAddress ? (
                    <Button
                        onClick={async () =>
                            await catchNft({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        size="xl"
                        text={`Catch ${isItDay ? "day" : "night"} PkMn`}
                        theme="outline"
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
                <h4>Stats</h4>
                <ul>
                    <li>Catch(Mint) Fee: {ethers.utils.formatUnits(mintFee, "ether")} ETH</li>
                    <li>Current Mode: {isItDay ? "day" : "night"}</li>
                    <li>Total Common Caught: {commonCounter}</li>
                    <li>Total Shiny Caught: {shinyCounter}</li>
                    <li>Total Caught(Minted): {totalMinted}</li>
                </ul>
            </div>
        </section>
    )
}

export default Mint
