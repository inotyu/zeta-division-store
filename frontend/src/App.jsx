import { useState } from "react";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import PaginaInicial from "./components/pages/PaginaInicial";
import PaginaProduto from "./components/pages/PaginaProduto";
import PaginaCatalogo from "./components/pages/PaginaCatalogo";

// Componente principal da aplicação
function App() {
  const [paginaAtual, setPaginaAtual] = useState("inicio");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [catAtiva, setCatAtiva] = useState("lancamentos");

  const handleNav = (destino) => {
    setPaginaAtual(destino);
    setProdutoSelecionado(null);
    window.scrollTo(0, 0); // Rola para o topo
  };

  const handleProdutoClick = (produto) => {
    setProdutoSelecionado(produto);
    setPaginaAtual("produto");
    // Força scroll para o topo após a mudança de página
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <CarrinhoProvider>
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Header onNav={handleNav} />
        
        {paginaAtual === "inicio" && (
          <PaginaInicial 
            onProdutoClick={handleProdutoClick} 
            onNav={handleNav}
            catAtiva={catAtiva}
            setCatAtiva={setCatAtiva}
          />
        )}
        
        {paginaAtual === "produto" && produtoSelecionado && (
          <PaginaProduto 
            produto={produtoSelecionado} 
            onNav={handleNav}
            onProdutoClick={handleProdutoClick}
          />
        )}
        
        {(paginaAtual !== "produto" && paginaAtual !== "inicio") && (
          <PaginaCatalogo 
            categoriaId={paginaAtual} 
            onProdutoClick={handleProdutoClick} 
          />
        )}
        
        <Footer onNav={handleNav} />
        <CartDrawer />
      </div>
    </CarrinhoProvider>
  );
}

export default App;
