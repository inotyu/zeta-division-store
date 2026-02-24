import { useState } from "react";
import { fmtPreco } from "../utils/constants";

export default function CardProduto({ produto, onClick }) {
  const [hov, setHov] = useState(false);
  
  return (
    <article 
      onClick={() => onClick(produto)} 
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)}
      style={{ 
        cursor:"pointer", 
        display:"flex", 
        flexDirection:"column", 
        animation:"fadeIn .4s ease both" 
      }}
    >
      <div style={{ 
        position:"relative", 
        background:"var(--surf)", 
        aspectRatio:1, 
        overflow:"hidden", 
        maxHeight:300 
      }}>
        <img 
          src={produto.images[0]} 
          alt={produto.name} 
          style={{ 
            width:"100%", 
            height:"100%", 
            objectFit:"cover", 
            transition:"transform .5s ease", 
            transform:hov?"scale(1.04)":"scale(1)" 
          }} 
        />
        {produto.teamName && (
          <div style={{ 
            position:"absolute", 
            bottom:16, 
            left:"50%", 
            transform:"translateX(-50%)", 
            fontFamily:"var(--fd)", 
            fontSize:15, 
            letterSpacing:"0.12em", 
            color:"var(--bg)", 
            background:"var(--tx)", 
            padding:"2px 12px", 
            whiteSpace:"nowrap" 
          }}>
            {produto.teamName}
          </div>
        )}
        {produto.badge && <EstrelaInsignia linhas={produto.badge.split("\n")} />}
      </div>
      <div style={{ 
        padding:"12px 0 8px", 
        display:"flex", 
        flexDirection:"column", 
        gap:4 
      }}>
        <h3 style={{ 
          fontFamily:"var(--fb)", 
          fontSize:12, 
          fontWeight:600, 
          letterSpacing:"0.12em", 
          textTransform:"uppercase", 
          color:"var(--tx)", 
          lineHeight:1.4, 
          textAlign:"center" 
        }}>
          {produto.name}
        </h3>
        <p style={{ 
          fontFamily:"var(--fb)", 
          fontSize:13, 
          letterSpacing:"0.08em", 
          color:"var(--txm)", 
          textAlign:"center" 
        }}>
          {fmtPreco(produto.price)}
        </p>
      </div>
    </article>
  );
}

function EstrelaInsignia({ linhas }) {
  return (
    <div style={{ 
      position:"absolute", 
      bottom:12, 
      right:12, 
      width:72, 
      height:72, 
      background:"var(--ac)", 
      clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", 
      display:"flex", 
      flexDirection:"column", 
      alignItems:"center", 
      justifyContent:"center", 
      zIndex:2, 
      pointerEvents:"none" 
    }}>
      {linhas.map((l,i) => (
        <span 
          key={i} 
          style={{ 
            fontFamily:"var(--fb)", 
            fontSize:9, 
            fontWeight:700, 
            color:"var(--bg)", 
            lineHeight:1.2, 
            textAlign:"center" 
          }}
        >
          {l}
        </span>
      ))}
    </div>
  );
}
