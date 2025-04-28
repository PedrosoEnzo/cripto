import React from 'react';
import styles from './LessonCard.module.css';
import teste from '../assets/icons/logo.png'; // Substitua pelo caminho correto da imagem

export default function LessonCard({ lesson, isCompleted, onComplete, onLessonClick }) {
  const handleClick = () => {
    if (!lesson.isLocked) {
      onLessonClick(lesson.id);
    }
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    if (!lesson.isLocked) {
      onComplete(lesson.id);
    }
  };

  return (
    <div
      className={`${styles.card} ${lesson.isLocked ? styles.locked : ''}`}
      onClick={handleClick}
      style={{
        cursor: lesson.isLocked ? 'not-allowed' : 'pointer',
        opacity: lesson.isLocked ? 0.5 : 1,
      }}
    >
      <div className={styles.info}>
        <img src={teste} alt="Imagem da lição" style={{ width: '100%', height: 'auto' }} />
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
      </div>
      <button
        onClick={handleComplete}
        disabled={isCompleted || lesson.isLocked}
      >
        {isCompleted
          ? 'Concluída'
          : lesson.isLocked
          ? 'Bloqueada'
          : 'Marcar como concluída'}
      </button>
    </div>
  );
}