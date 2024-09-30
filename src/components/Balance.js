import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import '../css/Balance.css'; // Importer le fichier CSS pour le style

const Balance = ({ contractAddress, abi, userAddress }) => {
    const [balance, setBalance] = useState('Connect Wallet');

    useEffect(() => {
        const fetchBalance = async () => {
            if (!userAddress) {
                setBalance('Connect Wallet');
                return;
            } // Ne rien faire si l'utilisateur n'est pas connecté

            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);

            try {
                const balance = await contract.balanceOf(userAddress);
                setBalance(ethers.formatUnits(balance, 18)); // Formater en unités lisibles
            } catch (error) {
                console.error('Erreur lors de la récupération de la balance:', error);
            }
        };

        fetchBalance();
    }, [userAddress, contractAddress, abi]);

    return (
        <div className="balance-container">
            <h3> Balance : {balance} RUTRA</h3>
        </div>
    );
};

export default Balance;
