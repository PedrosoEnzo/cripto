import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import anexo1 from '../assets/pdf/anexo-introducao.pdf';
import anexo2 from '../assets/pdf/perfil.pdf';
import styles from './LessonPage.module.css';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Correção: Declarar useNavigate dentro do componente

  if (!id) {
    return <div className={styles.error}>Erro: ID da aula não encontrado!</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>

          <FaArrowLeft
            className={styles.backArrow}
            onClick={() => navigate("/curso")} // Agora navigate funciona corretamente
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
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/eMDgWLWOX84?si=UOAgTUenDlhC_qlH"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className={styles.pdfContainer}>
            <h3>Materiais Complementares</h3>
            <ul>
              <li><a href={anexo1} target="_blank" rel="noopener noreferrer">E-book Poupar vs. Investir</a></li>
              <li><a href={anexo2} target="_blank" rel="noopener noreferrer">E-book Descobrindo o seu perfil</a></li>
              <li><a href="/perfilQuiz">Quiz para descobrir seu perfil de investidor</a></li>
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
