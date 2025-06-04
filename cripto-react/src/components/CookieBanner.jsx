import { useEffect, useState } from 'react';
import './CookieBanner.css'; // Criaremos o CSS separado ou você pode usar o mesmo do Home.css

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
      <p>
        Este site usa cookies para melhorar sua experiência. Ao continuar, você aceita o uso de cookies.
      </p>
      <button onClick={handleAccept}>Aceitar</button>
    </div>
  );
}
