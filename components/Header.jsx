import { ConnectButton } from "web3uikit"

const Header = () => {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between item-center">
            <h1 className="py-4 px-4 font-bold text-3xl">Demo Blockchain Pokemon NFT</h1>
            <div className="flex flex-row items-center">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
export default Header
