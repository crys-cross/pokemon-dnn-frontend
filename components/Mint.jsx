import { useWeb3Contract } from "react-moralis"
import pokemonNftabi from "../constants/pokemonNftAbi.json"
import networkAddresses from "../constants/pokemonNftAbi.json"
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
    const pkmnAddress = chainId in networkAddresses ? networkAddresses[chainId][0] : null
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
        setMintFee((await getMintFee()).toString())
        setCommonCounter((await getCommonCounter()).toString())
        setShinyCounter((await getShinyCounter()).toString())
        setTotalMinted((await getTokenCounter()).toString())
        setIsItDay((await getIsItDayTime()).toString())
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

    let time = isItDay ? day : night

    return (
        <section>
            <div>
                <Image src={time} />
                <p></p>
            </div>
            <div>
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
                        text={`Catch ${time} PkMn`}
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
