import React from "react";
import "./privacidade.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <FaArrowLeft
        className="backArrow"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", fontSize: 24, margin: "1rem" }}
        aria-label="Voltar"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(-1);
          }
        }}
      />
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
              <strong className="chaix-privacy-highlight">Chaix</strong>! Esta
              política descreve como coletamos, utilizamos, armazenamos e
              protegemos suas informações.
            </p>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">2. Coleta de Dados</h2>
            <p className="chaix-privacy-text">
              Coletamos dados para oferecer uma melhor experiência:
            </p>
            <ul className="chaix-privacy-list">
              <li>
                <strong>Dados cadastrais:</strong> nome, e-mail, telefone, CPF.
              </li>
              <li>
                <strong>Dados de navegação:</strong> páginas acessadas, tempo de
                uso, cliques.
              </li>
              <li>
                <strong>Cookies:</strong> preferências e comportamento de uso.
              </li>
            </ul>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">3. Uso das Informações</h2>
            <p className="chaix-privacy-text">Os dados são utilizados para:</p>
            <ul className="chaix-privacy-list">
              <li>Personalização de conteúdo e cursos.</li>
              <li>Melhoria da segurança da plataforma.</li>
              <li>Envio de notificações e atualizações relevantes.</li>
            </ul>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">4. Base Legal</h2>
            <p className="chaix-privacy-text">
              O tratamento de dados se baseia no{" "}
              <strong>consentimento do usuário</strong>,{" "}
              <strong>cumprimento de obrigações legais</strong> e{" "}
              <strong>execução de contratos</strong>.
            </p>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">5. Compartilhamento de Dados</h2>
            <p className="chaix-privacy-text">
              Não vendemos seus dados. Eles podem ser compartilhados apenas com
              serviços parceiros essenciais (ex: provedores de autenticação,
              armazenamento em nuvem) sempre com segurança.
            </p>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">6. Segurança</h2>
            <p className="chaix-privacy-text">
              Utilizamos <strong>criptografia</strong>, <strong>2FA</strong> e
              monitoramento contínuo para garantir a proteção dos dados.
            </p>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">7. Seus Direitos</h2>
            <p className="chaix-privacy-text">
              Você pode <strong>acessar, corrigir, limitar ou excluir</strong>{" "}
              seus dados a qualquer momento. Também pode{" "}
              <strong>revogar seu consentimento</strong>.
            </p>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">8. Consentimento e Atualizações</h2>
            <p className="chaix-privacy-text">
              Ao utilizar a Chaix, você concorda com esta política. Alterações
              futuras serão comunicadas por e-mail ou na plataforma.
            </p>
          </section>

          <section className="chaix-privacy-section">
            <h2 className="chaix-privacy-section-title">9. Contato</h2>
            <p className="chaix-privacy-text">
              📧{" "}
              <strong className="chaix-privacy-highlight">
                chainx.suporte@gmail.com
              </strong>
              <br />
              Nosso time está à disposição para dúvidas sobre privacidade.
            </p>
          </section>
        </div>

        <footer className="chaix-privacy-footer">
          <p className="chaix-privacy-version">Versão atualizada em: 20/05/2025</p>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;
