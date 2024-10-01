import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import '../css/Balance.css'; // Importer le fichier CSS pour le style

const Balance = ({ contractAddress, abi, userAddress }) => {
    const [balance, setBalance] = useState(null);
    const [message, setMessage] = useState('Connect Wallet'); // Message par défaut

    useEffect(() => {
        const fetchBalance = async () => {
            if (!userAddress) {
                setMessage('Please connect your wallet to see your balance.');
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);

            try {
                const balance = await contract.balanceOf(userAddress);
                setBalance(ethers.formatUnits(balance, 18)); // Formater en unités lisibles
                setMessage(''); // Réinitialiser le message une fois connecté
            } catch (error) {
                console.error('Erreur lors de la récupération de la balance:', error);
                setMessage('Failed to retrieve balance.');
            }
        };

        fetchBalance();
    }, [userAddress, contractAddress, abi]);

    return (
        <div className="balance-container">
            {/* Si l'utilisateur est connecté et qu'il y a une balance, on l'affiche */}
            {balance ? (
                <h3> Balance : {balance} RUTRA</h3>
            ) : (
                // Sinon, on affiche le message (par exemple "Connect Wallet")
                <p>{message}</p>
            )}
        </div>
    );
};

export default Balance;
