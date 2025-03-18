// Local onde ficaram armazenadas as infomações do rodapé
import React from 'react';
const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()}Chain-X. Todos os direitos Reservados</p>
        </footer>
    )
}

export default Footer;