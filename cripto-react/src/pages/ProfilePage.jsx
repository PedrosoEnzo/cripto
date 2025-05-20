import { useEffect, useState } from "react";

function Perfil() {
  const [usuario, setUsuario] = useState(null);

useEffect(() => {
    fetch("/perfil")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setUsuario(data))
      .catch((error) => {
        console.error("Erro ao buscar perfil:", error);
        setUsuario({ erro: "Não foi possível carregar os dados." });
      });
}, []);


  return (
    <div>
      <h1>Perfil do Usuário</h1>
      {usuario ? (
        <div>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Perfil;
