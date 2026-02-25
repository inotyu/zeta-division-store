import { useState } from "react";
import { CATEGORIAS, getPorCategoria } from "../../utils/constants";
import ProductCard from "../ProductCard";
import Btn from "../UI/Button";

export default function PaginaInicial({ onProdutoClick, onNav, catAtiva, setCatAtiva }) {
  const itens = getPorCategoria(catAtiva);
  
  return (
    <div>
      <section style={{ 
        position:"relative", 
        minHeight:"calc(100vh - var(--hh))", 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center", 
        overflow:"hidden", 
        padding:"80px 24px" 
      }}>
        <div style={{ 
          position:"absolute", 
          inset:0, 
          backgroundImage:"linear-gradient(rgba(200,255,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,.025) 1px,transparent 1px)", 
          backgroundSize:"60px 60px" 
        }} />
        <div style={{ 
          position:"relative", 
          zIndex:1, 
          display:"flex", 
          flexDirection:"column", 
          alignItems:"center", 
          textAlign:"center", 
          gap:28, 
          animation:"fadeIn .8s ease" 
        }}>
          <p style={{ 
            fontFamily:"var(--fm)", 
            fontSize:12, 
            letterSpacing:"0.3em", 
            color:"var(--ac)" 
          }}>
            COLEÇÃO 2026
          </p>
          <h1 style={{ 
            fontFamily:"var(--fd)", 
            fontSize:"clamp(72px,18vw,180px)", 
            letterSpacing:"0.05em", 
            lineHeight:.9, 
            color:"var(--tx)" 
          }}>
            ZETA<br/>DIVISION
          </h1>
          <p style={{ 
            fontFamily:"var(--fb)", 
            fontSize:13, 
            letterSpacing:"0.2em", 
            color:"var(--txm)", 
            textTransform:"uppercase" 
          }}>
            Marca de Lifestyle Gamer — Tóquio, Japão
          </p>
          <Btn 
            size="lg" 
            onClick={() => onNav("todos")}
            style={{
              background: '#ffffff',
              color: '#1a1a1a',
              border: '1px solid #e0e0e0'
            }}
          >
            VER TUDO
          </Btn>
        </div>
      </section>

      <div style={{ 
        position:"sticky", 
        paddingTop: "calc(48px + 100px)", 
        zIndex:50, 
        background:"rgba(255,255,255,.95)", 
        backdropFilter:"blur(12px)", 
        borderBottom:"1px solid var(--br)" 
      }}>
        <div style={{ 
          maxWidth:"var(--mw)", 
          margin:"0 auto", 
          padding:"0 24px", 
          display:"flex", 
          overflowX:"auto", 
          scrollbarWidth:"none" 
        }}>
          {CATEGORIAS.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => setCatAtiva(cat.id)} 
              style={{ 
                padding:"16px 20px", 
                fontFamily:"var(--fb)", 
                fontSize:12, 
                fontWeight:600, 
                letterSpacing:"0.12em", 
                textTransform:"uppercase", 
                color:catAtiva===cat.id?"var(--tx)":"var(--txm)", 
                background:"transparent", 
                border:"none", 
                borderBottom:`2px solid ${catAtiva===cat.id?"var(--ac)":"transparent"}`, 
                cursor:"pointer", 
                whiteSpace:"nowrap", 
                transition:"all var(--tr)" 
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ 
        maxWidth:"var(--mw)", 
        margin:"0 auto", 
        padding:"60px 24px" 
      }}>
        <div style={{ marginBottom:40 }}>
          <h2 style={{ 
            fontFamily:"var(--fd)", 
            fontSize:"clamp(28px,4vw,48px)", 
            letterSpacing:"0.12em", 
            color:"var(--tx)", 
            lineHeight:1 
          }}>
            {CATEGORIAS.find(c=>c.id===catAtiva)?.label}
          </h2>
        </div>
        <div style={{ 
          display:"grid", 
          gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", 
          gap:16 
        }} className="grade-produtos">
          {itens.map((p,i) => (
            <div 
              key={p.id} 
              style={{ animationDelay:`${i*.05}s` }}
            >
              <ProductCard produto={p} onClick={onProdutoClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
