// src/pages/HomePage.js
import React from 'react';
import WalletConnect from "./WalletConnect";

function HomePage() {
    return (
        <div>
            <h1>Welcome to my Crypto App</h1>
            <p>This is the homepage of your cryptocurrency app!</p>
            <WalletConnect />
        </div>
    );
}

export default HomePage;
