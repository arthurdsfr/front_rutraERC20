import React from 'react';
import { useWallet } from './useWallet'; // Import the custom hook

// WalletConnect is a component that provides a button for users to connect their wallet
const WalletConnect = () => {
    // Destructure the wallet state and connectWallet function from the custom hook
    const { walletAddress, isConnected, connectWallet } = useWallet();

    return (
        <div>
            {/* Render different content based on whether the wallet is connected or not */}
            {isConnected ? (
                <div>
                    <p>Wallet connected: {walletAddress}</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
