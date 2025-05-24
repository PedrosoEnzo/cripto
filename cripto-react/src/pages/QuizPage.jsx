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
    question: "Qual das opções representa um exemplo de investimento em renda fixa?",
    options: [
      "A) Ações",
      "B) Fundos Imobiliários",
      "C) Tesouro Direto",
      "D) Criptomoedas"
    ],
    correctAnswer: 2,
  },
  {
    question: "Qual é a principal diferença entre poupar e investir?",
    options: [
      "A) Poupar dá mais lucro",
      "B) Investir é ilegal",
      "C) Poupar é guardar dinheiro, investir é fazê-lo crescer",
      "D) Investir é só para bancos"
    ],
    correctAnswer: 2,
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
    question: "Investir é como jogar na loteria?",
    options: [
      "A) Sim, porque depende de sorte",
      "B) Não, porque depende de conhecimento e estratégia",
      "C) Sim, ambos envolvem risco igual",
      "D) Não, porque não há riscos em investir"
    ],
    correctAnswer: 1,
  },
  {
    question: "Qual das opções abaixo representa um perfil conservador de investidor?",
    options: [
      "A) Aceita correr mais riscos em busca de lucros",
      "B) Gosta de segurança e estabilidade",
      "C) Investe apenas em criptomoedas",
      "D) Sempre investe em ações"
    ],
    correctAnswer: 1,
  },
  {
    question: "O que você precisa ter para começar a investir na prática?",
    options: [
      "A) Apenas vontade de aprender",
      "B) Uma conta bancária e CPF, além de abrir conta em uma corretora",
      "C) Diploma em economia ou contabilidade",
      "D) Um salário alto e estabilidade financeira"
    ],
    correctAnswer: 1,
  },
  {
    question: "Qual das alternativas é uma característica da renda variável?",
    options: [
      "A) Rendimento garantido",
      "B) Baixo risco e retorno previsível",
      "C) Pode subir ou cair, mas tem potencial de maiores lucros",
      "D) Isento de qualquer risco"
    ],
    correctAnswer: 2,
  },
  {
    question: "Qual é a metáfora usada na aula para explicar a diferença entre poupar e investir?",
    options: [
      "A) Poupar é como correr, investir é como caminhar",
      "B) Poupar é deixar no cofre, investir é gastar",
      "C) Poupar é estacionar o carro, investir é pegar a estrada",
      "D) Poupar é como estudar, investir é como trabalhar"
    ],
    correctAnswer: 2,
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
      alert('Parabéns! Você acertou mais de 70% e a próxima aula foi liberada.');

      // Atualiza progresso no localStorage
      const stored = localStorage.getItem('chainx-progress');
      const completed = stored ? JSON.parse(stored) : [];
      const updated = completed.includes(1) ? completed : [...completed, 1];
      localStorage.setItem('chainx-progress', JSON.stringify(updated));

      navigate('/curso');
    } else {
      alert('Você precisa acertar pelo menos 70% para desbloquear a próxima aula.');
    }
  };

  if (submitted) {
    return (
      <div className={styles.container3}>
        <div className={styles.container2}>
          <h2>Você acertou {score}%</h2>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers(Array(questions.length).fill(null));
              setSubmitted(false);
              setScore(0);
            }}
            className={styles.button}
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
      <h2 className={styles.title}>Poupar vs. Investir</h2>

      <div className={styles.questionBlock}>
        <p className={styles.questionText}>
          <strong>{currentQuestion + 1}. {question.question}</strong>
        </p>
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
      </div>

      <div className={styles.navigationButtons}>
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={styles.button}
        >
          Anterior
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={styles.button}
          >
            Próxima
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={styles.button}
          >
            Enviar Respostas
          </button>
        )}
      </div>
    </div>
  );
}
