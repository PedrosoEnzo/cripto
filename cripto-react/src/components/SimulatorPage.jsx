import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './SimulatorPage.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SimulatorPage() {
  const [investmentType, setInvestmentType] = useState('selic');
  const [cryptoType, setCryptoType] = useState('bitcoin');
  const [rate, setRate] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [years, setYears] = useState('');
  const [finalAmount, setFinalAmount] = useState<number | string | null>(null);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedSimulations, setSavedSimulations] = useState([]);
  const navigate = useNavigate();

  // Verifica autenticação ao carregar a página
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    // Carrega histórico de simulações
    const loadSavedSimulations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/simulacoes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSavedSimulations(response.data.simulacoes);
      } catch (error) {
        console.error('Erro ao carregar simulações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedSimulations();
    fetchRate(investmentType);
  }, [navigate, investmentType, cryptoType]);

  const fetchRate = async (type) => {
    // ... (mantenha sua implementação existente)
  };

  const handleSimulation = async (e) => {
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

    const finalValue = values[n - 1];
    setFinalAmount(finalValue);
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

    // Salva a simulação no backend
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error('Não autenticado');

      await axios.post(
        'http://localhost:5000/simulacoes',
        {
          tipoInvestimento: investmentType,
          valorInicial: P,
          aporteMensal: PMT,
          prazoAnos: parseInt(years),
          taxaEstimada: rate,
          valorFinal: finalValue,
          dataSimulacao: new Date().toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Atualiza a lista de simulações
      const response = await axios.get('http://localhost:5000/simulacoes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSavedSimulations(response.data.simulacoes);

    } catch (error) {
      console.error('Erro ao salvar simulação:', error);
    }
  };

  const loadSimulation = (simulation) => {
    setInvestmentType(simulation.tipoInvestimento);
    setInitialInvestment(simulation.valorInicial.toString());
    setMonthlyContribution(simulation.aporteMensal.toString());
    setYears(simulation.prazoAnos.toString());
    // Dispara a simulação automaticamente
    setTimeout(() => {
      document.getElementById('simulate-button')?.click();
    }, 100);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando suas simulações...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <header className={styles.header}>
          <a href="/lesson/1" className={styles.link}>
            <h1 className={styles.title}>Simulador de <span className={styles.corTitulo}>Investimentos</span></h1>
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

                {investmentType === 'crypto' && (
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
                <button id="simulate-button" type="submit">Simular</button>
              </form>

              {finalAmount && (
                <div className={styles.simulationResult}>
                  Valor Futuro Estimado: <strong>R$ {finalAmount}</strong>
                </div>
              )}

              {/* Seção de simulações salvas */}
              {savedSimulations.length > 0 && (
                <div className={styles.savedSimulations}>
                  <h3>Suas simulações salvas</h3>
                  <ul>
                    {savedSimulations.map((sim, index) => (
                      <li key={index} onClick={() => loadSimulation(sim)}>
                        <span>{sim.tipoInvestimento}</span>
                        <span>R$ {sim.valorFinal.toFixed(2)}</span>
                        <span>{new Date(sim.dataSimulacao).toLocaleDateString()}</span>
                      </li>
                    ))}
                  </ul>
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
      <Footer />
    </>
  );
}