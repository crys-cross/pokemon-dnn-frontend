import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Button } from "web3uikit"

const Mint = () => {
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
