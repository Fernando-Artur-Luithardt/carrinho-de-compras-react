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
    if(nome == "" || valor == "")
      return alert('Necessário Digitar nome do produto e valor');
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
          <td><button value={item.id} className="deleteButton" onClick={deleteButton}>Remover</button></td>
        </tr>
      );
    });
    return content;
  };

  function finalizaCompra(){
    const notasDisponiveis = [100, 50, 20, 10, 5, 2, 1];
    let saida = '';
    let resto = valorTotal;
    let qtdNotas = 0;
    notasDisponiveis.forEach((i) => {
      qtdNotas = parseInt(resto / i);
      resto = resto % i;
      saida += qtdNotas != 0 ? ((qtdNotas == 1 ? qtdNotas+' nota de R$' : qtdNotas+' notas de R$') + i + '\n') : ''
    })
    return alert(saida);
  }

  //Só pega a change quando eu deleto, deveria pegar quando addProduto Também
  useEffect(() => {
    atualizaValorTotal()
  }, [produtos])

  return <section>
    <h1>Adicionar produtos</h1>
    <div>
      <div className="inputDiv">
        <label className="labelInput" htmlFor="inputNome">Produto</label>
        <input id="inputNome" onChange={e => setNome(e.target.value)} type="nomeProduto"/>
      </div>
      <div className="inputDiv">
        <label className="labelInput" htmlFor="inputValor">Valor</label>
        <input id="inputValor" onChange={e => setValor(e.target.value)} type="number" id="valorProduto"/>
      </div>
    </div>
    <button className="addButton" onClick={addProduto}>Adicionar</button>
    <h2>Carrinho de compras</h2>
    <table className="comprasContainer">
      <thead key="thead">
        <tr>
            <td>Nome</td>
            <td>Valor</td>
            <td>Remover</td>
        </tr>
      </thead>
      <tbody key="tbody">
        {renderTabel()}
      </tbody>
    </table>
    <div className="comprasFooter">
      <h2>Valor total: {valorTotal}</h2>
      {produtos.length > 0 ? <button onClick={finalizaCompra} className="finalizarButton">Finalizar</button> : ''}
    </div>
  </section>
}