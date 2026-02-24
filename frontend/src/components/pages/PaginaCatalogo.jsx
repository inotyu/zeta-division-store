import { CATEGORIAS, getPorCategoria } from "../../utils/constants";
import ProductCard from "../ProductCard";

export default function PaginaCatalogo({ categoriaId, onProdutoClick }) {
  const todasCats = [...CATEGORIAS, {id:"noticias",label:"NOTÍCIAS"},{id:"criadores",label:"CRIADORES"},{id:"team-idv",label:"TEAM IDV"}];
  const cat = todasCats.find(c=>c.id===categoriaId) || { label: categoriaId.toUpperCase() };
  const itens = getPorCategoria(categoriaId);
  
  return (
    <div style={{ 
      paddingTop: "calc(48px + 100px)", // Header menor (48px) + espaço
      maxWidth:"var(--mw)", 
      margin:"0 auto", 
      padding:"0 24px 80px", 
      animation:"fadeIn .3s ease" 
    }}>
      <div style={{ 
        display:"flex", 
        flexDirection:"column", 
        alignItems:"center", 
        gap:12, 
        marginBottom:48 
      }}>
        <h2 style={{ 
          fontFamily:"var(--fd)", 
          fontSize:"clamp(28px,4vw,48px)", 
          letterSpacing:"0.12em", 
          color:"var(--tx)", 
          lineHeight:1, 
          textAlign:"center" 
        }}>
          {cat.label}
        </h2>
        <p style={{ 
          fontFamily:"var(--fm)", 
          fontSize:11, 
          letterSpacing:"0.15em", 
          color:"var(--txd)", 
          textTransform:"uppercase" 
        }}>
          {itens.length} produto{itens.length!==1?"s":""}
        </p>
      </div>
      <div style={{ 
        display:"grid", 
        gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", 
        gap:16 
      }} className="grade-produtos">
        {itens.map((p,i) => (
          <div 
            key={p.id} 
            style={{ animationDelay:`${i*.04}s` }}
          >
            <ProductCard produto={p} onClick={onProdutoClick} />
          </div>
        ))}
        {itens.length===0 && (
          <div style={{ 
            gridColumn:"1/-1", 
            textAlign:"center", 
            color:"var(--txm)", 
            padding:"80px 0", 
            fontSize:14, 
            letterSpacing:"0.1em" 
          }}>
            Nenhum produto nesta categoria.
          </div>
        )}
      </div>
    </div>
  );
}
