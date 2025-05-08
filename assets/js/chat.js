window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    let cols, drops;
    const setup = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      cols = Math.floor(innerWidth / 14);
      drops = Array(cols).fill(1);
    };
    window.addEventListener('resize', setup);
    setup();
  
    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((d, i) => {
        const x = i * 14, y = d * 14;
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillStyle = Math.random() < 0.005 ? '#FFF' : '#0F0';
        ctx.font = (14 + Math.random() * 4) + 'px monospace';
        ctx.fillText(char, x, y);
        drops[i] = y > canvas.height && Math.random() > 0.98 ? 0 : d + 1;
      });
      requestAnimationFrame(draw);
    }
    draw();
  
    let ft;
    window.addEventListener('mousemove', () => {
      canvas.style.opacity = 0.3;
      clearTimeout(ft);
      ft = setTimeout(() => canvas.style.opacity = 1, 2000);
    });
  
    const btns = Array.from(document.querySelectorAll('.links a'));
    const chatBox = document.querySelector('widgetbot');
    function move(b) {
      const t = chatBox.getBoundingClientRect();
      let x, y;
      do {
        x = Math.random() * (innerWidth - b.offsetWidth);
        y = Math.random() * (innerHeight - b.offsetHeight);
      } while (
        x < t.right + 20 && x + b.offsetWidth > t.left - 20 &&
        y < t.bottom + 20 && y + b.offsetHeight > t.top - 20
      );
      b.style.left = `${x}px`;
      b.style.top = `${y}px`;
      setTimeout(() => move(b), 2000 + Math.random() * 2000);
    }
    btns.forEach(move);
  });
  