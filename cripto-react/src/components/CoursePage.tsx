import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CoursePage.module.css';
import ProgressBar from './ProgressBar';
import ModuleSection from './ModuleSection';
import { FaArrowLeft } from 'react-icons/fa';

export default function CoursePage() {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const navigate = useNavigate();

  const totalLessons = 11; 

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
    {
      title: "Intermediário I",
      lessons: [
        { id: 9, title: "Aula 1: Criptomoedas", description: "Entenda o funcionamento e as oportunidades das criptomoedas..." },
        { id: 10, title: "Aula 2: Gestão de Riscos", description: "Aprenda como gerenciar riscos em seus investimentos..." },
      ],
    },
    {
      title: "Avançado",
      lessons: [
        { id: 11, title: "Aula 1: Estratégias de Investimento", description: "Explore estratégias avançadas para maximizar seus lucros..." },
      ],
    },
  ];
  
  useEffect(() => {
    const storedLessons = localStorage.getItem('completedLessons');
    if (storedLessons) {
      const parsedLessons = JSON.parse(storedLessons);
      setCompletedLessons(parsedLessons);
      setProgress((parsedLessons.length / totalLessons) * 100);
    }
  }, []);

  function handleComplete(lessonId) {
    if (!completedLessons.includes(lessonId)) {
      const updatedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedLessons);
      setProgress((updatedLessons.length / totalLessons) * 100);

      // Salvar no localStorage
      localStorage.setItem('completedLessons', JSON.stringify(updatedLessons));
    }
  }

  function handleLessonClick(lessonId) {
    navigate(`/lesson/${lessonId}`); 
  }


  const getCourseDataWithLocks = () => {
    const allLessons = courseData.flatMap(mod => mod.lessons);
    const completedSet = new Set(completedLessons);

    return courseData.map(mod => ({
      ...mod,
      lessons: mod.lessons.map(lesson => {
        const index = allLessons.findIndex(l => l.id === lesson.id);
        const previousLesson = allLessons[index - 1];

        const isLocked = previousLesson ? !completedSet.has(previousLesson.id) : false; // Primeira aula liberada

        return {
          ...lesson,
          isLocked,
        };
      }),
    }));
  };

  const courseDataWithLocks = getCourseDataWithLocks();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaArrowLeft className={styles.backArrow} onClick={() => navigate('/')} />
        <h1 className={styles.title}>
          ChainX <span>Educ</span>
        </h1>
      </div>
      <ProgressBar progress={progress} />
      {courseDataWithLocks.map((mod, idx) => (
        <ModuleSection
          key={idx}
          title={mod.title}
          lessons={mod.lessons}
          completed={completedLessons}
          onComplete={handleComplete}
          onLessonClick={handleLessonClick}
        />
      ))}
    </div>
  );
}
