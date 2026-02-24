import { useCarrinho } from "../contexts/CarrinhoContext";
import { fmtPreco } from "../utils/constants";
import SeletorQtd from "./UI/QuantitySelector";

export default function DrawerCarrinho() {
  const { itens, removerItem, atualizarQtd, total, aberto, setAberto } = useCarrinho();
  
  return (
    <>
      <div 
        onClick={() => setAberto(false)} 
        style={{ 
          position:"fixed", 
          inset:0, 
          zIndex:199, 
          background:"rgba(0,0,0,.3)", 
          opacity:aberto?1:0, 
          pointerEvents:aberto?"all":"none", 
          transition:"opacity .3s ease" 
        }} 
      />
      <aside style={{ 
        position:"fixed", 
        top:0, 
        right:0, 
        bottom:0, 
        zIndex:200, 
        width:"min(420px,100vw)", 
        background:"var(--bg2)", 
        borderLeft:"1px solid var(--br)", 
        display:"flex", 
        flexDirection:"column", 
        transform:aberto?"translateX(0)":"translateX(100%)", 
        transition:"transform .35s cubic-bezier(.4,0,.2,1)" 
      }}>
        <div style={{ 
          display:"flex", 
          alignItems:"center", 
          justifyContent:"space-between", 
          padding:"20px 24px" 
        }}>
          <h2 style={{ 
            fontFamily:"var(--fd)", 
            fontSize:20, 
            letterSpacing:"0.2em" 
          }}>
            CARRINHO
          </h2>
          <button 
            onClick={() => setAberto(false)} 
            style={{ 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center", 
              width:36, 
              height:36, 
              color:"var(--tx)" 
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <Divisor />
        
        <div style={{ 
          flex:1, 
          overflowY:"auto", 
          padding:"20px 24px" 
        }}>
          {itens.length === 0 ? (
            <div style={{ 
              display:"flex", 
              alignItems:"center", 
              justifyContent:"center", 
              height:200, 
              color:"var(--txm)", 
              fontSize:13, 
              letterSpacing:"0.1em", 
              textTransform:"uppercase" 
            }}>
              Seu carrinho está vazio.
            </div>
          ) : (
            <ul>
              {itens.map(item => (
                <li 
                  key={item.key} 
                  style={{ 
                    display:"flex", 
                    gap:16, 
                    padding:"20px 0", 
                    borderBottom:"1px solid var(--br)" 
                  }}
                >
                  <img 
                    src={item.produto.images[0]} 
                    alt="" 
                    style={{ 
                      width:80, 
                      height:80, 
                      objectFit:"cover", 
                      background:"var(--surf)", 
                      flexShrink:0 
                    }} 
                  />
                  <div style={{ 
                    flex:1, 
                    display:"flex", 
                    flexDirection:"column", 
                    gap:4 
                  }}>
                    <p style={{ 
                      fontSize:11, 
                      fontWeight:600, 
                      letterSpacing:"0.1em", 
                      textTransform:"uppercase", 
                      lineHeight:1.4 
                    }}>
                      {item.produto.name}
                    </p>
                    {item.tamanho && (
                      <p style={{ fontSize:11, color:"var(--txm)" }}>
                        Tamanho: {item.tamanho}
                      </p>
                    )}
                    {item.nomeJogador && (
                      <p style={{ fontSize:11, color:"var(--txm)" }}>
                        Jogador: {item.nomeJogador}
                      </p>
                    )}
                    <p style={{ 
                      fontSize:13, 
                      fontWeight:600, 
                      marginTop:4 
                    }}>
                      {fmtPreco(item.produto.price)}
                    </p>
                    <div style={{ 
                      display:"flex", 
                      alignItems:"center", 
                      gap:16, 
                      marginTop:8 
                    }}>
                      <SeletorQtd 
                        valor={item.qtd} 
                        onChange={(q) => atualizarQtd(item.key, q)} 
                      />
                      <button 
                        onClick={() => removerItem(item.key)} 
                        style={{ 
                          fontSize:11, 
                          letterSpacing:"0.08em", 
                          textTransform:"uppercase", 
                          color:"var(--txd)" 
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {itens.length > 0 && (
          <div style={{ 
            padding:"20px 24px 32px", 
            display:"flex", 
            flexDirection:"column", 
            gap:16 
          }}>
            <Divisor />
            <div style={{ 
              display:"flex", 
              justifyContent:"space-between", 
              padding:"16px 0", 
              fontFamily:"var(--fb)", 
              fontSize:13, 
              fontWeight:600, 
              letterSpacing:"0.12em", 
              textTransform:"uppercase" 
            }}>
              <span>SUBTOTAL</span>
              <span>{fmtPreco(total)}</span>
            </div>
            <p style={{ 
              fontSize:12, 
              color:"var(--txm)", 
              textAlign:"center", 
              marginTop:-8 
            }}>
              Frete calculado no checkout
            </p>
            <Btn variant="primary" size="lg" full>
              FINALIZAR COMPRA
            </Btn>
          </div>
        )}
      </aside>
    </>
  );
}

function Divisor() { 
  return <hr style={{ border:"none", borderTop:"1px solid var(--br)" }} />; 
}

function Btn({ children, variant="primary", size="md", onClick, disabled, full }) {
  const base = { 
    display:"inline-flex", 
    alignItems:"center", 
    justifyContent:"center", 
    gap:8, 
    fontFamily:"var(--fb)", 
    fontWeight:600, 
    letterSpacing:"0.08em", 
    textTransform:"uppercase", 
    borderRadius:"var(--r)", 
    transition:"all var(--tr)", 
    cursor:disabled?"not-allowed":"pointer", 
    opacity:disabled?0.4:1, 
    whiteSpace:"nowrap", 
    border:"none", 
    width:full?"100%":"auto" 
  };
  
  const sizes = { 
    sm:{padding:"8px 16px",fontSize:12}, 
    md:{padding:"14px 28px",fontSize:14}, 
    lg:{padding:"18px 40px",fontSize:16} 
  };
  
  const variants = { 
    primary:{background:"var(--tx)",color:"var(--bg)"}, 
    ghost:{background:"transparent",color:"var(--tx)",border:"1px solid var(--brl)"}, 
    accent:{background:"var(--ac)",color:"#ffffff"} 
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      style={{...base,...sizes[size],...variants[variant]}}
    >
      {children}
    </button>
  );
}
