import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuizPage.module.css';

const questions = [
  {
    question: "Por que investir é importante, segundo o conteúdo da aula?",
    options: [
      "A) Porque é obrigatório por lei",
      "B) Para fugir dos impostos",
      "C) Para evitar que o dinheiro perca valor com o tempo devido à inflação",
      "D) Para guardar dinheiro no cofre"
    ],
    correctAnswer: 2,
  },
  {
    question: "O que é inflação?",
    options: [
      "A) Quando o governo imprime mais dinheiro",
      "B) Quando o salário das pessoas aumenta",
      "C) Quando os preços dos produtos caem",
      "D) Quando o dinheiro perde valor com o tempo"
    ],
    correctAnswer: 3,
  },
  {
    question: "Qual é a principal diferença entre poupar e investir?",
    options: [
      "A) Poupar dá mais lucro",
      "B) Poupar é guardar dinheiro, investir é fazê-lo crescer",
      "C) Investir é ilegal",
      "D) Investir é só para bancos"
    ],
    correctAnswer: 1,
  },
  {
    question: "Quem pode começar a investir, segundo a aula?",
    options: [
      "A) Apenas quem entende de economia",
      "B) Somente pessoas com muito dinheiro",
      "C) Qualquer pessoa que queira aprender",
      "D) Apenas empresários"
    ],
    correctAnswer: 2,
  },
  {
    question: "Qual das opções abaixo representa um perfil conservador de investidor?",
    options: [
      "A) Aceita correr mais riscos em busca de lucros",
      "B) Sempre investe em ações",
      "C) Investe apenas em criptomoedas",
      "D) Gosta de segurança e estabilidade"
    ],
    correctAnswer: 3,
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const correctCount = questions.reduce((count, question, index) => {
      return question.correctAnswer === answers[index] ? count + 1 : count;
    }, 0);

    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setSubmitted(true);

    if (percentage >= 70) {
      const stored = localStorage.getItem('chainx-progress');
      const completed = stored ? JSON.parse(stored) : [];
      const updated = completed.includes(1) ? completed : [...completed, 1];
      localStorage.setItem('chainx-progress', JSON.stringify(updated));
    }
  };

  if (submitted) {
    return (
      <div className={styles.container3}>
        <div className={styles.container2}>
          <h2 aria-level="1" role="heading">Você acertou {score}%</h2>

          {score >= 70 ? (
            <p className={styles.successText} role="alert">
              Parabéns! Você desbloqueou a próxima aula.
            </p>
          ) : (
            <p className={styles.errorText} role="alert">
              Você precisa de pelo menos 70% para desbloquear a próxima aula.
            </p>
          )}

          {score >= 70 && (
            <button
              onClick={() => navigate('/curso')}
              className={styles.buttonFinal}
              aria-label="Ir para a próxima aula"
            >
              Ir para o Curso
            </button>
          )}

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers(Array(questions.length).fill(null));
              setSubmitted(false);
              setScore(0);
            }}
            className={styles.buttonFinal}
            aria-label="Refazer o quiz"
          >
            Refazer Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className={styles.container}>
      <h2 className={styles.title} role="heading" aria-level="1">Poupar vs. Investir</h2>

      <div className={styles.questionBlock}>
        <fieldset>
          <legend className={styles.questionText}>
            {currentQuestion + 1}. {question.question}
          </legend>
          {question.options.map((option, idx) => (
            <label key={idx} className={styles.optionLabel}>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={idx}
                checked={selectedAnswer === idx}
                onChange={() => handleOptionChange(idx)}
                disabled={submitted}
                className={styles.radio}
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className={styles.navigationButtons}>
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={styles.button}
          aria-label="Ir para a pergunta anterior"
        >
          Anterior
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={styles.button}
            aria-label="Ir para a próxima pergunta"
          >
            Próxima
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={styles.button}
            aria-label="Enviar as respostas do quiz"
          >
            Enviar Respostas
          </button>
        )}
      </div>
    </div>
  );
}
