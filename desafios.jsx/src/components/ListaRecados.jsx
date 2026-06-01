import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ListaRecados.module.css';

const URL = 'http://localhost:3001/recados';

const ListaRecados = () => {
  const [recados, setRecados] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    axios.get(URL)
      .then((resposta) => {
        setRecados(resposta.data);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error(erro);
        setCarregando(false);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const novoRecado = { titulo, mensagem };
    axios.post(URL, novoRecado)
      .then((resposta) => {
     
        setRecados([...recados, resposta.data]);
        setTitulo('');
        setMensagem('');
      })
      .catch((erro) => {
        alert('Erro ao cadastrar :(');
        console.error(erro);
      });
  }


  const excluirRecado = (id) => {
    axios.delete(`${URL}/${id}`)
      .then(() => {
        setRecados(recados.filter((r) => r.id !== id));
      });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>📝 Lista de Recados</h1>

     
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
        <button type="submit" className={styles.botaoCadastrar}>
          Cadastrar
        </button>
      </form>

    
      {carregando ? (
        <p className={styles.vazio}>Carregando...</p>
      ) : (
        <>

          {recados.length === 0 && (
            <p className={styles.vazio}>Nenhum recado ainda. Cadastre o primeiro!</p>
          )}

          {recados.map((recado) => (
            <div key={recado.id} className={styles.recado}>
              <div>
                <strong>{recado.titulo}</strong>
                <p>{recado.mensagem}</p>
              </div>
              <button
                className={styles.botaoExcluir}
                onClick={() => excluirRecado(recado.id)}
              >
                Excluir
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ListaRecados;