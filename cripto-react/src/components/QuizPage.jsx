import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuizPage.module.css';

const questions = [
  {
    question: "O que é um investimento?",
    options: [
      "Gasto desnecessário",
      "Compra parcelada",
      "Aplicação de recursos para obter retorno",
      "Doação em dinheiro"
    ],
    correctAnswer: 2,
  },
  {
    question: "Qual o objetivo principal de investir?",
    options: [
      "Perder dinheiro",
      "Guardar em casa",
      "Maximizar lucros",
      "Evitar trabalho"
    ],
    correctAnswer: 2,
  },
  {
    question: "O que representa a taxa Selic?",
    options: [
      "Imposto de renda",
      "Inflação",
      "Taxa básica de juros da economia",
      "Cotação do dólar"
    ],
    correctAnswer: 2,
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctCount = questions.reduce((count, question, index) => {
      return question.correctAnswer === answers[index] ? count + 1 : count;
    }, 0);

    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setSubmitted(true);

    if (percentage >= 70) {
      alert('Parabéns! Você acertou mais de 70% e a próxima aula foi liberada.');

      // Marcar apenas a Aula 1 como concluída
      const stored = localStorage.getItem('chainx-progress');
      const completed = stored ? JSON.parse(stored) : [];
      const updated = completed.includes(1) ? completed : [...completed, 1];
      localStorage.setItem('chainx-progress', JSON.stringify(updated));

      navigate('/curso');
    } else {
      alert('Você precisa acertar pelo menos 70% para desbloquear a próxima aula.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Quiz da Aula</h2>

        {questions.map((question, qIdx) => (
          <div key={qIdx} className={styles.questionBlock}>
            <p className={styles.questionText}>
              <strong>{qIdx + 1}. {question.question}</strong>
            </p>
            {question.options.map((option, oIdx) => (
              <label key={oIdx} className={styles.optionLabel}>
                <span>{option}</span>
                <input
                  type="radio"
                  name={`question-${qIdx}`}
                  value={oIdx}
                  checked={answers[qIdx] === oIdx}
                  onChange={() => handleOptionChange(qIdx, oIdx)}
                  disabled={submitted}
                  className={styles.radio}
                />
              </label>
            ))}
          </div>
        ))}

        {!submitted ? (
          <button onClick={handleSubmit} className={styles.button}>
            Enviar Respostas
          </button>
        ) : (
          <p className={styles.resultText}><strong>Você acertou {score}%</strong></p>
        )}
      </div>
    </div>
  );
}
