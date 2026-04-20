const Xy1Pq = document.getElementById('kG7nZ5'),
Vf8Lu = Xy1Pq.getContext('2d');
let Nz2Hj = Math.floor(window.innerWidth/14),
Qw5Zm = Array(Nz2Hj).fill(1);
window.addEventListener('resize', () => {
Xy1Pq.width = window.innerWidth;
Xy1Pq.height = window.innerHeight;
Nz2Hj = Math.floor(Xy1Pq.width/14);
Qw5Zm = Array(Nz2Hj).fill(1);
});
Xy1Pq.width = window.innerWidth;
Xy1Pq.height = window.innerHeight;
(function pN3vX1(){
Vf8Lu.fillStyle = 'rgba(0,0,0,0.07)';
Vf8Lu.fillRect(0,0,Xy1Pq.width,Xy1Pq.height);
for(let i=0; i<Qw5Zm.length; i++){
const x = i*14, y = Qw5Zm[i]*14,
    ch = String.fromCharCode(0x30A0 + Math.random()*96);
Vf8Lu.fillStyle = Math.random()<.005 ? '#FFF' : '#0F0';
Vf8Lu.font = (14 + Math.random()*4) + 'px monospace';
Vf8Lu.fillText(ch, x, y);
Qw5Zm[i] = (y > Xy1Pq.height && Math.random() > .98) ? 0 : Qw5Zm[i] + 1;
}
requestAnimationFrame(pN3vX1);
})();

async function rB7mC2(i){
const alg = atob('U0hBLTI1Ng=='),
  buf = new TextEncoder().encode(i),
  h   = await crypto.subtle.digest(alg, buf);
return Array.from(new Uint8Array(h))
.map(b => b.toString(16).padStart(2,'0')).join('');
}

async function uT5hE9(){
const pwd = document.getElementById('sF2vM3').value.trim(),
  msg = document.getElementById('zX4tK8');
msg.style.color = 'red';
try {
const path = atob('YXNzZXRzL3JlZGFjdGVkLnR4dA=='),
    dest = atob('aHR0cHM6Ly90b3JuYWRvc3QuZ2l0aHViLmlvL2xheWVyL3JlZGFjdGVk'),
    list = (await (await fetch(path)).text())
             .split('\n').map(s=>s.trim()).filter(Boolean),
    h = await rB7mC2(pwd);
msg.textContent = `${h}\nAccess denied`;
if (list.includes(h)) {
document.cookie = "is_logged_in=true; Path=/; Max-Age=3600; Secure; SameSite=Strict";
msg.style.color = 'lime';
msg.textContent = 'Access granted. Redirecting...';
setTimeout(() => window.location.href = dest, 1500);
}
} catch {
msg.textContent = 'Error verifying credentials.';
}
}

(function mO1yL4(){
setInterval(()=>{
const t0 = performance.now(); debugger;
if (performance.now() - t0 > 100)
document.body.innerHTML =
  "<h1 style='color:red;text-align:center;'>what happened?</h1>";
}, 1000);
})();
