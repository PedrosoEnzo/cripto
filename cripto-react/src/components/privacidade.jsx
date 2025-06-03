import React from "react";
import { useNavigate } from "react-router-dom";
import "./privacidade.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    alert("Termos aceitos com sucesso!");
    setTimeout(() => {
      navigate("/about");
    }, 2000);
  };

  return (
    <div className="chaix-privacy-container">
      <header className="chaix-privacy-header">
        <h1 className="chaix-privacy-title">
          Política de Privacidade e Termos de Uso
        </h1>
        <p className="chaix-privacy-subtitle">
          Chaix – Plataforma de Investimentos e Educação Financeira
        </p>
      </header>

      <div className="chaix-privacy-content">
        <section className="chaix-privacy-section">
          <h2 className="chaix-privacy-section-title">1. Introdução</h2>
          <p className="chaix-privacy-text">
            Bem-vindo(a) à{" "}
            <strong className="chaix-privacy-highlight">Chaix</strong>! Nossa
            plataforma é dedicada a proporcionar
            <strong className="chaix-privacy-highlight">
              {" "}
              investimentos seguros
            </strong>{" "}
            e{" "}
            <strong className="chaix-privacy-highlight">
              educação financeira transparente
            </strong>
            .
          </p>
        </section>

        <section className="chaix-privacy-section">
          <h2 className="chaix-privacy-section-title">
            2. Coleta e Uso de Dados
          </h2>
          <h3 className="chaix-privacy-subsection-title">
            Quais dados coletamos?
          </h3>
          <ul className="chaix-privacy-list">
            <li className="chaix-privacy-list-item">
              <strong className="chaix-privacy-highlight">
                Dados cadastrais
              </strong>
              : Nome, e-mail, telefone.
            </li>
            <li className="chaix-privacy-list-item">
              <strong className="chaix-privacy-highlight">Dados de uso</strong>:
              Histórico de acesso.
            </li>
            <li className="chaix-privacy-list-item">
              <strong className="chaix-privacy-highlight">Cookies</strong>: Para
              personalização.
            </li>
          </ul>
        </section>

        <section className="chaix-privacy-section">
          <h2 className="chaix-privacy-section-title">
            3. Proteção e Segurança
          </h2>
          <p className="chaix-privacy-text">
            Adotamos{" "}
            <strong className="chaix-privacy-highlight">
              criptografia avançada
            </strong>{" "}
            e{" "}
            <strong className="chaix-privacy-highlight">
              autenticação em duas etapas (2FA)
            </strong>
            .
          </p>
        </section>

        <section className="chaix-privacy-section">
          <h2 className="chaix-privacy-section-title">
            4. Direitos do Usuário
          </h2>
          <p className="chaix-privacy-text">
            Você pode{" "}
            <strong className="chaix-privacy-highlight">
              acessar, corrigir ou solicitar exclusão
            </strong>{" "}
            de seus dados.
          </p>
        </section>

        <section className="chaix-privacy-section">
          <h2 className="chaix-privacy-section-title">5. Atualizações</h2>
          <p className="chaix-privacy-text">
            Alterações serão comunicadas por{" "}
            <strong className="chaix-privacy-highlight">e-mail</strong> ou na
            plataforma.
          </p>
        </section>

        <section className="chaix-privacy-section">
          <h2 className="chaix-privacy-section-title">6. Contato</h2>
          <p className="chaix-privacy-text">
            📧{" "}
            <strong className="chaix-privacy-highlight">
              chainx.suporte@gmail.com
            </strong>
          </p>
        </section>
      </div>

      <footer className="chaix-privacy-footer">
        <button onClick={handleAccept} className="chaix-privacy-accept-button">
          Aceitar Termos
        </button>
        <p className="chaix-privacy-version">
          Versão atualizada em: 20/05/2025
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;