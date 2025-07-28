// Bolha cursor
const bolha = document.querySelector('.bolha');
if (bolha) {
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0, scale = 1, growing = true;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animarBolha() {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    if (growing) { scale += 0.005; if (scale >= 1.2) growing = false; }
    else { scale -= 0.005; if (scale <= 0.9) growing = true; }
    bolha.style.transform = `translate(${posX - 15}px, ${posY - 15}px) scale(${scale})`;
    requestAnimationFrame(animarBolha);
  }
  animarBolha();
}

// Carrossel 3 cards visíveis, arraste, loop infinito sem repetir cards

const carrossel = document.getElementById('carrosselProjetos');
const totalCards = carrossel.children.length;
let cardsPorTela = window.innerWidth < 768 ? 1 : 3;
let index = 0;

function atualizarCarrossel() {
  const larguraCard = carrossel.children[0].offsetWidth + 20; // largura do card + gap (20px)
  carrossel.style.transition = 'transform 0.5s ease';
  carrossel.style.transform = `translateX(-${index * larguraCard}px)`;
}

function corrigirIndice() {
  if (index < 0) index = 0;
  if (index > totalCards - cardsPorTela) index = 0;
}

// Drag
let startX;
let isDown = false;

carrossel.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX;
});

carrossel.addEventListener('mouseup', e => {
  if (!isDown) return;
  isDown = false;
  const diff = e.pageX - startX;
  if (diff < -50) index++;
  else if (diff > 50) index--;
  corrigirIndice();
  atualizarCarrossel();
});

carrossel.addEventListener('mouseleave', () => {
  isDown = false;
});

carrossel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

carrossel.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff < -50) index++;
  else if (diff > 50) index--;
  corrigirIndice();
  atualizarCarrossel();
});

window.addEventListener('resize', () => {
  cardsPorTela = window.innerWidth < 768 ? 1 : 3;
  corrigirIndice();
  atualizarCarrossel();
});

// Inicializa posição
atualizarCarrossel();
