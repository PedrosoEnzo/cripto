import React from 'react';

import './Footer.css';
import instagram from '../assets/icons/instagram.png';
import facebook from '../assets/icons/facebook.png';
import twitter from '../assets/icons/twitter.png';

export default function Footer() {
    return (
        <>
            <div className="footerInfo">
                <div className="footerLink">
                    <a href="/curso">Chain Education</a>
                    <a href="/About">Sobre nós</a>
                    <a href="#">Suporte</a>
                </div>

                <div className="redesSociais">
                    <a href="#"><img src={instagram} alt="Instagram" /></a>
                    <a href="#"><img src={facebook} alt="Facebook" /></a>
                    <a href="#"><img src={twitter} alt="Twitter" /></a>
                </div>
            </div>

            <div className="copy">
                <p className= "copyT">&copy; Todos os direitos reservados a ChainX 2025</p>
            </div>
        </>
    );
}