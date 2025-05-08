import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CoursePage.module.css";
import ProgressBar from "./ProgressBar";
import ModuleSection from "./ModuleSection";
import { FaArrowLeft } from "react-icons/fa";
import adImage from "../assets/ChainAds.png";
import Footer from "../components/Footer";
import axios from "axios";

interface CourseInterface {
  title: string;
  lessons: LessonInterface[];
}

interface LessonInterface {
  id: number;
  title: string;
  description: string;
  isLocked?: boolean;
  isUnlocked?: boolean;
}

export default function CoursePage() {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [visibleAd, setVisibleAd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const totalLessons = 11;

  // Dados do curso (poderiam vir da API)
  const courseData: CourseInterface[] = [
    // ... (seus dados de curso existentes)
  ];

  // Verifica autenticação e carrega progresso
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    const verifyAuth = async () => {
      try {
        // Verifica token com o backend
        const response = await axios.get("http://localhost:5000/perfil", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Carrega progresso do usuário
        const storedProgress = localStorage.getItem("chainx-progress");
        const parsed = storedProgress ? JSON.parse(storedProgress) : [];
        
        setCompletedLessons(parsed);
        setProgress((parsed.length / totalLessons) * 100);
        setIsLoading(false);

      } catch (err) {
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyAuth();

    // Anúncio (mantido da versão original)
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

  const handleCompleteLesson = async (lessonId: number) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Não autenticado");

      // Atualiza no backend (exemplo)
      await axios.post(
        "http://localhost:5000/aulas/completar",
        { lessonId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza localmente
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      setProgress((newCompleted.length / totalLessons) * 100);
      localStorage.setItem("chainx-progress", JSON.stringify(newCompleted));

    } catch (err) {
      console.error("Erro ao completar aula:", err);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Carregando seu progresso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Fazer Login</button>
      </div>
    );
  }

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

        {courseData.map((mod, idx) => (
          <ModuleSection
          key={idx}
          title={mod.title}
          lessons={mod.lessons.map(lesson => ({
            ...lesson,
            isLocked: isLessonLocked(lesson.id),
            isUnlocked: completedLessons.includes(lesson.id)
          }))} 
          completed={mod.completed} // Adicione esta linha
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