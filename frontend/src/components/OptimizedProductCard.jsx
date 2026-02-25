import { memo, useMemo, useCallback } from 'react';
import { useCarrinho } from '../../contexts/CarrinhoContext';

const OptimizedProductCard = memo(({ produto, onClick }) => {
  const { adicionarItem } = useCarrinho();
  
  // Memoizar dados do produto
  const produtoMemo = useMemo(() => ({
    id: produto.id,
    name: produto.name,
    price: produto.price,
    images: produto.images,
    badge: produto.badge,
    teamName: produto.teamName,
    material: produto.material,
    previsaoEnvio: produto.previsaoEnvio
  }), [produto]);

  // Memoizar handler de clique
  const handleClick = useCallback(() => {
    onClick(produto);
  }, [produto, onClick]);

  // Lazy loading da imagem principal
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div style={{
      background: 'var(--bg)',
      borderRadius: 'var(--r)',
      overflow: 'hidden',
      transition: 'all var(--tr)',
      cursor: 'pointer'
    }}>
      {/* Skeleton de loading */}
      <div style={{
        position: 'relative',
        aspectRatio: 1,
        overflow: 'hidden',
        maxHeight: 300
      }}>
        {!imageLoaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}>
            <div style={{ color: '#999', fontSize: 12 }}>Carregando...</div>
          </div>
        )}
        
        <img
          src={produto.images[0]}
          alt={produto.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
            opacity: imageLoaded ? 1 : 0
          }}
        />
        
        {/* Badge */}
        {produto.badge && (
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 60,
            height: 60,
            background: 'var(--ac)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 50% 70%, 32% 95%, 18% 98%, 0% 70%, 50% 90%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            {produto.badge.split('\n').map((linha, i) => (
              <span key={i} style={{
                fontFamily: 'var(--fb)',
                fontSize: 8,
                fontWeight: 700,
                color: 'var(--bg)',
                lineHeight: 1.2,
                textAlign: 'center'
              }}>
                {linha}
              </span>
            ))}
          </div>
        )}
        
        {/* Team Name */}
        {produto.teamName && (
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--fd)',
            fontSize: 16,
            letterSpacing: '0.12em',
            color: 'var(--bg)',
            background: 'var(--tx)',
            padding: '4px 16px',
            whiteSpace: 'nowrap',
            zIndex: 2
          }}>
            {produto.teamName}
          </div>
        )}
      </div>

      {/* Conteúdo do Card - Otimizado */}
      <div style={{ 
        padding: '12px 0 8px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 4 
      }}>
        <h3 style={{ 
          fontFamily: 'var(--fb)', 
          fontSize: 14, 
          fontWeight: 600, 
          color: 'var(--tx)', 
          lineHeight: 1.3,
          marginBottom: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%'
        }}>
          {produto.name}
        </h3>
        
        <p style={{ 
          fontSize: 13, 
          color: 'var(--ac)', 
          fontFamily: 'var(--fb)', 
          fontWeight: 600, 
          marginBottom: 8 
        }}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(produto.price)}
        </p>
        
        <p style={{ 
          fontSize: 11, 
          color: 'var(--txm)', 
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {produto.description}
        </p>
      </div>

      {/* Botão de adicionar - Otimizado */}
      <button
        onClick={handleClick}
        style={{
          width: '100%',
          padding: '12px',
          background: 'var(--ac)',
          color: 'var(--bg)',
          border: 'none',
          borderRadius: 'var(--r)',
          fontFamily: 'var(--fb)',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all var(--tr)',
          transform: 'translateZ(0)',
          ':hover': {
            background: '#1e40af',
            transform: 'translateZ(0, -2px)'
          }
        }}
      >
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
});

OptimizedProductCard.displayName = 'OptimizedProductCard';

export default OptimizedProductCard;
