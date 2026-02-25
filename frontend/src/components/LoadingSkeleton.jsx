import { memo } from 'react';

const LoadingSkeleton = memo(({ type = 'card' }) => {
  const skeletons = {
    card: (
      <div style={{
        background: 'var(--bg)',
        borderRadius: 'var(--r)',
        padding: 16,
        marginBottom: 16
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          borderRadius: 'var(--r)',
          height: 200,
          marginBottom: 12,
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          background: 'var(--surf)',
          height: 60,
          borderRadius: 'var(--r)',
          marginBottom: 8
        }} />
        <div style={{
          background: 'var(--surf)',
          height: 20,
          borderRadius: 'var(--r)',
          width: '60%'
        }} />
      </div>
    ),
    
    list: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              borderRadius: 'var(--r)',
              height: 80,
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>
    )
  };

  return skeletons[type] || skeletons.card;
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;
