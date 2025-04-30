import React from 'react';
import './About.css'; 


function About() {
  return (
    <>
      <section className="intro">
        <div className="texto">
          <h1>Bem vindo ao Chain-x</h1>
          <p>
            A Chain-X visa capacitar pessoas e empresas a fazerem<br />
            escolhas financeiras inteligentes, oferecendo simulações<br />
            de investimento e cursos práticos...
          </p>
        </div>
        <div className="img">
          <img src="../images/mundo.png" alt="Mundo" height="300px" />
        </div>
        <div className="texto">
          <h2>Nossa missão:</h2>
          <p>
            Nossa missão é transformar conhecimento em<br />
            poder de decisão, ajudando todos a alcançar seus<br />
            objetivos financeiros com confiança.
          </p>
        </div>
      </section>

      <section className="desenvolvedores">
        <h2>Desenvolvedores:</h2>
        <div className="row">
          {developers.map((dev) => (
            <div className="profile" key={dev.name}>
              <img src={dev.img} alt={dev.name} />
              <p><strong>{dev.name}</strong></p>
              <p>{dev.role}</p>
              <div className="card-sobre">
                <a className="social-link1" href={dev.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram" />
                </a>
                <a className="social-link2" href={dev.github} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const developers = [
  {
    name: 'Ana Clara',
    role: 'Front-End',
    img: '../images/user.jpg',
    instagram: 'https://www.instagram.com/ana_brito2707/',
    github: 'https://github.com/Aninha-3',
  },
  {
    name: 'Enzo',
    role: 'Back-End',
    img: '../images/user.jpg',
    instagram: 'https://www.instagram.com/pedroso.4m/',
    github: 'https://github.com/PedrosoEnzo',
  },
  {
    name: 'Isabella',
    role: 'Document-Writer',
    img: '../images/user.jpg',
    instagram: 'https://www.instagram.com/isa.dmg/',
    github: 'https://github.com/isinha05-ox',
  },
];

export default About;
