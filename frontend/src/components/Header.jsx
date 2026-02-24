import { useState, useEffect } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { ITENS_NAV } from "../utils/constants";

export default function Cabecalho({ onNav }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [buscaQ, setBuscaQ] = useState("");
  const [scrollado, setScrollado] = useState(false);
  const { quantidade, setAberto } = useCarrinho();

  useEffect(() => {
    const h = () => setScrollado(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuAberto]);

  const handleNav = (id) => { onNav(id); setMenuAberto(false); setBuscaAberta(false); };

  return (
    <>
      <header style={{ 
        position:"fixed", 
        top:0, 
        left:0, 
        right:0, 
        zIndex:100, 
        background:scrollado?"rgba(255,255,255,0.95)":"var(--bg)", 
        borderBottom:`1px solid ${scrollado?"var(--br)":"transparent"}`, 
        backdropFilter:scrollado?"blur(12px)":"none", 
        transition:"all var(--tr)" 
      }}>
        <div style={{ 
          maxWidth:"var(--mw)", 
          margin:"0 auto", 
          padding:"0 24px", 
          height:"48px", // Diminuído de var(--hh) para 48px
          display:"flex", 
          alignItems:"center", 
          justifyContent:"space-between", 
          position:"relative" 
        }}>
          <button 
            onClick={() => setMenuAberto(!menuAberto)} 
            aria-label="Menu" 
            style={{ 
              display:"flex", 
              flexDirection:"column", 
              gap:5, 
              padding:4, 
              zIndex:110 
            }}
          >
            {[0,1,2].map(i => (
              <span 
                key={i} 
                style={{ 
                  display:"block", 
                  width:24, 
                  height:1.5, 
                  background:"var(--tx)", 
                  transition:"all .3s ease", 
                  transformOrigin:"center",
                  transform: menuAberto ? (i===0?"translateY(6.5px) rotate(45deg)": i===1?"scaleX(0)":"translateY(-6.5px) rotate(-45deg)") : "none",
                  opacity: menuAberto && i===1 ? 0 : 1 
                }} 
              />
            ))}
          </button>

          <button 
            onClick={() => handleNav("inicio")} 
            style={{ 
              position:"absolute", 
              left:"50%", 
              transform:"translateX(-50%)", 
              fontFamily:"var(--fd)", 
              fontSize:"clamp(13px,2.5vw,19px)", 
              letterSpacing:"0.2em", 
              color:"var(--tx)", 
              whiteSpace:"nowrap" 
            }}
          >
            ZETA DIVISION STORE
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            <button 
              onClick={() => setBuscaAberta(!buscaAberta)} 
              aria-label="Buscar" 
              style={{ 
                display:"flex", 
                alignItems:"center", 
                justifyContent:"center", 
                width:40, 
                height:40, 
                color:"var(--tx)" 
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button 
              onClick={() => setAberto(true)} 
              aria-label="Carrinho" 
              style={{ 
                position:"relative", 
                display:"flex", 
                alignItems:"center", 
                justifyContent:"center", 
                width:40, 
                height:40, 
                color:"var(--tx)" 
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {quantidade > 0 && (
                <span style={{ 
                  position:"absolute", 
                  top:4, 
                  right:4, 
                  width:16, 
                  height:16, 
                  background:"var(--ac)", 
                  color:"var(--bg)", 
                  fontSize:10, 
                  fontWeight:700, 
                  borderRadius:"50%", 
                  display:"flex", 
                  alignItems:"center", 
                  justifyContent:"center" 
                }}>
                  {quantidade}
                </span>
              )}
            </button>
          </div>
        </div>

        {buscaAberta && (
          <div style={{ 
            padding:"0 24px 16px", 
            display:"flex", 
            alignItems:"center", 
            gap:12, 
            borderTop:"1px solid var(--br)", 
            animation:"fadeIn .2s ease" 
          }}>
            <input 
              autoFocus 
              value={buscaQ} 
              onChange={e => setBuscaQ(e.target.value)} 
              placeholder="BUSCAR PRODUTOS..."
              onKeyDown={e => e.key==="Escape" && setBuscaAberta(false)}
              style={{ 
                flex:1, 
                background:"transparent", 
                border:"none", 
                outline:"none", 
                color:"var(--tx)", 
                fontFamily:"var(--fd)", 
                fontSize:22, 
                letterSpacing:"0.15em" 
              }} 
            />
            <button 
              onClick={() => setBuscaAberta(false)} 
              style={{ 
                display:"flex", 
                alignItems:"center", 
                justifyContent:"center", 
                width:36, 
                height:36, 
                color:"var(--tx)" 
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        )}
      </header>

      {/* Menu Overlay */}
      <div style={{ 
        position:"fixed", 
        inset:0, 
        zIndex:99, 
        background:"rgba(255,255,255,.97)", 
        opacity:menuAberto?1:0, 
        pointerEvents:menuAberto?"all":"none", 
        transition:"opacity .3s ease" 
      }}>
        <div style={{ 
          display:"flex", 
          flexDirection:"column", 
          justifyContent:"space-between", 
          height:"100%", 
          padding:"calc(var(--hh) + 40px) 40px 60px" 
        }}>
          <nav style={{ display:"flex", flexDirection:"column" }}>
            {ITENS_NAV.map((item, i) => (
              <button 
                key={item.id} 
                onClick={() => handleNav(item.id)}
                style={{ 
                  padding:"20px 0", 
                  fontFamily:"var(--fd)", 
                  fontSize:"clamp(22px,5vw,34px)", 
                  letterSpacing:"0.15em", 
                  color:"var(--tx)", 
                  background:"transparent", 
                  border:"none", 
                  borderBottom:"1px solid var(--br)", 
                  textAlign:"left", 
                  cursor:"pointer", 
                  animation:menuAberto?`slideLeft .3s ease ${i*0.06}s both`:"none" 
                }}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNav("conta")}
              style={{ 
                padding:"20px 0", 
                fontFamily:"var(--fb)", 
                fontSize:"clamp(16px,3vw,20px)", 
                fontWeight:500, 
                color:"var(--txm)", 
                background:"transparent", 
                border:"none", 
                textAlign:"left", 
                cursor:"pointer", 
                marginTop:20, 
                animation:menuAberto?`slideLeft .3s ease ${ITENS_NAV.length*0.06}s both`:"none" 
              }}
            >
              Minha Conta
            </button>
          </nav>
          <div style={{ display:"flex", gap:24 }}>
            {["FB","TW","IG","YT","TK"].map(s => (
              <a 
                key={s} 
                href="#" 
                style={{ 
                  fontFamily:"var(--fm)", 
                  fontSize:11, 
                  color:"var(--txm)", 
                  letterSpacing:"0.1em" 
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
