import { useState, createContext, useContext } from "react";

const CarrinhoCtx = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [aberto, setAberto] = useState(false);
  
  const adicionarItem = (produto, tamanho, nomeJogador, qtd = 1) => {
    const key = `${produto.id}-${tamanho}-${nomeJogador || ""}`;
    setItens(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qtd: i.qtd + qtd } : i);
      return [...prev, { key, produto, tamanho, nomeJogador, qtd }];
    });
    setAberto(true);
  };
  
  const removerItem = (key) => setItens(prev => prev.filter(i => i.key !== key));
  
  const atualizarQtd = (key, qtd) => {
    if (qtd <= 0) return removerItem(key);
    setItens(prev => prev.map(i => i.key === key ? { ...i, qtd } : i));
  };
  
  const total = itens.reduce((s, i) => s + i.produto.price * i.qtd, 0);
  const quantidade = itens.reduce((s, i) => s + i.qtd, 0);
  
  return (
    <CarrinhoCtx.Provider value={{ 
      itens, 
      adicionarItem, 
      removerItem, 
      atualizarQtd, 
      total, 
      quantidade, 
      aberto, 
      setAberto 
    }}>
      {children}
    </CarrinhoCtx.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoCtx);
