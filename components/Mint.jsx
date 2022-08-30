import { useWeb3Contract } from "react-moralis"
import pokemonNftabi from "../constants/pokemonNftAbi.json"
import networkAddresses from "../constants/pokemonNftAbi.json"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Button } from "web3uikit"
import Image from "next/image"

const Mint = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const pkmnAddress = chainId in networkAddresses ? networkAddresses[chainId][0] : null
    const [mintFee, setMintFee] = useState("0")
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

    const updateUI = async () => {
        const getMintFeeFromCall = (await getMintFee()).toString()
        setMintFee(getMintFeeFromCall)
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
            <div>
                <Image />
                <p></p>
            </div>
            <div>
                {lotteryAddress ? (
                    <Button
                        onClick={async () =>
                            await catchNft({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        text="Primary Button"
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
        </section>
    )
}

export default Mint
