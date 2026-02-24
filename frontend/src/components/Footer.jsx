import { CATEGORIAS } from "../utils/constants";

export default function Rodape({ onNav }) {
  const linksMenu = [...CATEGORIAS, {id:"noticias",label:"NOTÍCIAS"},{id:"criadores",label:"CRIADORES"},{id:"team-idv",label:"TEAM IDV"}];
  const linksGuia = ["Guia de Compras","Política de Privacidade","Termos de Uso","Fale Conosco"];
  const pagamentos = ["AMEX","Apple Pay","Google Pay","JCB","Mastercard","Shop Pay","Visa","Pix","Boleto"];
  
  return (
    <footer style={{ 
      background:"var(--bg)", 
      borderTop:"1px solid var(--br)", 
      marginTop:100 
    }}>
      <div style={{ 
        maxWidth:"var(--mw)", 
        margin:"0 auto", 
        padding:"64px 24px 32px" 
      }}>
        <div style={{ 
          display:"grid", 
          gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", 
          gap:48, 
          marginBottom:64 
        }}>
          <div>
            <h4 style={{ 
              fontFamily:"var(--fb)", 
              fontSize:11, 
              fontWeight:600, 
              letterSpacing:"0.15em", 
              color:"var(--txm)", 
              textTransform:"uppercase", 
              marginBottom:20 
            }}>
              MENU
            </h4>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {linksMenu.map(l => (
                <button 
                  key={l.id} 
                  onClick={() => onNav(l.id)} 
                  style={{ 
                    fontFamily:"var(--fb)", 
                    fontSize:14, 
                    color:"var(--txm)", 
                    background:"none", 
                    border:"none", 
                    textAlign:"left", 
                    cursor:"pointer", 
                    padding:0 
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ 
              fontFamily:"var(--fb)", 
              fontSize:11, 
              fontWeight:600, 
              letterSpacing:"0.15em", 
              color:"var(--txm)", 
              textTransform:"uppercase", 
              marginBottom:20 
            }}>
              GUIA
            </h4>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {linksGuia.map(l => (
                <a 
                  key={l} 
                  href="#" 
                  style={{ 
                    fontFamily:"var(--fb)", 
                    fontSize:14, 
                    color:"var(--txm)" 
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          
          <div style={{ gridColumn:"span 2" }}>
            <h4 style={{ 
              fontFamily:"var(--fb)", 
              fontSize:11, 
              fontWeight:600, 
              letterSpacing:"0.15em", 
              color:"var(--txm)", 
              textTransform:"uppercase", 
              marginBottom:20 
            }}>
              SOBRE A ZETA DIVISION®
            </h4>
            <p style={{ 
              fontSize:13, 
              color:"var(--txm)", 
              lineHeight:1.8, 
              marginBottom:16 
            }}>
              ZETA DIVISION® é uma marca de lifestyle gamer sediada em Tóquio, Japão. Ao enriquecer o mundo dos jogadores e descobrir novos criadores, a ZETA DIVISION® busca moldar a cultura da próxima geração.
            </p>
            <p style={{ 
              fontSize:13, 
              color:"var(--txm)", 
              lineHeight:1.8 
            }}>
              Ao criar continuamente novos estilos que transcendem as convenções, avançamos em direção a um futuro onde a cultura gamer é um valor universal.
            </p>
            <div style={{ display:"flex", gap:20, marginTop:24 }}>
              {["FB","TW","IG","YT","TK"].map(s => (
                <a 
                  key={s} 
                  href="#" 
                  style={{ 
                    fontFamily:"var(--fm)", 
                    fontSize:11, 
                    color:"var(--txm)" 
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop:"1px solid var(--br)", 
          paddingTop:32, 
          display:"flex", 
          justifyContent:"space-between", 
          alignItems:"center", 
          flexWrap:"wrap", 
          gap:20 
        }}>
          <p style={{ 
            fontFamily:"var(--fm)", 
            fontSize:11, 
            color:"var(--txd)", 
            letterSpacing:"0.08em" 
          }}>
            © ZETA DIVISION STORE
          </p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {pagamentos.map(p => (
              <span 
                key={p} 
                style={{ 
                  padding:"4px 8px", 
                  border:"1px solid var(--brl)", 
                  fontFamily:"var(--fm)", 
                  fontSize:9, 
                  color:"var(--txd)", 
                  borderRadius:2 
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
