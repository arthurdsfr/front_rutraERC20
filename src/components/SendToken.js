import React, { useState } from 'react';
import { ethers } from 'ethers';
import '../css/SendToken.css'

const SendToken = ({ userAddress, contractAddress, abi }) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');

    const sendTransaction = async () => {
        if (!recipientAddress || !amount) {
            setStatus("Veuillez entrer une adresse valide et un montant.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress,abi, signer);
            const tx = await contract.transfer(recipientAddress, ethers.parseEther(amount))

            setStatus('Transaction envoyée avec succès. Hash: ' + tx.hash);
        } catch (error) {
            setStatus('Erreur lors de l’envoi de la transaction : ' + error.message);
        }
    };

    return (
        <div>
            <h3>Send Transaction</h3>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount (in RUTRA)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendTransaction}>Send</button>
            <p>{status}</p>
        </div>
    );
};

export default SendToken;
