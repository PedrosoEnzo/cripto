import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './SimulatorPage.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SimulatorPage() {
  const [selicRate, setSelicRate] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [years, setYears] = useState('');
  const [finalAmount, setFinalAmount] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/taxas/v1/selic')
      .then((response) => response.json())
      .then((data) => {
        setSelicRate(parseFloat(data.valor));
      })
      .catch((error) => console.error('Erro ao buscar taxa Selic:', error));
  }, []);

  function handleSimulation(e) {
    e.preventDefault();

    const P = parseFloat(initialInvestment);
    const PMT = parseFloat(monthlyContribution);
    const r = (selicRate || 10) / 100 / 12; 
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
          borderColor: '#3f025b',
          tension: 0.1,
        },
      ],
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Simulador de Investimentos</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.formAndChartContainer}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSimulation} className={styles.simulatorForm}>
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
            {selicRate !== null ? (
              <p className={styles.selicText}>
                Taxa Selic Atual: <strong>{selicRate}% a.a.</strong>
              </p>
            ) : (
              <p className={styles.selicText}>Carregando taxa Selic...</p>
            )}

            {chartData && <Line data={chartData} />}
          </div>
        </div>
      </main>
    </div>
  );
}

