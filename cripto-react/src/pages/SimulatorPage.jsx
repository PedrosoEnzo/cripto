import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./SimulatorPage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SimulatorPage() {
  const [investmentType, setInvestmentType] = useState("selic");
  const [cryptoType, setCryptoType] = useState("bitcoin");
  const [rate, setRate] = useState(null);
  const [riskLevel, setRiskLevel] = useState("");
  const [cryptoPrice, setCryptoPrice] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [years, setYears] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRate(investmentType);
  }, [investmentType, cryptoType]);

  const fetchRate = async (type) => {
    if (type === "selic") {
      fetch("https://brasilapi.com.br/api/taxas/v1/selic")
        .then((response) => response.json())
        .then((data) => {
          setRate(parseFloat(data.valor));
          setRiskLevel("Baixo risco");
        })
        .catch((error) => {
          console.error("Erro ao buscar taxa Selic:", error);
          setRate(10);
          setRiskLevel("Baixo risco");
        });
    } else if (type === "poupanca") {
      setRate(6);
      setRiskLevel("Baixo risco");
    } else if (type === "tesouro") {
      setRate(10);
      setRiskLevel("Baixo risco");
    } else if (type === "fii") {
      setRate(12);
      setRiskLevel("Médio risco");
    } else if (type === "acoes") {
      setRate(15);
      setRiskLevel("Alto risco");
    } else if (type === "crypto") {
      const cryptoRates = {
        bitcoin: 49.8,
        ethereum: 35.6,
        solana: 32.3,
        ripple: 27.4,
        cardano: 42.1,
      };

      const selectedRate = cryptoRates[cryptoType] ?? 30;
      setRate(selectedRate);
      setRiskLevel("Alto risco");

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoType}&vs_currencies=usd`
        );
        const data = await response.json();
        const priceNow = data[cryptoType]?.usd;

        if (priceNow) {
          setCryptoPrice(priceNow);
        } else {
          setCryptoPrice(null);
        }
      } catch (error) {
        console.error("Erro ao buscar preço da cripto:", error);
        setCryptoPrice(null);
      }
    }
  };

  function handleSimulation(e) {
    e.preventDefault();

    const P = parseFloat(initialInvestment);
    const PMT = parseFloat(monthlyContribution);
    const r = (rate || 10) / 100 / 12;
    const n = parseInt(years) * 12;

    if (isNaN(P) || isNaN(PMT) || isNaN(r) || isNaN(n)) {
      setFinalAmount("Preencha todos os campos corretamente.");
      return;
    }

    if (P <= 0 || PMT < 0) {
      setFinalAmount("O investimento inicial deve ser positivo e o aporte mensal não pode ser negativo.");
      return;
    }

    if (parseInt(years) < 1 || parseInt(years) > 100) {
      setFinalAmount("O período de investimento deve ser entre 1 e 100 anos.");
      return;
    }

    const values = [];
    let accumulatedValue = P;
    for (let i = 0; i < n; i++) {
      accumulatedValue = accumulatedValue * (1 + r) + PMT;
      values.push(accumulatedValue);
    }

    setFinalAmount(values[n - 1]);
    setChartData({
      labels: Array.from({ length: n }, (_, index) => index + 1),
      datasets: [
        {
          label: "Valor acumulado",
          data: values,
          fill: false,
          borderColor: "#b12092",
          tension: 0.1,
        },
      ],
    });
  }

  return (
    <>
      <div className={styles.page}>
        <header className={styles.header}>
          <FaArrowLeft className={styles.backArrow} onClick={() => navigate("/lesson/1")} />
          <a href="/lesson/1" className={styles.link}>
            <h1 className={styles.title}>
              Simulador de <span className={styles.corTitulo}>Investimentos</span>
            </h1>
          </a>
        </header>

        <main className={styles.main}>
          <div className={styles.formAndChartContainer}>
            <div className={styles.formContainer}>
              <form onSubmit={handleSimulation} className={styles.simulatorForm}>
                <label>
                  Tipo de Investimento:
                  <br />
                  <select value={investmentType} onChange={(e) => setInvestmentType(e.target.value)}>
                    <option value="selic">Selic</option>
                    <option value="poupanca">Poupança</option>
                    <option value="tesouro">Tesouro Direto</option>
                    <option value="fii">Fundo Imobiliário (FII)</option>
                    <option value="acoes">Ações</option>
                    <option value="crypto">Criptomoeda</option>
                  </select>
                </label>

                {investmentType === "crypto" && (
                  <label>
                    Criptomoeda:
                    <br />
                    <select value={cryptoType} onChange={(e) => setCryptoType(e.target.value)}>
                      <option value="bitcoin">Bitcoin (BTC)</option>
                      <option value="ethereum">Ethereum (ETH)</option>
                      <option value="solana">Solana (SOL)</option>
                      <option value="ripple">XRP (Ripple)</option>
                      <option value="cardano">Cardano (ADA)</option>
                    </select>
                  </label>
                )}

                <label>
                  Valor Inicial:
                  <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} min="0.01" step="0.01" required />
                </label>

                <label>
                  Aporte Mensal:
                  <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} min="0.00" step="0.01" required />
                </label>

                <label>
                  Tempo (anos):
                  <input type="number" value={years} onChange={(e) => setYears(e.target.value)} min="1" max="100" required />
                </label>

                <button type="submit">Simular</button>
              </form>

              {finalAmount && (
                <div className={styles.simulationResult}>
                  {isNaN(finalAmount) || typeof finalAmount === "string" ? (
                    <span style={{ color: "red" }}>{finalAmount}</span>
                  ) : (
                    <>
                      Valor Futuro Estimado: <strong>{finalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                      <div className={styles.tooltip}>
                        <FaInfoCircle />
                        <span className={styles.tooltipText}>
                          Esta projeção é apenas ilustrativa e não representa garantia de retorno futuro.
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className={styles.chartContainer}>
              {rate !== null ? (
                <>
                  <p className={styles.selicText}>Taxa Atual Estimada: <strong>{rate}% a.a.</strong></p>
                  <p className={styles.riskText}>Nível de Risco: <strong>{riskLevel}</strong></p>
                  {investmentType === "crypto" && cryptoPrice !== null && (
                    <p className={styles.riskText}>
                      Preço Atual ({cryptoType.charAt(0).toUpperCase() + cryptoType.slice(1)}): <strong>{cryptoPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong>
                    </p>
                  )}
                </>
              ) : (
                <p className={styles.selicText}>Carregando informações...</p>
              )}

              {chartData && (
                <>
                  <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: true, position: "top", labels: { color: "#fff" } }, tooltip: { callbacks: { label: (context) => `R$ ${context.raw.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` } } }, scales: { x: { title: { display: true, text: "Meses", color: "#fff" }, ticks: { color: "#fff" } }, y: { title: { display: true, text: "Valor Acumulado (R$)", color: "#fff" }, ticks: { color: "#fff", callback: (value) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}` } } } }} />
                  <div className={styles.investmentExplanation}>
                    {(() => {
                      switch (investmentType) {
                        case "selic":
                          return "Aqui, simulamos um investimento que rende igual à taxa Selic. É uma opção segura, indicada para quem quer evitar grandes riscos e está investindo no curto ou médio prazo.";
                        case "poupanca":
                          return " Esta simulação mostra quanto seu dinheiro renderia se ficasse guardado na poupança. Apesar de segura e sem impostos, pode perder para a inflação com o tempo.";
                        case "tesouro":
                          return "A simulação considera um rendimento médio desses títulos. Eles são considerados seguros e podem render mais que a poupança, dependendo do tipo escolhido.";
                        case "fii":
                          return "Simula o rendimento médio de quem investe em FIIs. O risco é moderado, pois o valor pode variar, mas você pode receber “aluguéis” mensais.";
                        case "acoes":
                          return " Considera uma média de rendimento a longo prazo. As ações têm mais risco, mas também maior potencial de lucro.";
                        case "crypto":
                          return "Mostra quanto seu dinheiro poderia render baseado na valorização histórica da criptomoeda escolhida. É um investimento de alto risco, mas que pode trazer grandes retornos.";
                        default:
                          return "";
                      }
                    })()}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
