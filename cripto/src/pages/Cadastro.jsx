import React, { useState } from "react";
import "./cadastro.css"

function Cadastro () {
  return (
  <div className="cadastro">
    <div className="pagina-cadastro">
      <h1>Bem vindo(a) a chainX</h1>
        <h3>Insira um e-mail que você costuma utilizar sempre.</h3>
        <form>
          <div className="form-control">
             <label htmlFor="nome"></label>
             <input type="text" id="nome" placeholder="Nome:"/>
             <label htmlFor="email"></label>
             <input type="text" id="email" placeholder="Email:" />
             <label htmlFor="senha"></label>
             <input type="text" id="senha" placeholder="Senha:" />
          </div>
          <div className="form-control">
            <button>Cadastrar</button>
          </div>
        </form>
    </div>
  </div>
  
  )

}







export default Cadastro;