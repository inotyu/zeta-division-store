import { useState, useEffect } from "react";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { getRelacionados } from "../../utils/constants";
import ProductCard from "../ProductCard";
import Btn from "../UI/Button";
import SeletorQtd from "../UI/QuantitySelector";
import EstrelaInsignia from "../UI/EstrelaInsignia";

export default function PaginaProduto({ produto, onNav, onProdutoClick }) {
  const [imgSel, setImgSel] = useState(0);
  const [tamSel, setTamSel] = useState(null);
  const [jogSel, setJogSel] = useState(null);
  const [qtd, setQtd] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const { adicionarItem } = useCarrinho();
  const relacionados = getRelacionados(produto);

  // Força scroll para o topo quando o componente montar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [produto.id]); // Executa sempre que mudar o produto

  const handleAdicionar = () => {
    if (!tamSel) { alert("Por favor, selecione um tamanho."); return; }
    if (produto.nomeJogadores && !jogSel) { alert("Por favor, selecione o nome do jogador."); return; }
    adicionarItem(produto, tamSel, jogSel, qtd);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <div style={{ 
      paddingTop: "calc(48px + 100px)", // Header menor (48px) + espaço
      maxWidth:"var(--mw)", 
      margin:"0 auto", 
      padding:"0 24px 80px", 
      animation:"fadeIn .3s ease" 
    }}>
      <div style={{ marginBottom:32 }}>
        <button 
          onClick={() => onNav("inicio")} // Volta para página inicial
          style={{ 
            display:"inline-flex", 
            alignItems:"center", 
            gap:6, 
            fontFamily:"var(--fb)", 
            fontSize:11, 
            fontWeight:600, 
            letterSpacing:"0.15em", 
            textTransform:"uppercase", 
            color:"var(--txm)" 
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          VOLTAR
        </button>
      </div>

      <div style={{ 
        display:"grid", 
        gridTemplateColumns:"1fr 1fr", 
        gap:48, 
        marginBottom:80 
      }} className="layout-produto">
        {/* Imagens do Produto */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ 
            position:"relative", 
            aspectRatio:1, 
            background:"var(--surf)", 
            overflow:"hidden", 
            maxHeight:500 
          }}>
            <img 
              src={produto.images[imgSel]} 
              alt={produto.name} 
              style={{ 
                width:"100%", 
                height:"100%", 
                objectFit:"cover" 
              }} 
            />
            {produto.teamName && (
              <div style={{ 
                position:"absolute", 
                bottom:24, 
                left:"50%", 
                transform:"translateX(-50%)", 
                fontFamily:"var(--fd)", 
                fontSize:20, 
                letterSpacing:"0.12em", 
                color:"var(--bg)", 
                background:"var(--tx)", 
                padding:"4px 16px", 
                whiteSpace:"nowrap", 
                zIndex:2 
              }}>
                {produto.teamName}
              </div>
            )}
            {produto.badge && <EstrelaInsignia linhas={produto.badge.split("\n")} />}
            {produto.images.length > 1 && (
              <>
                <button 
                  onClick={() => setImgSel(i=>(i-1+produto.images.length)%produto.images.length)} 
                  style={{ 
                    position:"absolute", 
                    left:12, 
                    top:"50%", 
                    transform:"translateY(-50%)", 
                    width:40, 
                    height:40, 
                    background:"rgba(0,0,0,.6)", 
                    color:"var(--tx)", 
                    border:"none", 
                    fontSize:28, 
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center", 
                    cursor:"pointer", 
                    zIndex:3 
                  }}
                >
                  ‹
                </button>
                <button 
                  onClick={() => setImgSel(i=>(i+1)%produto.images.length)} 
                  style={{ 
                    position:"absolute", 
                    right:12, 
                    top:"50%", 
                    transform:"translateY(-50%)", 
                    width:40, 
                    height:40, 
                    background:"rgba(0,0,0,.6)", 
                    color:"var(--tx)", 
                    border:"none", 
                    fontSize:28, 
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center", 
                    cursor:"pointer", 
                    zIndex:3 
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
          
          {/* Miniaturas */}
          {produto.images.length > 1 && (
            <div style={{ 
              display:"flex", 
              gap:8, 
              overflowX:"auto", 
              padding:"4px 0" 
            }}>
              {produto.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setImgSel(idx)}
                  style={{ 
                    width:60, 
                    height:60, 
                    border:"2px solid", 
                    borderColor:imgSel===idx?"var(--ac)":"transparent", 
                    borderRadius:"var(--r)", 
                    overflow:"hidden", 
                    cursor:"pointer", 
                    flexShrink:0 
                  }}
                >
                  <img 
                    src={img} 
                    alt="" 
                    style={{ 
                      width:"100%", 
                      height:"100%", 
                      objectFit:"cover" 
                    }} 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Informações do Produto */}
        <div>
          <h1 style={{ 
            fontFamily:"var(--fd)", 
            fontSize:"clamp(32px,5vw,48px)", 
            letterSpacing:"0.08em", 
            lineHeight:1.2, 
            marginBottom:16 
          }}>
            {produto.name}
          </h1>
          
          <p style={{ 
            fontFamily:"var(--fb)", 
            fontSize:24, 
            fontWeight:600, 
            color:"var(--tx)", 
            marginBottom:24 
          }}>
            {produto.price.toLocaleString("pt-BR", { style:"currency", currency:"BRL" })}
          </p>
          
          <p style={{ 
            fontSize:14, 
            lineHeight:1.8, 
            color:"var(--txm)", 
            marginBottom:32 
          }}>
            {produto.description}
          </p>
          
          {/* Seleção de Tamanho */}
          {produto.tamanhos && (
            <div style={{ marginBottom:24 }}>
              <h3 style={{ 
                fontFamily:"var(--fb)", 
                fontSize:12, 
                fontWeight:600, 
                letterSpacing:"0.1em", 
                textTransform:"uppercase", 
                marginBottom:12 
              }}>
                TAMANHO
              </h3>
              <div style={{ 
                display:"flex", 
                gap:8, 
                flexWrap:"wrap" 
              }}>
                {produto.tamanhos.map(tam => (
                  <button
                    key={tam}
                    onClick={() => setTamSel(tam)}
                    style={{
                      padding:"12px 20px",
                      border:`1px solid ${tamSel===tam?"var(--tx)":"var(--brl)"}`,
                      background:tamSel===tam?"var(--tx)":"transparent",
                      color:tamSel===tam?"var(--bg)":"var(--tx)",
                      fontFamily:"var(--fb)",
                      fontSize:13,
                      fontWeight:600,
                      letterSpacing:"0.05em",
                      textTransform:"uppercase",
                      cursor:"pointer",
                      borderRadius:"var(--r)",
                      transition:"all var(--tr)"
                    }}
                  >
                    {tam}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Seleção de Jogador */}
          {produto.nomeJogadores && (
            <div style={{ marginBottom:24 }}>
              <h3 style={{ 
                fontFamily:"var(--fb)", 
                fontSize:12, 
                fontWeight:600, 
                letterSpacing:"0.1em", 
                textTransform:"uppercase", 
                marginBottom:12 
              }}>
                NOME DO JOGADOR
              </h3>
              <div style={{ 
                display:"flex", 
                gap:8, 
                flexWrap:"wrap" 
              }}>
                {produto.nomeJogadores.map(nome => (
                  <button
                    key={nome}
                    onClick={() => setJogSel(nome)}
                    style={{
                      padding:"12px 20px",
                      border:`1px solid ${jogSel===nome?"var(--tx)":"var(--brl)"}`,
                      background:jogSel===nome?"var(--tx)":"transparent",
                      color:jogSel===nome?"var(--bg)":"var(--tx)",
                      fontFamily:"var(--fb)",
                      fontSize:13,
                      fontWeight:600,
                      letterSpacing:"0.05em",
                      textTransform:"uppercase",
                      cursor:"pointer",
                      borderRadius:"var(--r)",
                      transition:"all var(--tr)"
                    }}
                  >
                    {nome}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantidade */}
          <div style={{ marginBottom:32 }}>
            <h3 style={{ 
              fontFamily:"var(--fb)", 
              fontSize:12, 
              fontWeight:600, 
              letterSpacing:"0.1em", 
              textTransform:"uppercase", 
              marginBottom:12 
            }}>
              QUANTIDADE
            </h3>
            <SeletorQtd valor={qtd} onChange={setQtd} />
          </div>
          
          {/* Botão de Comprar */}
          <Btn 
            variant="primary" 
            size="lg" 
            full 
            onClick={handleAdicionar}
            disabled={adicionado}
          >
            {adicionado ? "ADICIONADO AO CARRINHO ✓" : "ADICIONAR AO CARRINHO"}
          </Btn>
          
          {/* Informações Adicionais */}
          <div style={{ 
            marginTop:32, 
            padding:24, 
            background:"var(--surf)", 
            borderRadius:"var(--r)" 
          }}>
            <div style={{ marginBottom:16 }}>
              <h4 style={{ 
                fontFamily:"var(--fb)", 
                fontSize:11, 
                fontWeight:600, 
                letterSpacing:"0.1em", 
                textTransform:"uppercase", 
                marginBottom:8 
              }}>
                MATERIAL
              </h4>
              <p style={{ fontSize:14, color:"var(--txm)" }}>
                {produto.material}
              </p>
            </div>
            
            {produto.previsaoEnvio && (
              <div>
                <h4 style={{ 
                  fontFamily:"var(--fb)", 
                  fontSize:11, 
                  fontWeight:600, 
                  letterSpacing:"0.1em", 
                  textTransform:"uppercase", 
                  marginBottom:8 
                }}>
                  PRAZO DE ENVIO
                </h4>
                <p style={{ fontSize:14, color:"var(--txm)" }}>
                  {produto.previsaoEnvio}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Produtos Relacionados */}
      {relacionados.length > 0 && (
        <div>
          <h2 style={{ 
            fontFamily:"var(--fd)", 
            fontSize:"clamp(28px,4vw,48px)", 
            letterSpacing:"0.12em", 
            color:"var(--tx)", 
            lineHeight:1, 
            marginBottom:32 
          }}>
            PRODUTOS RELACIONADOS
          </h2>
          <div style={{ 
            display:"grid", 
            gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", 
            gap:16 
          }}>
            {relacionados.map(p => (
              <div key={p.id}>
                <ProductCard produto={p} onClick={onProdutoClick} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
