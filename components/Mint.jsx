import { useWeb3Contract } from "react-moralis"
import { pokemonNftabi, networkAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Button } from "web3uikit"

const Mint = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const lotteryAddress = chainId in networkAddresses ? networkAddresses[chainId][0] : null
    const [mintFee, setMintFee] = useState("0")
    const dispatch = useNotification()

    const {
        runContractFunction: catchNft,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: lotteryAddress,
        functionName: "catchNft",
        params: {},
        msgValue: mintFee,
    })

    const { runContractFunction: getMintFee } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: lotteryAddress,
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

    const handleEnterSuccess = () => {
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
                <img />
                <p></p>
            </div>
            <div>
                <Button />
            </div>
        </section>
    )
}

export default Mint
