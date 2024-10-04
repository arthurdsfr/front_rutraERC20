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

            setStatus('Succed : Hash: ' + tx.hash);
        } catch (error) {
            setStatus('Erreur lors de l’envoi de la transaction : ' + error.message);
        }
    };

    return (
        <div className="send-token-container">
            <h3 className="send-token-title">Send Transaction</h3>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="send-token-input"
            />
            <input
                type="text"
                placeholder="Amount (in RUTRA)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="send-token-input"
            />
            <button onClick={sendTransaction} className="send-token-button">Send</button>
            <p className="send-token-status">{status}</p>
        </div>
    );
};

export default SendToken;
