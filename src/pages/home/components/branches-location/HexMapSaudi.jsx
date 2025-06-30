import React, { useEffect, useRef } from 'react';

// Configs
const hexSize = 18;
const hexHeight = Math.sqrt(3) * hexSize;
const hexWidth = 2 * hexSize;
const vertSpacing = hexHeight;
const horizSpacing = 1.5 * hexSize;

// Exact shape of Saudi Arabia from image
const saudiHexes = [
  [0, 3], [1, 3], [1, 4], [1, 5],
  [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
  [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
  [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
  [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],
  [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
  [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],
  [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],
  [9, 6], [9, 7], [9, 8], [9, 9],
  [10, 7], [10, 8], [10, 9],
];

// Colored cities
const coloredHexes = [
  { q: 2, r: 2, color: '#3F51B5' }, // top left blue
  { q: 3, r: 1, color: '#2196F3' }, // top middle blue
  { q: 2, r: 3, color: '#00BCD4' }, // dammam
  { q: 1, r: 4, color: '#FF5722' }, // left orange
  { q: 4, r: 6, color: '#FFC107' }, // right yellow
  { q: 3, r: 5, color: '#C62828' }, // middle red
  { q: 5, r: 9, color: '#64B5F6' }, // bottom blue
];

// Dammam highlight hex (same as a colored one)
const dammamHex = { q: 2, r: 3 };

function drawHex(ctx, x, y, size, fillStyle = '#ddd') {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.stroke();
}

const HexMapSaudi = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 450;
    const ctx = canvas.getContext('2d');

    for (let [q, r] of saudiHexes) {
      const x = q * horizSpacing + 30;
      const y = r * vertSpacing + (q % 2) * (vertSpacing / 2) + 30;

      const colored = coloredHexes.find(h => h.q === q && h.r === r);
      const fill = colored ? colored.color : '#E0E0E0';

      drawHex(ctx, x, y, hexSize, fill);

      
    }
  }, []);

  return <canvas ref={canvasRef} className='' style={{  width: '100%' }} />;
};

export default HexMapSaudi;
