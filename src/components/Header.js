import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Header.css';
import WalletConnect from './WalletConnect';

function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Rutra</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                < WalletConnect/>
            </Container>
        </Navbar>
    );
}

export default Header;
