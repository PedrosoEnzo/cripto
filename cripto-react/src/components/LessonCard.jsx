import React from 'react';
import styles from './LessonCard.module.css';

export default function LessonCard({ lesson, isCompleted, onComplete, onLessonClick }) {
  const handleClick = () => {
    onLessonClick(lesson.id);
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    onComplete(lesson.id);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.info}>
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
      </div>
      <button onClick={handleComplete} disabled={isCompleted}>
        {isCompleted ? 'Concluída' : 'Marcar como concluída'}
      </button>
    </div>
  );
}


