import { useState } from "react";
import styles from "./perfilQuiz.module.css";

const perguntas = [
  {
    pergunta: "Qual seu conhecimento sobre investimentos?",
    opcoes: [
      { texto: "Nenhum ou muito pouco", pontuacao: 1 },
      { texto: "Tenho algum conhecimento", pontuacao: 2 },
      { texto: "Tenho bastante conhecimento", pontuacao: 3 },
    ],
  },
  {
    pergunta: "Qual seu objetivo com os investimentos?",
    opcoes: [
      { texto: "Preservar meu capital", pontuacao: 1 },
      { texto: "Crescer moderadamente", pontuacao: 2 },
      { texto: "Maximizar ganhos, mesmo com riscos", pontuacao: 3 },
    ],
  },
  {
    pergunta: "Como você reage a perdas em seus investimentos?",
    opcoes: [
      { texto: "Fico muito preocupado e penso em retirar tudo", pontuacao: 1 },
      { texto: "Entendo que oscilações acontecem", pontuacao: 2 },
      { texto: "Vejo como oportunidades de comprar mais", pontuacao: 3 },
    ],
  },
  {
    pergunta: "Por quanto tempo pretende deixar seu dinheiro investido?",
    opcoes: [
      { texto: "Menos de 1 ano", pontuacao: 1 },
      { texto: "De 1 a 5 anos", pontuacao: 2 },
      { texto: "Mais de 5 anos", pontuacao: 3 },
    ],
  },
  {
    pergunta: "O que você prefere?",
    opcoes: [
      { texto: "Segurança, mesmo com retorno menor", pontuacao: 1 },
      { texto: "Equilíbrio entre segurança e retorno", pontuacao: 2 },
      { texto: "Alto retorno, mesmo com riscos", pontuacao: 3 },
    ],
  },
];

const obterPerfil = (pontuacao) => {
  if (pontuacao <= 7) return "Conservador";
  if (pontuacao <= 11) return "Moderado";
  return "Ousado";
};

export default function Quiz() {
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const responder = (valor) => {
    const novaPontuacao = pontuacao + valor;
    setPontuacao(novaPontuacao);

    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      setFinalizado(true);
    }
  };

  if (finalizado) {
    return (
      <div className={styles.container}>
        <h2 className={styles.resultado}>
          Seu perfil de investidor é: <strong>{obterPerfil(pontuacao)}</strong>
        </h2>
        <button
          onClick={() => {
            setIndice(0);
            setPontuacao(0);
            setFinalizado(false);
          }}
          className={styles.refazer}
        >
          Refazer Quiz
        </button>
        <br />
        <a href="/lesson/:id">Voltar para a aula</a>
      </div>
    );
  }

  const perguntaAtual = perguntas[indice];

  return (
    <div className={styles.container}>
      <h2 className={styles.pergunta}>{perguntaAtual.pergunta}</h2>
      {perguntaAtual.opcoes.map((opcao, idx) => (
        <div opcao>
        <button
          key={idx}
          onClick={() => responder(opcao.pontuacao)}
          className={styles.botao}
        >
          {opcao.texto}
        </button>
        </div>
      ))}
      <p>
        Pergunta {indice + 1} de {perguntas.length}
      </p>
    </div>
  );
}

