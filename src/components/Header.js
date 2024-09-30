import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Header.css';
import WalletConnect from './WalletConnect';

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {/* Le titre Rutra avec une police futuriste */}
                <Navbar.Brand href="#home" className="futuristic-font">
                    Rutra
                </Navbar.Brand>
                {/* Le bouton WalletConnect aligné à droite */}
                <div className="ms-auto">
                    <WalletConnect />
                </div>
            </Container>
        </Navbar>
    );
}


export default Header;
