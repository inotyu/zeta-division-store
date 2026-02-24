export default function SeletorQtd({ valor, onChange }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", border:"1px solid var(--brl)", borderRadius:"var(--r)" }}>
      <button 
        style={{ 
          width:44, 
          height:44, 
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center", 
          fontSize:20, 
          color:"var(--tx)", 
          background:"transparent", 
          border:"none", 
          cursor:"pointer" 
        }} 
        onClick={() => onChange(Math.max(1,valor-1))}
      >
        −
      </button>
      <span style={{ 
        width:52, 
        textAlign:"center", 
        fontSize:16, 
        fontWeight:600, 
        borderLeft:"1px solid var(--brl)", 
        borderRight:"1px solid var(--brl)", 
        padding:"10px 0" 
      }}>
        {valor}
      </span>
      <button 
        style={{ 
          width:44, 
          height:44, 
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center", 
          fontSize:20, 
          color:"var(--tx)", 
          background:"transparent", 
          border:"none", 
          cursor:"pointer" 
        }} 
        onClick={() => onChange(Math.min(99,valor+1))}
      >
        +
      </button>
    </div>
  );
}
