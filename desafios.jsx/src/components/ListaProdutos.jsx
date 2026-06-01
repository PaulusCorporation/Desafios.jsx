import { useState, useEffect } from 'react';
import axios from 'axios';

const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/produtos')
      .then((resposta) => setProdutos(resposta.data))
      .catch((erro) => console.error(erro));
  }, []);

  const removerProduto = (id) => {
    axios.delete(`http://localhost:3001/produtos/${id}`)
      .then(() => {
        // remove o produto da lista local sem precisar buscar de novo
        setProdutos(produtos.filter((p) => p.id !== id));
      })
      .catch((erro) => {
        alert('Erro ao remover :(');
        console.error(erro);
      });
  }

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}
            {' '}
            <button onClick={() => removerProduto(produto.id)}>
              🗑 Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProdutos;