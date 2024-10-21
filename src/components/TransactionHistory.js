import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { formatUnits } from 'ethers';
import '../css/TransactionHistory.css';

function TransactionHistory({ contractAddress, abi, userAddress }) {
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState('Connect Wallet');

    // Fonction pour tronquer les adresses et hashes
    const truncate = (str, startLength = 6, endLength = 4) => {
        if (!str) return '';
        return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
    };

    // Fonction pour copier une adresse dans le presse-papiers
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Address copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    // Fonction pour récupérer l'historique des transactions
    const fetchTransactionHistory = async () => {
        if (!userAddress) {
            setMessage('Please connect your wallet to see your transactions.');
            return;
        }
        setMessage('Fetching transactions...');
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        try {
            // Filtre pour les transactions envoyées et reçues par l'utilisateur
            const filterFrom = contract.filters.Transfer(userAddress, null);
            const filterTo = contract.filters.Transfer(null, userAddress);

            // Récupérer les événements envoyés et reçus
            const sentEvents = await contract.queryFilter(filterFrom, 0, "latest");
            const receivedEvents = await contract.queryFilter(filterTo, 0, "latest");

            // Combiner les événements envoyés et reçus
            const allEvents = [...sentEvents, ...receivedEvents];

            // Formater les transactions pour affichage
            const formattedTransactions = allEvents.map((event) => ({
                from: event.args[0], // Adresse d'envoi complète (non tronquée pour copie)
                to: event.args[1],   // Adresse de réception complète (non tronquée pour copie)
                truncatedFrom: truncate(event.args[0]), // Tronquer l'adresse d'envoi
                truncatedTo: truncate(event.args[1]),   // Tronquer l'adresse de réception
                amount: formatUnits(event.args[2], 18),
                transactionHash: truncate(event.transactionHash, 10, 10), // Tronquer le hash de transaction
            }));

            setTransactions(formattedTransactions);
            setMessage('');

        } catch (error) {
            console.error("Error fetching transaction history:", error);
            setMessage('Error fetching transactions');
        }
    };

    useEffect(() => {
        if (userAddress) {
            fetchTransactionHistory();
        }
    }, [userAddress]);

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            {transactions.length === 0 ? (
                <p>{message}</p>
            ) : (
                <ul>
                    {transactions.map((tx, index) => (
                        <li key={index}>
                            <strong>From:</strong> {tx.truncatedFrom}
                            <button  className="copy-button" onClick={() => copyToClipboard(tx.from)}>Copy</button> <br />
                            <strong>To:</strong> {tx.truncatedTo}
                            <button  className="copy-button" onClick={() => copyToClipboard(tx.to)}>Copy</button> <br />
                            <strong>Amount:</strong> {tx.amount} Rutra <br />
                            <strong>Transaction Hash:</strong> {tx.transactionHash} <br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TransactionHistory;
