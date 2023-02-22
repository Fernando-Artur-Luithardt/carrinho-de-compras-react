import { useState } from "react"
import { useEffect } from "react"

export default function Tarefas(props) {
  
  const [produtos, setProdutos] = useState(props.produtos || [])
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  let [lastId, setLastId] = useState(0)
  let [valorTotal, setValorTotal] = useState(0)

  //limpar input após adicionar o produto
  //Como adicionar botão de finalizar carrinho após adicionar um item
  //Fazer botão de editar funcionar
  //fixar o valor Total no final da section
  function addProduto() {
    if(produtos.length == 10)
      return alert('Limitado a 10 unidades');
    setLastId(lastId + 1);
    produtos.push({
      nome: nome,
      valor: valor,
      id: lastId,
    })
    atualizaValorTotal()
  }

  //Tentar calcular pela change de produtos
  function atualizaValorTotal() {
    let sum = 0;
    produtos.map(item => {
      sum += parseFloat(item.valor);
    });
    setValorTotal(sum);
    return sum;
  }

  function deleteButton(e) {
    let id = e.target.value
    if(id == '' || id == null)
      return;

    let filtered = produtos.filter(function(value, index, arr){ 
        return value.id != id;
    });
    setProdutos(filtered)
  }

  const renderTabel = () => {
    const content = [];
    produtos.map(item => {
      content.push(
        <tr key={item.id}>
          <td>{item.nome}</td>
          <td>{item.valor}</td>
          <td><button value={item.id} onClick={deleteButton}>Delete btn</button></td>
          <td><button>Edit btn</button></td>
        </tr>
      );
    });
    return content;
  };

  //Só pega a change quando eu deleto, deveria pegar quando addProduto Também
  useEffect(() => {
    atualizaValorTotal()
  }, [produtos])

  return <section>
    <h1>Adicionar produtos</h1>
    <input onChange={e => setNome(e.target.value)} type="nomeProduto"/>
    <input onChange={e => setValor(e.target.value)} type="number" id="valorProduto"/>
    <button onClick={addProduto}>add</button>
    <h2>Carrinho de compras</h2>
    <table className="comprasContainer">
      <thead key="thead">
        <tr>
            <td>Nome</td>
            <td>Valor</td>
            <td></td>
            <td></td>
        </tr>
      </thead>
      <tbody key="tbody">
        {renderTabel()}
      </tbody>
    </table>
    <div className="comprasFooter">
      <h2>Valor total: {valorTotal}</h2>
    </div>
  </section>
}