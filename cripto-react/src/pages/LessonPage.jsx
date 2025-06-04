import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import anexo1 from '../assets/pdf/anexo-introducao.pdf';
import anexo2 from '../assets/pdf/perfil.pdf';
import styles from './LessonPage.module.css';
import aulaVideo from '../assets/aula.mp4';



export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <div className={styles.error}>Erro: ID da aula não encontrado!</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
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
        <h1 className={styles.title}>
          <a href="/curso" className={styles.link}>
            ChainX <span className={styles.highlight}>Education</span>
          </a>
        </h1>
      </header>

      <main className={styles.main}>
        <h2 className={styles.subtitle}>Aula {id}</h2>

        <div className={styles.content}>
          <div className={styles.videoContainer}>
            <video width="100%" height="auto" controls>
              <source src={aulaVideo} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>


          <div className={styles.pdfContainer}>
            <h3>Materiais Complementares</h3>
            <ul>
              <li><a href={anexo1} target="_blank" rel="noopener noreferrer">E-book Poupar vs. Investir</a></li>
              <li><a href={anexo2} target="_blank" rel="noopener noreferrer">E-book Descobrindo o seu perfil</a></li>
              <li><a href="/perfilQuiz">Quiz para descobrir seu perfil de investidor</a></li>
            </ul>
            <br />
            <ul className={styles.comunidadeLink}>
              <li><a href="https://discord.gg/taXQXJSS" target="_blank">Acessar comunidade</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.simulatorLinkContainer}>
          <Link to="/simulador" className={styles.simulatorLink}>
            Acessar Simulador de Investimentos
          </Link>
          <Link to="/quiz" className={styles.simulatorLink}>
            Concluir
          </Link>
        </div>
      </main>
    </div>
  );
}

