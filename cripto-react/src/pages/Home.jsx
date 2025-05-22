import { useEffect } from 'react';
import './Home.css'
import moeda from '../assets/imgMoeda.png';
import cursos from '../assets/cursos.png';
import cursos1 from '../assets/cursos1.png';
import cursos2 from '../assets/cursos2.png';
import Footer from '../components/Footer';

export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    });

    const elements = document.querySelectorAll('.scroll-animation');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/*  Título e Imagem da Moeda */}
      <div className="navbar-img-moeda">
        <div className="content">
          <h1>Simule, Aprenda, <br />Invista no seu futuro!</h1>
          <p>Se prepare para o futuro agora!</p>
        </div>
        <img src={moeda} alt="Moeda" className="moeda-image" />
      </div>

      {/* Frase Inspiradora */}
      <div className="frase">
        <h2 className="scroll-animation">
          " O verdadeiro investidor não é aquele<br />
          que tenta prever o futuro, mas aquele<br />
          que se prepara para ele. "
        </h2>
        <p className="scroll-animation">- Benjamin Graham -</p>
      </div> <br /><br /><br /><br /><br /><br />

      {/* Seção Plataforma de Cursos */}
      <div className="plataformaCursos">
        <h2 className="scroll-animation">
          A ChainX é uma plataforma de
          <span className="highlight"> Educação <br /> Financeira </span>
          onde você tem acesso:
        </h2>

        <div className="plataformaCursosContent">

          <div className="plataformaCursosCard scroll-animation">
            <div className="plataformaCursosCardIcon">
              <img src={cursos1} alt="Simulador de Investimentos" />
              <h3>Simulador de Investimentos</h3>
              <p>Aprenda a investir com segurança e confiança.</p>
            </div>
          </div>

          <div className="plataformaCursosCard scroll-animation">
            <div className="plataformaCursosCardIcon">
              <img src={cursos} alt="Conteúdo Exclusivo" />
              <h3>Conteúdo Exclusivo</h3>
              <p>Acesse cursos e materiais de alta qualidade.</p>
            </div>
          </div>

          <div className="plataformaCursosCard scroll-animation">
            <div className="plataformaCursosCardIcon">
              <img src={cursos2} alt="Comunidade Ativa" />
              <h3>Comunidade Ativa</h3>
              <p>Participe de discussões e trocas de experiências.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
