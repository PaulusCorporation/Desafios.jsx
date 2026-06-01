import { useState } from 'react';
import axios from 'axios';

const CadastrarTarefa = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaTarefa = { titulo, descricao };

    axios.post('http://localhost:3001/tarefas', novaTarefa)
      .then((resposta) => {
        alert('Tarefa cadastrada com sucesso!');
        console.log('Tarefa criada:', resposta.data);
        setTitulo('');
        setDescricao('');
      })
      .catch((erro) => {
        alert('Deu ruim ao cadastrar :(');
        console.error(erro);
      });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        <br />
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarTarefa;