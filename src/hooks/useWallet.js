import { useState, useEffect } from 'react';

// useWallet is a custom hook that manages wallet connection state
export const useWallet = () => {
    // State to store the user's wallet address
    const [walletAddress, setWalletAddress] = useState(null);

    // State to store whether the wallet is connected or not
    const [isConnected, setIsConnected] = useState(false);

    // Effect to check if wallet is connected when the component mounts
    useEffect(() => {
        // Check if Ethereum object exists (MetaMask or any other Web3 provider)
        if (window.ethereum) {
            // Request wallet address from the user if already connected
            window.ethereum.request({ method: 'eth_accounts' })
                .then(handleAccountsChanged)
                .catch((err) => {
                    console.error('Error checking accounts', err);
                });

            // Listen for account changes (e.g., user switches accounts)
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
    }, []);

    // Function to handle changes in the user's accounts
    const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            setWalletAddress(accounts[0]); // Set the current wallet address
            setIsConnected(true); // Set the wallet connection state to true
        } else {
            setWalletAddress(null); // Reset the wallet address
            setIsConnected(false); // Set the wallet connection state to false
        }
    };

    // Function to connect the wallet (triggered by a user action)
    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                handleAccountsChanged(accounts);
            } else {
                console.error('Ethereum object not found');
            }
        } catch (err) {
            console.error('Error connecting wallet', err);
        }
    };

    return { walletAddress, isConnected, connectWallet };
};
