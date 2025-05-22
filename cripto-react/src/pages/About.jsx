import React from 'react';
import './About.css';
import robo from '../assets/mascote/ZynxOla.png';
import anaPerfil from '../assets/anaPerfil.jpeg';
import nicolePerfil from '../assets/nicolePerfil.jpeg';
import juliaPerfil from '../assets/juliaPerfil.jpeg';
import eduardaPerfil from '../assets/eduardaPerfil.jpeg';
import enzoPerfil from '../assets/enzoPerfil.jpeg';
import isabellaPerfil from '../assets/isabellaPerfil.jpeg';
import marianaPerfil from '../assets/marianaPerfil.jpeg';
import instagram from '../assets/instagram.png';
import github from '../assets/github.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function About() {
  return (
    <>
    
      <section className="intro">
        <div className="textoEsquerdo">
          <h2>Bem vindo ao Chain-x</h2>
          <p>
            A Chain-X visa capacitar pessoas e empresas a fazerem<br />
            escolhas financeiras inteligentes, oferecendo simulações<br />
            de investimento e cursos práticos...
          </p>
        </div>

        <div className="divCentral">
          <img src={robo} alt="Nosso mascote" className="imgMundo" />
          <p>
            <span className="highligh">Zynx</span> <br />
            O nosso mascote veio para facilitar o acesso ao conhecimento financeiro, orientando investimentos estratégicos.

          </p>
        </div>

        <div className="textoDireito">
          <h2>Nossa missão:</h2>
          <p>
            Nossa missão é transformar conhecimento em<br />
            poder de decisão, ajudando todos a alcançar seus<br />
            objetivos financeiros com confiança.
          </p>
        </div>
      </section>


      <section className="desenvolvedores">
      <span className="highligh">
        <h2>Desenvolvedores:</h2>
        </span>
        <div className="row">
          {developers.map((dev) => (
            <div className="profile" key={dev.name}>
              <img src={dev.img} alt={dev.name} />
              <p><strong>{dev.name}</strong></p>
              <p>{dev.role}</p>
              <div className="card-sobre">
                <a className="social-link1" href={dev.instagram} target="_blank" rel="noopener noreferrer">
                  <img src={instagram} alt="Instagram" className="icon-social" />
                </a>
                <a className="social-link2" href={dev.github} target="_blank" rel="noopener noreferrer">
                  <img src={github} alt="GitHub" className="icon-social" />
                </a>
              </div>

            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

const developers = [
  {
    name: 'Ana Clara',
    role: 'Full-Stack',
    img: anaPerfil,
    instagram: 'https://www.instagram.com/ana_brito2707/',
    github: 'https://github.com/Aninha-3',
  },
  {
    name: 'Nicole',
    role: 'Front-End',
    img: nicolePerfil,
    instagram: 'https://www.instagram.com/nicoleeaalencar/',
    github: 'https://github.com/nicoleeaalencar',
  },
  {
    name: 'Julia',
    role: 'Design',
    img: juliaPerfil,
    instagram: 'https://www.instagram.com/julia_miranda288/',
    github: 'https://github.com/Jumiranda28',
  },
  {
    name: 'Maria Eduarda',
    role: 'Design',
    img: eduardaPerfil,
    instagram: 'https://www.instagram.com/eduarda_caraa',
    github: 'https://github.com/eduarda1023',
  },
  {
    name: 'Mariana',
    role: 'Full-Stack',
    img: marianaPerfil,
    instagram: 'https://www.instagram.com/mah_freitas19/',
    github: 'https://github.com/Mari1916',
  },
  {
    name: 'Enzo',
    role: 'Full-Stack',
    img: enzoPerfil,
    instagram: 'https://www.instagram.com/pedroso.4m/',
    github: 'https://github.com/PedrosoEnzo',
  },
  {
    name: 'Isabella',
    role: 'Document-Writer',
    img: isabellaPerfil,
    instagram: 'https://www.instagram.com/isa.dmg/',
    github: 'https://github.com/isinha05-ox',
  },
];

export default About;
