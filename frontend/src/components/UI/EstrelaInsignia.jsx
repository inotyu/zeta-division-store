export default function EstrelaInsignia({ linhas }) {
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
