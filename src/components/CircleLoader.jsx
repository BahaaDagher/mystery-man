import React from 'react';

const CircleLoader = ({ size = 48, color = '#F22E2E', text = 'Loading...', textColor = '#6b7280' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `4px solid #e5e7eb`,
        borderTop: `4px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      {text && (
        <span style={{
          marginTop: '16px',
          color: textColor,
          fontWeight: '500'
        }}>
          {text}
        </span>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CircleLoader; 