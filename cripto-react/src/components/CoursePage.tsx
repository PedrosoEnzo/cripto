import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CoursePage.module.css';
import ProgressBar from './ProgressBar';
import ModuleSection from './ModuleSection';
import { FaArrowLeft } from 'react-icons/fa';

export default function CoursePage() {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const navigate = useNavigate();

  const courseData = [
    {
      title: "Básico I",
      lessons: [
        { id: 1, title: "Aula 1: Introdução", description: "Conheça os conceitos fundamentais de investimentos..." },
        { id: 2, title: "Aula 2: Planejamento", description: "Aprenda a avaliar sua situação financeira..." },
        { id: 3, title: "Aula 3: Fundos de Investimento", description: "Descubra como funcionam os fundos de investimento..." },
        { id: 4, title: "Aula 4: Renda Fixa", description: "Explore opções de investimentos em renda fixa..." },
      ],
    },
    {
      title: "Básico II",
      lessons: [
        { id: 5, title: "Aula 1: Análise Técnica", description: "Aprenda sobre análise técnica de ações..." },
        { id: 6, title: "Aula 2: Análise Fundamentalista", description: "Estude a análise fundamentalista de empresas..." },
        { id: 7, title: "Aula 3: Derivativos e Alavancagem", description: "Descubra o mundo dos derivativos..." },
        { id: 8, title: "Aula 4: Investimentos Internacionais", description: "Aprenda sobre investimentos no exterior..." },
      ],
    },
  ];

  function handleComplete(lessonId) {
    if (!completedLessons.includes(lessonId)) {
      const updatedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedLessons);
      setProgress((updatedLessons.length / 8) * 100); // Atualiza a barra de progresso
    }
  }

  function handleLessonClick(lessonId) {
    navigate(`/lesson/${lessonId}`); // Navega para a lição
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaArrowLeft className={styles.backArrow} onClick={() => navigate('/')} />
        <h1 className={styles.title}>
          ChainX <span>Educ</span>
        </h1>
      </div>
      <ProgressBar progress={progress} />
      {courseData.map((mod, idx) => (
        <ModuleSection
          key={idx}
          title={mod.title}
          lessons={mod.lessons}
          completed={completedLessons}
          onComplete={handleComplete}
          onLessonClick={handleLessonClick} // Passando a função de navegação
        />
      ))}
    </div>
  );
}

