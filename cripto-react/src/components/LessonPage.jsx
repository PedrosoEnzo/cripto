import React from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './LessonPage.module.css';

export default function LessonPage() {
  const { id } = useParams();

  if (!id) {
    return <div className={styles.error}>Erro: ID da aula não encontrado!</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <a href="/curso" className={styles.link}>
          ChainX <span className={styles.highlight}>Educ</span>
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
            <li><a href="../assets/pdf/anexo1.pdf" target="_blank" rel="noopener noreferrer">Anexo 1 - Introdução ao Investimento</a></li>
              <li><a href="/pdf/anexo2.pdf" target="_blank" rel="noopener noreferrer">Anexo 2 - Renda Fixa</a></li>
              <li><a href="/pdf/anexo3.pdf" target="_blank" rel="noopener noreferrer">Anexo 3 - Fundos de Investimento</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.simulatorLinkContainer}>
          <Link to="/simulador" className={styles.simulatorLink}>
            Acessar Simulador de Investimentos
          </Link>
        </div>
      </main>
    </div>
  );
}
