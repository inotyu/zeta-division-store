export default function Btn({ children, variant="primary", size="md", onClick, disabled, full }) {
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
