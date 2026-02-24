import { useState, useEffect, createContext, useContext } from "react";

// ─── DADOS ────────────────────────────────────────────────────────────────────
const produtos = [
  { id: 1, slug: "uniforme-2026-autentico", name: "UNIFORME 2026 AUTÊNTICO", price: 289.90, category: "lancamentos", images: ["https://placehold.co/600x600/111111/ffffff?text=UNIFORME+FRENTE","https://placehold.co/600x600/1a1a1a/cccccc?text=UNIFORME+COSTAS","https://placehold.co/600x600/222222/ffffff?text=UNIFORME+DETALHE"], badge: null, teamName: null, description: "O uniforme oficial autêntico 2026 da Zeta Division. Construção premium em poliéster para máxima performance.", material: "100% Poliéster", periodoCompra: null, previsaoEnvio: "Envio em até 3 dias úteis", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: null },
  { id: 2, slug: "uniforme-2026-team-2xko", name: "UNIFORME 2026 AUTÊNTICO / TEAM 2XKO", price: 329.90, category: "lancamentos", images: ["https://placehold.co/600x600/111111/ffffff?text=2XKO","https://placehold.co/600x600/1a1a1a/cccccc?text=2XKO+COSTAS"], badge: "Nome nas\nCostas", teamName: "2XKO", description: "Uniforme oficial 2026 do TEAM 2XKO com nome do jogador estampado nas costas. Produto sob encomenda — confirme a data de envio antes de comprar.", material: "100% Poliéster", periodoCompra: "Até 01/03/2026 às 23h59", previsaoEnvio: "A partir de 08/04/2026", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: ["2WINz Toshi", "2WINz Haru"] },
  { id: 3, slug: "uniforme-2026-team-brawl-stars", name: "UNIFORME 2026 AUTÊNTICO / TEAM BRAWL STARS", price: 329.90, category: "lancamentos", images: ["https://placehold.co/600x600/111111/ffffff?text=BRAWL+STARS","https://placehold.co/600x600/1a1a1a/cccccc?text=BRAWL+COSTAS"], badge: "Nome nas\nCostas", teamName: "BRAWL STARS", description: "Uniforme oficial 2026 do TEAM BRAWL STARS com nome do jogador nas costas. Produto sob encomenda.", material: "100% Poliéster", periodoCompra: "Até 01/03/2026 às 23h59", previsaoEnvio: "A partir de 08/04/2026", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: ["Jogador A", "Jogador B", "Jogador C"] },
  { id: 4, slug: "uniforme-2026-team-emotorsports", name: "UNIFORME 2026 AUTÊNTICO / TEAM EMOTORSPORTS", price: 329.90, category: "lancamentos", images: ["https://placehold.co/600x600/111111/ffffff?text=EMOTORSPORTS"], badge: "Nome nas\nCostas", teamName: "EMOTORSPORTS", description: "Uniforme oficial 2026 do TEAM EMOTORSPORTS com nome do piloto nas costas.", material: "100% Poliéster", periodoCompra: "Até 01/03/2026 às 23h59", previsaoEnvio: "A partir de 08/04/2026", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: ["Piloto X", "Piloto Y"] },
  { id: 5, slug: "uniforme-2026-team-street-fighter", name: "UNIFORME 2026 AUTÊNTICO / TEAM STREET FIGHTER", price: 329.90, category: "lancamentos", images: ["https://placehold.co/600x600/111111/ffffff?text=STREET+FIGHTER"], badge: "Nome nas\nCostas", teamName: "STREET FIGHTER", description: "Uniforme oficial 2026 do TEAM STREET FIGHTER. Produto sob encomenda.", material: "100% Poliéster", periodoCompra: "Até 01/03/2026 às 23h59", previsaoEnvio: "A partir de 08/04/2026", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: ["Lutador A", "Lutador B"] },
  { id: 6, slug: "uniforme-2026-team-fc", name: "UNIFORME 2026 AUTÊNTICO / TEAM FC", price: 329.90, category: "lancamentos", images: ["https://placehold.co/600x600/111111/ffffff?text=TEAM+FC"], badge: "Nome nas\nCostas", teamName: "FC", description: "Uniforme oficial 2026 do TEAM FC com nome do jogador nas costas.", material: "100% Poliéster", periodoCompra: "Até 01/03/2026 às 23h59", previsaoEnvio: "A partir de 08/04/2026", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: ["Jogador FC 1", "Jogador FC 2"] },
  { id: 7, slug: "camiseta-classica-zeta", name: "CAMISETA CLÁSSICA ZETA", price: 129.90, category: "classicos", images: ["https://placehold.co/600x600/1a1a1a/ffffff?text=CAMISETA+CLASSICA"], badge: null, teamName: null, description: "A camiseta clássica e atemporal da Zeta Division. Blend suave de algodão com logo bordado.", material: "80% Algodão, 20% Poliéster", periodoCompra: null, previsaoEnvio: "Envio em até 3 dias úteis", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: null },
  { id: 8, slug: "moletom-zeta-division", name: "MOLETOM ZETA DIVISION", price: 219.90, category: "classicos", images: ["https://placehold.co/600x600/181818/ffffff?text=MOLETOM"], badge: null, teamName: null, description: "Moletom premium pesado com logo bordado e bolso canguru. O favorito da comunidade gamer.", material: "100% Algodão Pesado", periodoCompra: null, previsaoEnvio: "Envio em até 3 dias úteis", tamanhos: ["P","M","G","GG","XGG"], nomeJogadores: null },
  { id: 9, slug: "bone-zeta-division", name: "BONÉ ZETA DIVISION", price: 99.90, category: "divirta-se", images: ["https://placehold.co/600x600/0a0a0a/ffffff?text=BONE"], badge: null, teamName: null, description: "Boné estruturado de 6 painéis. Tamanho único com ajuste traseiro.", material: "100% Sarja de Algodão", periodoCompra: null, previsaoEnvio: "Envio em até 3 dias úteis", tamanhos: ["ÚNICO"], nomeJogadores: null },
  { id: 10, slug: "mousepad-gamer-pro-xl", name: "MOUSEPAD GAMER PRO XL", price: 79.90, category: "kit-pro", images: ["https://placehold.co/600x600/111111/ffffff?text=MOUSEPAD+XL"], badge: null, teamName: null, description: "Mousepad XL utilizado pelos pros da Zeta Division. Superfície de deslizamento suave e base antiderrapante.", material: "Tecido micro-texturizado + base de borracha", periodoCompra: null, previsaoEnvio: "Envio em até 3 dias úteis", tamanhos: ["XL 900x400mm"], nomeJogadores: null },
];

const CATEGORIAS = [
  { id: "lancamentos", label: "LANÇAMENTOS" },
  { id: "classicos", label: "CLÁSSICOS" },
  { id: "divirta-se", label: "DIVIRTA-SE COM A ZETA" },
  { id: "kit-pro", label: "KIT PRO" },
  { id: "todos", label: "TODOS" },
];

const ITENS_NAV = [
  ...CATEGORIAS,
  { id: "noticias", label: "NOTÍCIAS" },
  { id: "criadores", label: "CRIADORES" },
  { id: "team-idv", label: "TEAM IDV" },
];

const fmtPreco = (p) => p.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
const getPorCategoria = (cat) => cat === "todos" ? produtos : produtos.filter(p => p.category === cat);
const getRelacionados = (produto) => produtos.filter(p => p.id !== produto.id && p.category === produto.category).slice(0, 4);
const PAGINAS_CATALOGO = ["lancamentos","classicos","divirta-se","kit-pro","todos","noticias","criadores","team-idv"];

// ─── CONTEXTO DO CARRINHO ─────────────────────────────────────────────────────
const CarrinhoCtx = createContext(null);
function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [aberto, setAberto] = useState(false);
  const adicionarItem = (produto, tamanho, nomeJogador, qtd = 1) => {
    const key = `${produto.id}-${tamanho}-${nomeJogador || ""}`;
    setItens(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qtd: i.qtd + qtd } : i);
      return [...prev, { key, produto, tamanho, nomeJogador, qtd }];
    });
    setAberto(true);
  };
  const removerItem = (key) => setItens(prev => prev.filter(i => i.key !== key));
  const atualizarQtd = (key, qtd) => {
    if (qtd <= 0) return removerItem(key);
    setItens(prev => prev.map(i => i.key === key ? { ...i, qtd } : i));
  };
  const total = itens.reduce((s, i) => s + i.produto.price * i.qtd, 0);
  const quantidade = itens.reduce((s, i) => s + i.qtd, 0);
  return <CarrinhoCtx.Provider value={{ itens, adicionarItem, removerItem, atualizarQtd, total, quantidade, aberto, setAberto }}>{children}</CarrinhoCtx.Provider>;
}
const useCarrinho = () => useContext(CarrinhoCtx);

// ─── ESTILOS GLOBAIS ──────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
  :root {
    --bg:#0a0a0a; --bg2:#111; --bg3:#1a1a1a; --surf:#151515;
    --br:#2a2a2a; --brl:#333; --tx:#f0f0f0; --txm:#888; --txd:#555;
    --ac:#c8ff00;
    --fd:'Bebas Neue',sans-serif; --fb:'Rajdhani',sans-serif; --fm:'Space Mono',monospace;
    --tr:.2s ease; --mw:1400px; --hh:64px; --r:2px;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--tx);font-family:var(--fb);-webkit-font-smoothing:antialiased;overflow-x:hidden}
  a{color:inherit;text-decoration:none} img{max-width:100%;display:block}
  button{cursor:pointer;border:none;background:none;font-family:inherit}
  ul{list-style:none}
  ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:var(--bg)} ::-webkit-scrollbar-thumb{background:var(--brl)}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideLeft{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
`;

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
function Btn({ children, variant="primary", size="md", onClick, disabled, full }) {
  const base = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"var(--fb)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", borderRadius:"var(--r)", transition:"all var(--tr)", cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.4:1, whiteSpace:"nowrap", border:"none", width:full?"100%":"auto" };
  const sizes = { sm:{padding:"8px 16px",fontSize:12}, md:{padding:"14px 28px",fontSize:14}, lg:{padding:"18px 40px",fontSize:16} };
  const variants = { primary:{background:"var(--tx)",color:"var(--bg)"}, ghost:{background:"transparent",color:"var(--tx)",border:"1px solid var(--brl)"}, accent:{background:"var(--ac)",color:"var(--bg)"} };
  return <button onClick={onClick} disabled={disabled} style={{...base,...sizes[size],...variants[variant]}}>{children}</button>;
}

function EstrelaInsignia({ linhas }) {
  return (
    <div style={{ position:"absolute", bottom:12, right:12, width:72, height:72, background:"var(--ac)", clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:2, pointerEvents:"none" }}>
      {linhas.map((l,i) => <span key={i} style={{ fontFamily:"var(--fb)", fontSize:9, fontWeight:700, color:"var(--bg)", lineHeight:1.2, textAlign:"center" }}>{l}</span>)}
    </div>
  );
}

function SeletorQtd({ valor, onChange }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", border:"1px solid var(--brl)", borderRadius:"var(--r)" }}>
      <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"var(--tx)", background:"transparent", border:"none", cursor:"pointer" }} onClick={() => onChange(Math.max(1,valor-1))}>−</button>
      <span style={{ width:52, textAlign:"center", fontSize:16, fontWeight:600, borderLeft:"1px solid var(--brl)", borderRight:"1px solid var(--brl)", padding:"10px 0" }}>{valor}</span>
      <button style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"var(--tx)", background:"transparent", border:"none", cursor:"pointer" }} onClick={() => onChange(Math.min(99,valor+1))}>+</button>
    </div>
  );
}

function BotaoOpcao({ label, ativo, onClick }) {
  return <button onClick={onClick} style={{ padding:"10px 16px", border:`1px solid ${ativo?"var(--tx)":"var(--brl)"}`, background:ativo?"var(--tx)":"transparent", color:ativo?"var(--bg)":"var(--tx)", fontFamily:"var(--fb)", fontSize:13, fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase", cursor:"pointer", borderRadius:"var(--r)", transition:"all var(--tr)", whiteSpace:"nowrap" }}>{label}</button>;
}

function Divisor() { return <hr style={{ border:"none", borderTop:"1px solid var(--br)" }} />; }
function TituloSecao({ children, centralizado }) {
  return <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(28px,4vw,48px)", letterSpacing:"0.12em", color:"var(--tx)", lineHeight:1, textAlign:centralizado?"center":"left" }}>{children}</h2>;
}

// ─── CARD DE PRODUTO ──────────────────────────────────────────────────────────
function CardProduto({ produto, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <article onClick={() => onClick(produto)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ cursor:"pointer", display:"flex", flexDirection:"column", animation:"fadeIn .4s ease both" }}>
      <div style={{ position:"relative", background:"var(--surf)", aspectRatio:1, overflow:"hidden" }}>
        <img src={produto.images[0]} alt={produto.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease", transform:hov?"scale(1.04)":"scale(1)" }} />
        {produto.teamName && <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", fontFamily:"var(--fd)", fontSize:15, letterSpacing:"0.12em", color:"var(--bg)", background:"var(--tx)", padding:"2px 12px", whiteSpace:"nowrap" }}>{produto.teamName}</div>}
        {produto.badge && <EstrelaInsignia linhas={produto.badge.split("\n")} />}
      </div>
      <div style={{ padding:"16px 0 8px", display:"flex", flexDirection:"column", gap:6 }}>
        <h3 style={{ fontFamily:"var(--fb)", fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--tx)", lineHeight:1.4, textAlign:"center" }}>{produto.name}</h3>
        <p style={{ fontFamily:"var(--fb)", fontSize:13, letterSpacing:"0.08em", color:"var(--txm)", textAlign:"center" }}>{fmtPreco(produto.price)}</p>
      </div>
    </article>
  );
}

// ─── DRAWER DO CARRINHO ───────────────────────────────────────────────────────
function DrawerCarrinho() {
  const { itens, removerItem, atualizarQtd, total, aberto, setAberto } = useCarrinho();
  return (
    <>
      <div onClick={() => setAberto(false)} style={{ position:"fixed", inset:0, zIndex:199, background:"rgba(0,0,0,.6)", opacity:aberto?1:0, pointerEvents:aberto?"all":"none", transition:"opacity .3s ease" }} />
      <aside style={{ position:"fixed", top:0, right:0, bottom:0, zIndex:200, width:"min(420px,100vw)", background:"var(--bg2)", borderLeft:"1px solid var(--br)", display:"flex", flexDirection:"column", transform:aberto?"translateX(0)":"translateX(100%)", transition:"transform .35s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px" }}>
          <h2 style={{ fontFamily:"var(--fd)", fontSize:20, letterSpacing:"0.2em" }}>CARRINHO</h2>
          <button onClick={() => setAberto(false)} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:36, height:36, color:"var(--tx)" }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <Divisor />
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
          {itens.length === 0
            ? <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:200, color:"var(--txm)", fontSize:13, letterSpacing:"0.1em", textTransform:"uppercase" }}>Seu carrinho está vazio.</div>
            : <ul>{itens.map(item => (
                <li key={item.key} style={{ display:"flex", gap:16, padding:"20px 0", borderBottom:"1px solid var(--br)" }}>
                  <img src={item.produto.images[0]} alt="" style={{ width:80, height:80, objectFit:"cover", background:"var(--surf)", flexShrink:0 }} />
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
                    <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", lineHeight:1.4 }}>{item.produto.name}</p>
                    {item.tamanho && <p style={{ fontSize:11, color:"var(--txm)" }}>Tamanho: {item.tamanho}</p>}
                    {item.nomeJogador && <p style={{ fontSize:11, color:"var(--txm)" }}>Jogador: {item.nomeJogador}</p>}
                    <p style={{ fontSize:13, fontWeight:600, marginTop:4 }}>{fmtPreco(item.produto.price)}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:8 }}>
                      <SeletorQtd valor={item.qtd} onChange={(q) => atualizarQtd(item.key, q)} />
                      <button onClick={() => removerItem(item.key)} style={{ fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--txd)" }}>Remover</button>
                    </div>
                  </div>
                </li>
              ))}</ul>
          }
        </div>
        {itens.length > 0 && (
          <div style={{ padding:"20px 24px 32px", display:"flex", flexDirection:"column", gap:16 }}>
            <Divisor />
            <div style={{ display:"flex", justifyContent:"space-between", padding:"16px 0", fontFamily:"var(--fb)", fontSize:13, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              <span>SUBTOTAL</span><span>{fmtPreco(total)}</span>
            </div>
            <p style={{ fontSize:12, color:"var(--txm)", textAlign:"center", marginTop:-8 }}>Frete calculado no checkout</p>
            <Btn variant="primary" size="lg" full>FINALIZAR COMPRA</Btn>
          </div>
        )}
      </aside>
    </>
  );
}

// ─── CABEÇALHO ────────────────────────────────────────────────────────────────
function Cabecalho({ onNav }) {
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
      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrollado?"rgba(10,10,10,0.95)":"var(--bg)", borderBottom:`1px solid ${scrollado?"var(--br)":"transparent"}`, backdropFilter:scrollado?"blur(12px)":"none", transition:"all var(--tr)" }}>
        <div style={{ maxWidth:"var(--mw)", margin:"0 auto", padding:"0 24px", height:"var(--hh)", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative" }}>
          <button onClick={() => setMenuAberto(!menuAberto)} aria-label="Menu" style={{ display:"flex", flexDirection:"column", gap:5, padding:4, zIndex:110 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:24, height:1.5, background:"var(--tx)", transition:"all .3s ease", transformOrigin:"center",
                transform: menuAberto ? (i===0?"translateY(6.5px) rotate(45deg)": i===1?"scaleX(0)":"translateY(-6.5px) rotate(-45deg)") : "none",
                opacity: menuAberto && i===1 ? 0 : 1 }} />
            ))}
          </button>

          <button onClick={() => handleNav("inicio")} style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", fontFamily:"var(--fd)", fontSize:"clamp(13px,2.5vw,19px)", letterSpacing:"0.2em", color:"var(--tx)", whiteSpace:"nowrap" }}>
            ZETA DIVISION STORE
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            <button onClick={() => setBuscaAberta(!buscaAberta)} aria-label="Buscar" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:40, height:40, color:"var(--tx)" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button onClick={() => setAberto(true)} aria-label="Carrinho" style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", width:40, height:40, color:"var(--tx)" }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {quantidade > 0 && <span style={{ position:"absolute", top:4, right:4, width:16, height:16, background:"var(--ac)", color:"var(--bg)", fontSize:10, fontWeight:700, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>{quantidade}</span>}
            </button>
          </div>
        </div>

        {buscaAberta && (
          <div style={{ padding:"0 24px 16px", display:"flex", alignItems:"center", gap:12, borderTop:"1px solid var(--br)", animation:"fadeIn .2s ease" }}>
            <input autoFocus value={buscaQ} onChange={e => setBuscaQ(e.target.value)} placeholder="BUSCAR PRODUTOS..."
              onKeyDown={e => e.key==="Escape" && setBuscaAberta(false)}
              style={{ flex:1, background:"transparent", border:"none", outline:"none", color:"var(--tx)", fontFamily:"var(--fd)", fontSize:22, letterSpacing:"0.15em" }} />
            <button onClick={() => setBuscaAberta(false)} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:36, height:36, color:"var(--tx)" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        )}
      </header>

      {/* Menu Overlay */}
      <div style={{ position:"fixed", inset:0, zIndex:99, background:"rgba(10,10,10,.97)", opacity:menuAberto?1:0, pointerEvents:menuAberto?"all":"none", transition:"opacity .3s ease" }}>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%", padding:"calc(var(--hh) + 40px) 40px 60px" }}>
          <nav style={{ display:"flex", flexDirection:"column" }}>
            {ITENS_NAV.map((item, i) => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                style={{ padding:"20px 0", fontFamily:"var(--fd)", fontSize:"clamp(22px,5vw,34px)", letterSpacing:"0.15em", color:"var(--tx)", background:"transparent", border:"none", borderBottom:"1px solid var(--br)", textAlign:"left", cursor:"pointer", animation:menuAberto?`slideLeft .3s ease ${i*0.06}s both`:"none" }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => handleNav("conta")}
              style={{ padding:"20px 0", fontFamily:"var(--fb)", fontSize:"clamp(16px,3vw,20px)", fontWeight:500, color:"var(--txm)", background:"transparent", border:"none", textAlign:"left", cursor:"pointer", marginTop:20, animation:menuAberto?`slideLeft .3s ease ${ITENS_NAV.length*0.06}s both`:"none" }}>
              Minha Conta
            </button>
          </nav>
          <div style={{ display:"flex", gap:24 }}>
            {["FB","TW","IG","YT","TK"].map(s => <a key={s} href="#" style={{ fontFamily:"var(--fm)", fontSize:11, color:"var(--txm)", letterSpacing:"0.1em" }}>{s}</a>)}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── RODAPÉ ───────────────────────────────────────────────────────────────────
function Rodape({ onNav }) {
  const linksMenu = [...CATEGORIAS, {id:"noticias",label:"NOTÍCIAS"},{id:"criadores",label:"CRIADORES"},{id:"team-idv",label:"TEAM IDV"}];
  const linksGuia = ["Guia de Compras","Política de Privacidade","Termos de Uso","Fale Conosco"];
  const pagamentos = ["AMEX","Apple Pay","Google Pay","JCB","Mastercard","Shop Pay","Visa","Pix","Boleto"];
  return (
    <footer style={{ background:"var(--bg)", borderTop:"1px solid var(--br)", marginTop:100 }}>
      <div style={{ maxWidth:"var(--mw)", margin:"0 auto", padding:"64px 24px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:48, marginBottom:64 }}>
          <div>
            <h4 style={{ fontFamily:"var(--fb)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", color:"var(--txm)", textTransform:"uppercase", marginBottom:20 }}>MENU</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {linksMenu.map(l => <button key={l.id} onClick={() => onNav(l.id)} style={{ fontFamily:"var(--fb)", fontSize:14, color:"var(--txm)", background:"none", border:"none", textAlign:"left", cursor:"pointer", padding:0 }}>{l.label}</button>)}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily:"var(--fb)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", color:"var(--txm)", textTransform:"uppercase", marginBottom:20 }}>GUIA</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {linksGuia.map(l => <a key={l} href="#" style={{ fontFamily:"var(--fb)", fontSize:14, color:"var(--txm)" }}>{l}</a>)}
            </div>
          </div>
          <div style={{ gridColumn:"span 2" }}>
            <h4 style={{ fontFamily:"var(--fb)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", color:"var(--txm)", textTransform:"uppercase", marginBottom:20 }}>SOBRE A ZETA DIVISION®</h4>
            <p style={{ fontSize:13, color:"var(--txm)", lineHeight:1.8, marginBottom:16 }}>ZETA DIVISION® é uma marca de lifestyle gamer sediada em Tóquio, Japão. Ao enriquecer o mundo dos jogadores e descobrir novos criadores, a ZETA DIVISION® busca moldar a cultura da próxima geração.</p>
            <p style={{ fontSize:13, color:"var(--txm)", lineHeight:1.8 }}>Ao criar continuamente novos estilos que transcendem as convenções, avançamos em direção a um futuro onde a cultura gamer é um valor universal.</p>
            <div style={{ display:"flex", gap:20, marginTop:24 }}>
              {["FB","TW","IG","YT","TK"].map(s => <a key={s} href="#" style={{ fontFamily:"var(--fm)", fontSize:11, color:"var(--txm)" }}>{s}</a>)}
            </div>
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--br)", paddingTop:32, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
          <p style={{ fontFamily:"var(--fm)", fontSize:11, color:"var(--txd)", letterSpacing:"0.08em" }}>© ZETA DIVISION STORE</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {pagamentos.map(p => <span key={p} style={{ padding:"4px 8px", border:"1px solid var(--brl)", fontFamily:"var(--fm)", fontSize:9, color:"var(--txd)", borderRadius:2 }}>{p}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PÁGINA INICIAL ───────────────────────────────────────────────────────────
function PaginaInicial({ onProdutoClick, onNav }) {
  const [catAtiva, setCatAtiva] = useState("lancamentos");
  const itens = getPorCategoria(catAtiva);
  return (
    <div>
      <section style={{ position:"relative", minHeight:"calc(100vh - var(--hh))", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", padding:"80px 24px" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,255,0,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,.025) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:28, animation:"fadeIn .8s ease" }}>
          <p style={{ fontFamily:"var(--fm)", fontSize:12, letterSpacing:"0.3em", color:"var(--ac)" }}>COLEÇÃO 2026</p>
          <h1 style={{ fontFamily:"var(--fd)", fontSize:"clamp(72px,18vw,180px)", letterSpacing:"0.05em", lineHeight:.9, color:"var(--tx)" }}>ZETA<br/>DIVISION</h1>
          <p style={{ fontFamily:"var(--fb)", fontSize:13, letterSpacing:"0.2em", color:"var(--txm)", textTransform:"uppercase" }}>Marca de Lifestyle Gamer — Tóquio, Japão</p>
          <Btn variant="accent" size="lg" onClick={() => onNav("todos")}>VER TUDO</Btn>
        </div>
      </section>

      <div style={{ position:"sticky", top:"var(--hh)", zIndex:50, background:"rgba(10,10,10,.95)", backdropFilter:"blur(12px)", borderBottom:"1px solid var(--br)" }}>
        <div style={{ maxWidth:"var(--mw)", margin:"0 auto", padding:"0 24px", display:"flex", overflowX:"auto", scrollbarWidth:"none" }}>
          {CATEGORIAS.map(cat => (
            <button key={cat.id} onClick={() => setCatAtiva(cat.id)} style={{ padding:"16px 20px", fontFamily:"var(--fb)", fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:catAtiva===cat.id?"var(--tx)":"var(--txm)", background:"transparent", border:"none", borderBottom:`2px solid ${catAtiva===cat.id?"var(--ac)":"transparent"}`, cursor:"pointer", whiteSpace:"nowrap", transition:"all var(--tr)" }}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:"var(--mw)", margin:"0 auto", padding:"60px 24px" }}>
        <div style={{ marginBottom:40 }}>
          <TituloSecao>{CATEGORIAS.find(c=>c.id===catAtiva)?.label}</TituloSecao>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:2 }} className="grade-produtos">
          {itens.map((p,i) => <div key={p.id} style={{ animationDelay:`${i*.05}s` }}><CardProduto produto={p} onClick={onProdutoClick} /></div>)}
        </div>
      </div>

      <section style={{ background:"var(--bg3)", borderTop:"1px solid var(--br)", borderBottom:"1px solid var(--br)" }}>
        <div style={{ maxWidth:"var(--mw)", margin:"0 auto", padding:"80px 24px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:20, maxWidth:480 }}>
            <p style={{ fontFamily:"var(--fm)", fontSize:11, letterSpacing:"0.25em", color:"var(--ac)" }}>KIT PRO</p>
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(40px,7vw,72px)", letterSpacing:"0.08em", lineHeight:1 }}>EQUIPAMENTO<br/>DOS PROS</h2>
            <Btn variant="ghost" onClick={() => onNav("kit-pro")}>EXPLORAR KIT PRO</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PÁGINA DE CATÁLOGO ───────────────────────────────────────────────────────
function PaginaCatalogo({ categoriaId, onProdutoClick }) {
  const todasCats = [...CATEGORIAS, {id:"noticias",label:"NOTÍCIAS"},{id:"criadores",label:"CRIADORES"},{id:"team-idv",label:"TEAM IDV"}];
  const cat = todasCats.find(c=>c.id===categoriaId) || { label: categoriaId.toUpperCase() };
  const itens = getPorCategoria(categoriaId);
  return (
    <div style={{ maxWidth:"var(--mw)", margin:"0 auto", padding:"calc(var(--hh) + 48px) 24px 80px", animation:"fadeIn .3s ease" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, marginBottom:48 }}>
        <TituloSecao centralizado>{cat.label}</TituloSecao>
        <p style={{ fontFamily:"var(--fm)", fontSize:11, letterSpacing:"0.15em", color:"var(--txd)", textTransform:"uppercase" }}>{itens.length} produto{itens.length!==1?"s":""}</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:2 }} className="grade-produtos">
        {itens.map((p,i) => <div key={p.id} style={{ animationDelay:`${i*.04}s` }}><CardProduto produto={p} onClick={onProdutoClick} /></div>)}
        {itens.length===0 && <div style={{ gridColumn:"1/-1", textAlign:"center", color:"var(--txm)", padding:"80px 0", fontSize:14, letterSpacing:"0.1em" }}>Nenhum produto nesta categoria.</div>}
      </div>
    </div>
  );
}

// ─── PÁGINA DO PRODUTO ────────────────────────────────────────────────────────
function PaginaProduto({ produto, onVoltar, onProdutoClick }) {
  const [imgSel, setImgSel] = useState(0);
  const [tamSel, setTamSel] = useState(null);
  const [jogSel, setJogSel] = useState(null);
  const [qtd, setQtd] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const { adicionarItem } = useCarrinho();
  const relacionados = getRelacionados(produto);

  const handleAdicionar = () => {
    if (!tamSel) { alert("Por favor, selecione um tamanho."); return; }
    if (produto.nomeJogadores && !jogSel) { alert("Por favor, selecione o nome do jogador."); return; }
    adicionarItem(produto, tamSel, jogSel, qtd);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <div style={{ maxWidth:"var(--mw)", margin:"0 auto", padding:"calc(var(--hh) + 24px) 24px 80px", animation:"fadeIn .3s ease" }}>
      <div style={{ marginBottom:32 }}>
        <button onClick={onVoltar} style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--fb)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--txm)" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          VOLTAR
        </button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:48, marginBottom:80 }} className="layout-produto">
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ position:"relative", aspectRatio:1, background:"var(--surf)", overflow:"hidden" }}>
            <img src={produto.images[imgSel]} alt={produto.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            {produto.teamName && <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", fontFamily:"var(--fd)", fontSize:20, letterSpacing:"0.12em", color:"var(--bg)", background:"var(--tx)", padding:"4px 16px", whiteSpace:"nowrap", zIndex:2 }}>{produto.teamName}</div>}
            {produto.badge && <EstrelaInsignia linhas={produto.badge.split("\n")} />}
            {produto.images.length > 1 && <>
              <button onClick={() => setImgSel(i=>(i-1+produto.images.length)%produto.images.length)} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", width:40, height:40, background:"rgba(10,10,10,.6)", color:"var(--tx)", border:"none", fontSize:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:3 }}>‹</button>
              <button onClick={() => setImgSel(i=>(i+1)%produto.images.length)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:40, height:40, background:"rgba(10,10,10,.6)", color:"var(--tx)", border:"none", fontSize:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:3 }}>›</button>
            </>}
          </div>
          {produto.images.length > 1 && <>
            <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
              {produto.images.map((_,i) => <button key={i} onClick={() => setImgSel(i)} style={{ width:8, height:8, borderRadius:"50%", background:imgSel===i?"var(--tx)":"var(--brl)", border:"none", cursor:"pointer", padding:0, transition:"background var(--tr)" }} />)}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {produto.images.map((img,i) => <button key={i} onClick={() => setImgSel(i)} style={{ width:72, height:72, overflow:"hidden", border:`1px solid ${imgSel===i?"var(--tx)":"var(--br)"}`, cursor:"pointer", background:"none", padding:0 }}><img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} /></button>)}
            </div>
          </>}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <h1 style={{ fontFamily:"var(--fd)", fontSize:"clamp(22px,3vw,32px)", letterSpacing:"0.12em", lineHeight:1.1 }}>{produto.name}</h1>
          <p style={{ fontFamily:"var(--fb)", fontSize:18, letterSpacing:"0.08em", color:"var(--txm)" }}>{fmtPreco(produto.price)}</p>
          <Divisor />

          {produto.periodoCompra && (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <p style={{ fontSize:12, color:"#ff69b4", lineHeight:1.6 }}>※ Este produto é uma pré-venda. Confirme a data de envio antes de comprar.</p>
              <p style={{ fontSize:12, color:"#ff69b4", lineHeight:1.6 }}>※ Produtos com datas de envio diferentes não podem ser comprados no mesmo pedido.</p>
              <p style={{ fontSize:12, color:"var(--ac)", fontWeight:600 }}><span style={{ color:"var(--txm)", fontWeight:400 }}>Período de compra: </span>{produto.periodoCompra}</p>
              <p style={{ fontSize:12, color:"var(--ac)", fontWeight:600 }}><span style={{ color:"var(--txm)", fontWeight:400 }}>Previsão de envio: </span>{produto.previsaoEnvio}</p>
            </div>
          )}

          <p style={{ fontSize:14, lineHeight:1.7, color:"var(--txm)" }}>{produto.description}</p>
          <Divisor />

          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <label style={{ fontFamily:"var(--fb)", fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--txm)" }}>Tamanho:</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {produto.tamanhos.map(t => <BotaoOpcao key={t} label={t} ativo={tamSel===t} onClick={() => setTamSel(t)} />)}
            </div>
          </div>

          {produto.nomeJogadores && (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <label style={{ fontFamily:"var(--fb)", fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--txm)" }}>Nome do Jogador:</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {produto.nomeJogadores.map(j => <BotaoOpcao key={j} label={j} ativo={jogSel===j} onClick={() => setJogSel(j)} />)}
              </div>
            </div>
          )}

          <SeletorQtd valor={qtd} onChange={setQtd} />
          <Btn variant="primary" size="lg" full onClick={handleAdicionar}>{adicionado ? "ADICIONADO AO CARRINHO ✓" : "ADICIONAR AO CARRINHO"}</Btn>

          <div style={{ fontSize:12, color:"var(--txd)" }}>
            <span style={{ color:"var(--txm)" }}>Material: </span>{produto.material}
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section style={{ borderTop:"1px solid var(--br)", paddingTop:60, display:"flex", flexDirection:"column", gap:40 }}>
          <TituloSecao centralizado>VOCÊ TAMBÉM PODE GOSTAR</TituloSecao>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:2 }} className="grade-produtos">
            {relacionados.map(p => <CardProduto key={p.id} produto={p} onClick={onProdutoClick} />)}
          </div>
        </section>
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [pagina, setPagina] = useState({ tipo:"inicio" });

  const navegar = (dest) => {
    window.scrollTo({ top:0, behavior:"smooth" });
    if (dest === "inicio") setPagina({ tipo:"inicio" });
    else if (PAGINAS_CATALOGO.includes(dest)) setPagina({ tipo:"catalogo", categoriaId:dest });
    else if (dest === "conta") setPagina({ tipo:"conta" });
    else setPagina({ tipo:"inicio" });
  };

  const abrirProduto = (produto) => {
    window.scrollTo({ top:0, behavior:"smooth" });
    setPagina({ tipo:"produto", produto });
  };

  return (
    <CarrinhoProvider>
      <style>{css}</style>
      <style>{`
        @media(min-width:640px){.grade-produtos,.layout-produto{grid-template-columns:repeat(3,1fr)!important}}
        @media(min-width:1024px){.grade-produtos{grid-template-columns:repeat(4,1fr)!important}}
        @media(min-width:768px){.layout-produto{grid-template-columns:1fr 1fr!important;gap:64px!important}}
      `}</style>

      <Cabecalho onNav={navegar} />
      <DrawerCarrinho />

      <main>
        {pagina.tipo === "inicio" && <PaginaInicial onProdutoClick={abrirProduto} onNav={navegar} />}
        {pagina.tipo === "catalogo" && <PaginaCatalogo categoriaId={pagina.categoriaId} onProdutoClick={abrirProduto} />}
        {pagina.tipo === "produto" && <PaginaProduto produto={pagina.produto} onVoltar={() => navegar("inicio")} onProdutoClick={abrirProduto} />}
        {pagina.tipo === "conta" && (
          <div style={{ padding:"calc(var(--hh) + 80px) 24px", textAlign:"center", color:"var(--txm)", fontFamily:"var(--fd)", fontSize:32, letterSpacing:"0.15em" }}>
            MINHA CONTA — EM BREVE
          </div>
        )}
      </main>

      <Rodape onNav={navegar} />
    </CarrinhoProvider>
  );
}
