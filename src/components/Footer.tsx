import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      padding: '2.5rem 0',
      textAlign: 'center',
      background: 'var(--dark-900)',
      borderTop: '1px solid transparent',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Blue gradient border top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)'
      }} />

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        color: 'var(--white-40)',
        letterSpacing: '0.05em',
        margin: 0
      }}>
        © 2025 Sanika Zade
      </p>
    </footer>
  );
};

export default Footer;
