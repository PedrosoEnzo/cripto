import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CoursePage.module.css";
import ProgressBar from "./ProgressBar";
import ModuleSection from "./ModuleSection";
import { FaArrowLeft } from "react-icons/fa";
import adImage from "../assets/ChainAds.png";
import Footer from "../components/Footer";
import axios from "axios";

export default function CoursePage() {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [visibleAd, setVisibleAd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const totalLessons = 11;

  const courseData = [
    // ... (seus dados de curso existentes)
  ];

  // Verifica autenticação ao carregar a página
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProgress = async () => {
      try {
        // Verifica token e busca progresso do usuário
        const response = await axios.get("http://localhost:5000/progresso", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userProgress = response.data.progresso || [];
        setCompletedLessons(userProgress);
        setProgress((userProgress.length / totalLessons) * 100);
        
        // Carrega progresso local como fallback
        const localProgress = localStorage.getItem("chainx-progress");
        if (localProgress && JSON.parse(localProgress).length > userProgress.length) {
          setCompletedLessons(JSON.parse(localProgress));
        }

      } catch (err) {
        console.error("Erro ao buscar progresso:", err);
        // Fallback para progresso local
        const storedProgress = localStorage.getItem("chainx-progress");
        const parsed = storedProgress ? JSON.parse(storedProgress) : [];
        setCompletedLessons(parsed);
        setProgress((parsed.length / totalLessons) * 100);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProgress();

    // Timer para o anúncio
    const timer = setTimeout(() => setVisibleAd(true), 3000);
    return () => clearTimeout(timer);
  }, [navigate, totalLessons]);

  const handleLessonClick = (lessonId: number) => {
    if (isLessonLocked(lessonId)) {
      alert("Complete a aula anterior primeiro!");
      return;
    }
    navigate(`/lesson/${lessonId}`);
  };

  const isLessonLocked = (lessonId: number) => {
    if (lessonId === 1) return false;
    return !completedLessons.includes(lessonId - 1);
  };

  // Função para marcar aula como completa
  const handleCompleteLesson = async (lessonId: number) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Não autenticado");

      // Atualiza no backend
      await axios.post(
        "http://localhost:5000/aulas/completar",
        { aulaId: lessonId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza localmente
      const newCompleted = [...new Set([...completedLessons, lessonId])];
      setCompletedLessons(newCompleted);
      setProgress((newCompleted.length / totalLessons) * 100);
      localStorage.setItem("chainx-progress", JSON.stringify(newCompleted));

    } catch (err) {
      console.error("Erro ao completar aula:", err);
      // Fallback local se a API falhar
      const newCompleted = [...new Set([...completedLessons, lessonId])];
      setCompletedLessons(newCompleted);
      localStorage.setItem("chainx-progress", JSON.stringify(newCompleted));
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando seu progresso...</p>
      </div>
    );
  }

  const courseDataWithLocks = courseData.map((mod) => ({
    ...mod,
    lessons: mod.lessons.map((lesson) => ({
      ...lesson,
      isLocked: isLessonLocked(lesson.id),
      isUnlocked: completedLessons.includes(lesson.id)
    }))
  }));

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
            onComplete={handleCompleteLesson}
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