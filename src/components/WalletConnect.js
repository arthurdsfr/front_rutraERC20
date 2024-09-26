import React from 'react';
import { useWallet } from '../hooks/useWallet'; // Importation du hook personnalisé

const WalletConnect = () => {
    // Extraction de l'état du portefeuille et de la fonction de connexion depuis le hook
    const { walletAddress, isConnected, connectWallet, disconnectedWallet } = useWallet();

    return (
        <div>
            {/* Affichage de l'adresse du portefeuille ou du bouton de connexion */}
            {isConnected ? (
                <div>
                    <p>Wallet connected: {walletAddress}</p>
                    {/* Disconnect Button */}
                    <button onClick={disconnectedWallet}>Disconnect Wallet</button>
                </div>
            ) : (
                //Connexion Button
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
