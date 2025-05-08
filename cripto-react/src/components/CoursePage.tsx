import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CoursePage.module.css";
import ProgressBar from "./ProgressBar";
import ModuleSection from "./ModuleSection";
import { FaArrowLeft } from "react-icons/fa";
import adImage from "../assets/ChainAds.png";
import Footer from "../components/Footer";

interface CourseInterface {
  title: string;
  lessons: LessonInterface[];
}

interface LessonInterface {
    id: number;
    title: string;
    description: string;
}

export default function CoursePage() {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [visibleAd, setVisibleAd] = useState(false);
  const navigate = useNavigate();

  const totalLessons = 11;

  const courseData: CourseInterface[] = [
    {
      title: "Básico I",
      lessons: [
        {
          id: 1,
          title: "Aula 1: Introdução",
          description: "Conheça os conceitos fundamentais de investimentos...",
        },
        {
          id: 2,
          title: "Aula 2: Planejamento",
          description: "Aprenda a avaliar sua situação financeira...",
        },
        {
          id: 3,
          title: "Aula 3: Fundos de Investimento",
          description: "Descubra como funcionam os fundos de investimento...",
        },
        {
          id: 4,
          title: "Aula 4: Renda Fixa",
          description: "Explore opções de investimentos em renda fixa...",
        },
      ],
    },
    {
      title: "Básico II",
      lessons: [
        {
          id: 5,
          title: "Aula 1: Análise Técnica",
          description: "Aprenda sobre análise técnica de ações...",
        },
        {
          id: 6,
          title: "Aula 2: Análise Fundamentalista",
          description: "Estude a análise fundamentalista de empresas...",
        },
        {
          id: 7,
          title: "Aula 3: Derivativos e Alavancagem",
          description: "Descubra o mundo dos derivativos...",
        },
        {
          id: 8,
          title: "Aula 4: Investimentos Internacionais",
          description: "Aprenda sobre investimentos no exterior...",
        },
      ],
    },
    {
      title: "Intermediário",
      lessons: [
        {
          id: 9,
          title: "Aula 1: Criptomoedas",
          description:
            "Entenda o funcionamento e as oportunidades das criptomoedas...",
        },
        {
          id: 10,
          title: "Aula 2: Gestão de Riscos",
          description: "Aprenda como gerenciar riscos em seus investimentos...",
        },
      ],
    },
    {
      title: "Avançado",
      lessons: [
        {
          id: 11,
          title: "Aula 1: Estratégias de Investimento",
          description:
            "Explore estratégias avançadas para maximizar seus lucros...",
        },
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleAd(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedProgress = localStorage.getItem("chainx-progress");
    const parsed = storedProgress ? JSON.parse(storedProgress) : []; // Aula 1 desbloqueada
    setCompletedLessons(parsed);
    setProgress((parsed.length / totalLessons) * 100);
  }, []);

  function handleLessonClick(lessonId) {
    navigate(`/lesson/${lessonId}`);
  }

  const getCourseDataWithLocks = () => {
    const allLessons = courseData.flatMap((mod) => mod.lessons);

    return courseData.map((mod) => ({
      ...mod,
      lessons: mod.lessons.map((lesson) => {
        const index = allLessons.findIndex((l) => l.id === lesson.id);
        const isUnlocked = completedLessons.includes( lesson.id as never);

        const isLocked =
          lesson.id === 1 ? false : !completedLessons.includes((lesson.id - 1) as never);

        return {
          ...lesson,
          isLocked,
          isUnlocked,
        };
      }),
    }));
  };

  const courseDataWithLocks = getCourseDataWithLocks();

  /* 
  
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // null

    disandsaiodsansdao
    // verifica se o token e valido na API

    // continuar

  }, [])
  
  */

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <FaArrowLeft
            className={styles.backArrow}
            onClick={() => navigate("/")}
          />
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
            onLessonClick={handleLessonClick}
            onComplete={() => {}}
          />
        ))}

        {visibleAd && (
          <div className={styles.floatingAd}>
            <button
              className={styles.closeButton}
              onClick={() => setVisibleAd(false)}
            >
              ×
            </button>
            <a
              href="https://www.youtube.com/@primorico"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={adImage} alt="Anúncio promocional" />
            </a>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}
