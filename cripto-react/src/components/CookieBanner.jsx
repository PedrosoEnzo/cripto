import { useEffect, useState } from 'react';
import { BsCookie } from "react-icons/bs";
import './CookieBanner.css'; 

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
       <BsCookie />
      <p>
        Este site usa cookies para melhorar sua experiência. Ao continuar, você aceita o uso de cookies. <br /><a href="/privacidade">Termos e Política de Privacidade</a></p>
      <button onClick={handleAccept}>Aceitar</button>
    </div>
  );
}
