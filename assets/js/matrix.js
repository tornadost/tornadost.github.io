window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrixCanvas');
    const ctx    = canvas.getContext('2d');
    let cols, drops;
  
    const setupMatrix = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols  = Math.floor(canvas.width  / 14);
      drops = Array(cols).fill(1);
    };
    window.addEventListener('resize', setupMatrix);
    setupMatrix();
  
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < drops.length; i++) {
        const x    = i * 14;
        const y    = drops[i] * 14;
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillStyle = Math.random() < 0.005 ? '#FFF' : '#0F0';
        ctx.font       = (14 + Math.random() * 4) + 'px monospace';
        ctx.fillText(char, x, y);
        drops[i] = y > canvas.height && Math.random() > 0.98
                   ? 0
                   : drops[i] + 1;
      }
  
      requestAnimationFrame(drawMatrix);
    };
    drawMatrix();
  
    let fadeTimeout;
    window.addEventListener('mousemove', () => {
      canvas.style.opacity = '0.3';
      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(() => {
        canvas.style.opacity = '1';
      }, 2000);
    });
  
    const buttons = Array.from(document.querySelectorAll('.links a'));
    const titleEl = document.querySelector('.glitch');
    const moveButton = btn => {
      const t = titleEl.getBoundingClientRect();
      let x, y;
      do {
        x = Math.random() * (window.innerWidth - btn.offsetWidth);
        y = Math.random() * (window.innerHeight - btn.offsetHeight);
      } while (
        x < t.right + 20 && x + btn.offsetWidth > t.left - 20 &&
        y < t.bottom + 20 && y + btn.offsetHeight > t.top - 20
      );
      btn.style.left = x + 'px';
      btn.style.top  = y + 'px';
      setTimeout(() => moveButton(btn), 2000 + Math.random() * 2000);
    };
    buttons.forEach(moveButton);
  });
  