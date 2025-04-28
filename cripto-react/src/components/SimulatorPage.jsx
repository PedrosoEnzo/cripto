import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './SimulatorPage.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SimulatorPage() {
  const [investmentType, setInvestmentType] = useState('selic');
  const [cryptoType, setCryptoType] = useState('bitcoin');
  const [rate, setRate] = useState(null);
  const [riskLevel, setRiskLevel] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [years, setYears] = useState('');
  const [finalAmount, setFinalAmount] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchRate(investmentType);
  }, [investmentType, cryptoType]);

  const fetchRate = async (type) => {
    if (type === 'selic') {
      fetch('https://brasilapi.com.br/api/taxas/v1/selic')
        .then((response) => response.json())
        .then((data) => {
          setRate(parseFloat(data.valor));
          setRiskLevel('Baixo risco'); 
        })
        .catch((error) => {
          console.error('Erro ao buscar taxa Selic:', error);
          setRate(10);
          setRiskLevel('Baixo risco');
        });
    } else if (type === 'poupanca') {
      setRate(6);
      setRiskLevel('Baixo risco'); 
    } else if (type === 'tesouro') {
      setRate(10);
      setRiskLevel('Baixo risco'); 
    } else if (type === 'fii') {
      setRate(12);
      setRiskLevel('Médio risco'); 
    } else if (type === 'acoes') {
      setRate(15);
      setRiskLevel('Alto risco'); 
    } else if (type === 'crypto') {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoType}&vs_currencies=usd`);
        const data = await response.json();
        const priceNow = data[cryptoType]?.usd;

        if (priceNow) {
          setRate(50);
        } else {
          setRate(30);
        }
        setRiskLevel('Alto risco');
      } catch (error) {
        console.error('Erro ao buscar preço da cripto:', error);
        setRate(30);
        setRiskLevel('Alto risco');
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
      setFinalAmount('Preencha todos os campos corretamente.');
      return;
    }

    const values = [];
    let accumulatedValue = P;
    for (let i = 0; i < n; i++) {
      accumulatedValue = accumulatedValue * (1 + r) + PMT;
      values.push(accumulatedValue.toFixed(2));
    }

    setFinalAmount(values[n - 1]);
    setChartData({
      labels: Array.from({ length: n }, (_, index) => index + 1),
      datasets: [
        {
          label: 'Valor acumulado',
          data: values,
          fill: false,
          borderColor: '#b12092',
          tension: 0.1,
        },
      ],
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Simulador de <span className="highlight">Investimentos</span></h1>
      </header>

      <main className={styles.main}>
        <div className={styles.formAndChartContainer}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSimulation} className={styles.simulatorForm}>
              <label>
                Tipo de Investimento:
                <select value={investmentType} onChange={(e) => setInvestmentType(e.target.value)}>
                  <option value="selic">Selic</option>
                  <option value="poupanca">Poupança</option>
                  <option value="tesouro">Tesouro Direto</option>
                  <option value="fii">Fundo Imobiliário (FII)</option>
                  <option value="acoes">Ações</option>
                  <option value="crypto">Criptomoeda</option>
                </select>
              </label>

              {investmentType === 'crypto' && (
                <label>
                  Criptomoeda:
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
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  required
                />
              </label>
              <label>
                Aporte Mensal:
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  required
                />
              </label>
              <label>
                Tempo (anos):
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Simular</button>
            </form>

            {finalAmount && (
              <div className={styles.simulationResult}>
                Valor Futuro Estimado: <strong>R$ {finalAmount}</strong>
              </div>
            )}
          </div>

          <div className={styles.chartContainer}>
            {rate !== null ? (
              <>
                <p className={styles.selicText}>
                  Taxa Atual Estimada: <strong>{rate}% a.a.</strong>
                </p>
                <p className={styles.riskText}>
                  Nível de Risco: <strong>{riskLevel}</strong>
                </p>
              </>
            ) : (
              <p className={styles.selicText}>Carregando informações...</p>
            )}

            {chartData && <Line data={chartData} />}
          </div>
        </div>
      </main>
    </div>
  );
}

