// src/pages/HomePage.js
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
function HomePage() {
    return (
        <div>
            <Header />
            <h1>Welcome to my Crypto App</h1>
            <p>This is the homepage of your cryptocurrency app!</p>
            <Footer />
        </div>
    );
}

export default HomePage;
