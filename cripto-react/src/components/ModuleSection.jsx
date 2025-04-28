import React from 'react';
import styles from './ModuleSection.module.css';
import LessonCard from './LessonCard';

export default function ModuleSection({ title, lessons, completed, onComplete, onLessonClick }) {
  return (
    <div className={styles.module}>
      <h2>{title}</h2>
      <div className={styles.lessonGrid}>
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={completed.includes(lesson.id)}
            onComplete={onComplete}
            onLessonClick={onLessonClick}
          />
        ))}
      </div>
    </div>
  );
}

