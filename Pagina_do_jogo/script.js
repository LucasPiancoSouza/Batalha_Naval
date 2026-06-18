// ARRAY COM TODOS OS ELEMENTOS
const galeria = [];
let contadorJogadas = 0;

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

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

embaralhar(galeria);

document.addEventListener('DOMContentLoaded', () => {
  criarTabela();
  configurarEventos();
  exibirRegras();
});

function configurarEventos() {
  const botaoAbrirMenu = document.getElementById('btnAbrirMenu');
  const botaoFecharRegras = document.getElementById('btnFecharRegras');
  const botaoContinuar = document.getElementById('btnContinuar');
  const botaoVoltarMenu = document.getElementById('btnVoltarMenu');
  const botaoResetar = document.getElementById('btn-resetar');

  botaoAbrirMenu.addEventListener('click', abrirMenu);
  botaoFecharRegras.addEventListener('click', fecharRegras);
  botaoContinuar.addEventListener('click', fecharMenu);
  botaoVoltarMenu.addEventListener('click', mudarParaMenu);
  botaoResetar.addEventListener('click', resetarJogo);
}

function resetarJogo() {
  const tabuleiro = document.getElementById('tabuleiro-jogo');
  tabuleiro.innerText = '';
  embaralhar(galeria);
  criarTabela();

  contadorJogadas = 0;
  const elementoJogadas = document.getElementById('jogadas');
  elementoJogadas.innerText = 'Jogadas: ' + contadorJogadas;
}

function exibirRegras() {
  const regras = document.getElementById('regras');
  regras.style.display = 'flex';
}

function fecharRegras() {
  const regras = document.getElementById('regras');
  regras.style.display = 'none';
}

function criarTabela() {
  const tabela = document.createElement('table');
  const cenario = document.getElementById('tabuleiro-jogo');
  let contador = 0;

  for (let i = 0; i < 10; i++) {
    const linha = document.createElement('tr');
    tabela.appendChild(linha);

    for (let j = 0; j < 10; j++) {
      const celula = document.createElement('td');
      linha.appendChild(celula);

      const imagemVerso = document.createElement('img');
      imagemVerso.src = galeria[contador];
      imagemVerso.id = `${i}-${j}`;
      contador += 1;
      imagemVerso.style.display = 'none';
      imagemVerso.classList.add('carta-verso');
      celula.appendChild(imagemVerso);

      const imagemFrente = document.createElement('img');
      imagemFrente.src = 'img/Fire-icon.png';
      imagemFrente.id = `${i}-${j}`;
      imagemFrente.classList.add('carta-frente');
      imagemFrente.addEventListener('click', () => {
        imagemFrente.style.display = 'none';
        imagemVerso.style.display = 'block';

        contadorJogadas += 1;
        const elementoJogadas = document.getElementById('jogadas');
        elementoJogadas.innerText = 'Jogadas: ' + contadorJogadas;
      });
      celula.appendChild(imagemFrente);
    }
  }

  cenario.appendChild(tabela);
}

function abrirMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'flex';
}

function fecharMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
}

function mudarParaMenu() {
  window.location.href = '../Menu_jogo/index.html';
}
