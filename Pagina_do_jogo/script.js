// ARRAY COM TODOS OS ELEMENTOS
const galeria = [];

for (let i = 0; i < 35; i++) {
  galeria.push('img/bomba.png');
}

for (let i = 0; i < 35; i++) {
  galeria.push('img/Wave.png');
}

for (let i = 0; i < 10; i++) {
  galeria.push('img/Ship-1.png');
}

for (let i = 0; i < 10; i++) {
  galeria.push('img/Ship-2.png');
}

for (let i = 0; i < 10; i++) {
  galeria.push('img/Ship-3.png');
}

document.addEventListener('DOMContentLoaded', () => {
  criartabela();
  configurarEventos();
  exibirRegras();
});

function configurarEventos() {
  const botaoAbrirMenu = document.getElementById('btnAbrirMenu');
  const botaoFecharRegras = document.getElementById('btnFecharRegras');
  const botaoContinuar = document.getElementById('btnContinuar');
  const botaoVoltarMenu = document.getElementById('btnVoltarMenu');

  botaoAbrirMenu.addEventListener('click', menu);
  botaoFecharRegras.addEventListener('click', fecharRegras);
  botaoContinuar.addEventListener('click', fecharMenu);
  botaoVoltarMenu.addEventListener('click', mudarParaMenu);
}

function exibirRegras() {
  const regrasSobreposicao = document.getElementById('regras-sobreposicao');
  regrasSobreposicao.classList.remove('oculto');
  regrasSobreposicao.setAttribute('aria-hidden', 'false');
}

function fecharRegras() {
  const regrasSobreposicao = document.getElementById('regras-sobreposicao');
  regrasSobreposicao.classList.add('oculto');
}

function criartabela() {
  const tabela = document.createElement('table');
  const cenario = document.getElementById('tabuleiro-jogo');
  let contador = 0;

  for (let i = 0; i < 10; i++) {
    const linha = document.createElement('tr');
    tabela.appendChild(linha);

    for (let j = 0; j < 10; j++) {
      const celula = document.createElement('td');
      linha.appendChild(celula);

      const imgSegunda = document.createElement('img');
      imgSegunda.src = galeria[contador];
      contador += 1;
      imgSegunda.classList.add('tile-tras', 'oculto');
      celula.appendChild(imgSegunda);

      const imgPrimeira = document.createElement('img');
      imgPrimeira.src = 'img/Fire-icon.png';
      imgPrimeira.id = `${i}-${j}`;
      imgPrimeira.classList.add('tile-frente');
      imgPrimeira.addEventListener('click', () => {
        imgPrimeira.classList.add('oculto');
        imgSegunda.classList.remove('oculto');
      });
      celula.appendChild(imgPrimeira);
    }
  }

  cenario.appendChild(tabela);
}

function menu() {
  const sobreposicaoMenu = document.getElementById('menu-sobreposicao');
  const botaoMenu = document.getElementById('btnAbrirMenu');
  sobreposicaoMenu.classList.remove('oculto');
  botaoMenu.style.display = 'none';
}

function fecharMenu() {
  const sobreposicaoMenu = document.getElementById('menu-sobreposicao');
  const botaoMenu = document.getElementById('btnAbrirMenu');
  sobreposicaoMenu.classList.add('oculto');
  botaoMenu.style.display = 'block';
}

function mudarParaMenu() {
  window.location.href = '../Menu_jogo/index.html';
}
