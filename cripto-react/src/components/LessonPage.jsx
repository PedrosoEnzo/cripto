import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './LessonPage.module.css';

export default function LessonPage() {
  const { id } = useParams();  // Capturando o ID da URL

  if (!id) {
    return <div>Erro: ID da aula não encontrado!</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ChainX <span>Educ</span></h1>
      <h2>Aula {id}</h2>
      
      <div className={styles.content}>
        <div className={styles.videoContainer}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}  // Passando o ID para o vídeo
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Exibição dos anexos PDF */}
        <div className={styles.pdfContainer}>
          <h3>Materiais Complementares</h3>
          <ul>
            <li><a href="/pdf/anexo1.pdf" target="_blank" rel="noopener noreferrer">Anexo 1 - Introdução ao Investimento</a></li>
            <li><a href="/pdf/anexo2.pdf" target="_blank" rel="noopener noreferrer">Anexo 2 - Renda Fixa</a></li>
            <li><a href="/pdf/anexo3.pdf" target="_blank" rel="noopener noreferrer">Anexo 3 - Fundos de Investimento</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}


