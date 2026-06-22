// 1. Pegar a dificuldade guardada no localStorage (se não houver, define 'Médio' como padrão)
let dificuldade = localStorage.getItem("dificuldade") || "Médio";
console.log("Dificuldade selecionada:", dificuldade);
let jogador = localStorage.getItem("nome") || "Recruta";

document.getElementById("jogador").innerText = "Pirata " + jogador;

// 2. Configuração de dificuldades
const CONFIG_DIFICULDADE = {
  Fácil: {
    bombas: { min: 20, max: 30 },
    barcos: { min: 25, max: 45 },
    vidas: 4
  },
  Médio: {
    bombas: { min: 35, max: 40 },
    barcos: { min: 20, max: 35 }, 
    vidas: 3
  },
  Difícil: {
    bombas: { min: 40, max: 50 },
    barcos: { min: 15, max: 25 },
    vidas: 2
  }
};

// Variáveis globais do jogo
let galeria = [];
let qtd_barcos = 0;
let qtd_bombas = 0;
let qtd_aguas = 0;
let contadorJogadas = 0;
let pontuacao = 0;
let vidasRestantes = 0;
let vidasMaquina = 0;
let jogoAtivo = true;
let maquinaPensando = false;

const modoEscolhido = localStorage.getItem("modoJogo") || "";
const valorMaquina = localStorage.getItem("Maquina") || "";
const valorSolo = localStorage.getItem("Solo") || "";

if (valorMaquina === "Maquina") {
  let id_jogo = document.getElementById("Maquina");
  if (id_jogo) id_jogo.style.display = "flex";
}

let modoJogo = "Solo";
if (modoEscolhido === "maquina" || valorMaquina === "Maquina") {
  modoJogo = "Maquina";
} else if (modoEscolhido === "solo" || valorSolo === "Solo") {
  modoJogo = "Solo";
}

let pontuacaoMaquina = 0;
let contadorJogadasMaquina = 0;
let jogadasMaquina = [];

// 3. Função para sortear a quantidade dentro do intervalo
function sortearQuantidade(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 4. Montar o array baseado na dificuldade
function prepararGaleria() {
  galeria = []; 

  const config = CONFIG_DIFICULDADE[dificuldade];
  const totalBombas = sortearQuantidade(config.bombas.min, config.bombas.max);
  const totalBarcos = sortearQuantidade(config.barcos.min, config.barcos.max);
  const totalAguas = 100 - (totalBombas + totalBarcos);

  for (let i = 0; i < totalBombas; i++) galeria.push("bomba");
  for (let i = 0; i < totalBarcos; i++) galeria.push("barco");
  for (let i = 0; i < totalAguas; i++) galeria.push("agua");

  console.log(`Partida Iniciada! Bombas: ${totalBombas} | Barcos: ${totalBarcos} | Água: ${totalAguas}`);
  
  embaralhar(galeria);
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', () => {
  preparparPartida(); 
  configurarEventos();
  exibirRegras();
});

function preparparPartida() {
  prepararGaleria(); 
  criarTabela();     
}

function configurarEventos() {
  const botaoAbrirMenu = document.getElementById('btnAbrirMenu');
  const botaoFecharRegras = document.getElementById('btnFecharRegras');
  const botaoContinuar = document.getElementById('btnContinuar');
  const botaoVoltarMenu = document.getElementById('btnVoltarMenu');
  const botaoResetar = document.getElementById('btn-resetar');
  const botaoResetarderrota = document.getElementById('btn-resetar_Dr');
  const botaoResetarvitoria = document.getElementById('btn-resetar_Vi');

  if (botaoAbrirMenu) botaoAbrirMenu.addEventListener('click', abrirMenu);
  if (botaoFecharRegras) botaoFecharRegras.addEventListener('click', fecharRegras);
  if (botaoContinuar) botaoContinuar.addEventListener('click', fecharMenu);
  if (botaoVoltarMenu) botaoVoltarMenu.addEventListener('click', mudarParaMenu);
  if (botaoResetar) botaoResetar.addEventListener('click', resetarJogo);
  if (botaoResetarderrota) botaoResetarderrota.addEventListener('click', resetarJogo_D);
  if (botaoResetarvitoria) botaoResetarvitoria.addEventListener('click', resetarJogo_V);
}

function resetarJogo() {
  jogoAtivo = true;
  maquinaPensando = false;
  const tablero = document.getElementById('tabuleiro-jogo');
  if (tablero) {
    tablero.classList.remove('bloqueado');
    tablero.innerText = '';
  }
  
  preparparPartida();

  contadorJogadas = 0;
  document.getElementById('jogadas').innerText = 'Jogadas: ' + contadorJogadas;
  pontuacao = 0;

  pontuacaoMaquina = 0;
  contadorJogadasMaquina = 0;
  jogadasMaquina = [];

  const pontMaquina = document.getElementById("pontuacaoMaquina");
  if (pontMaquina) pontMaquina.innerText = "Pontuação: 0";

  const jogMaquina = document.getElementById("jogadasMaquina");
  if (jogMaquina) jogMaquina.innerText = "Jogadas: 0";

  let id_pontuacao = document.getElementById("pontuacao");
  if (id_pontuacao) id_pontuacao.innerText = "Pontuação: " + pontuacao;

  totalSegundos = 0;
  let id_tempo = document.getElementById("tempo");
  if (id_tempo) id_tempo.innerText = "Tempo: 0:00";

  temporizador();
  somDerrota.pause();
  somDerrota.currentTime = 0;
  somVitoria.pause();
  somVitoria.currentTime = 0;
  musica.pause();
  musica.currentTime = 0;
  somTensao.pause();
  somTensao.currentTime = 0;

  if (dificuldade === "Difícil") {
    somTensao.play();
  } else {
    musica.play();
  }
}

function exibirRegras() {
  const regras = document.getElementById('regras');
  if (regras) {
    regras.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

const musica = new Audio("Som/piratesom.mp3");
musica.loop = true;
const somDerrota = new Audio("Som/defeat_sound.mp3");
const somVitoria = new Audio("Som/vitoria_sound.wav");
const somTensao = new Audio("Som/musica_tensao1.mp3");
somTensao.loop = true;

function fecharRegras() {
  const regras = document.getElementById('regras');
  if (regras) {
    regras.style.display = 'none';
    document.body.style.overflow = '';
  }
  temporizador();
  if (dificuldade === "Difícil") {
    somTensao.play();
  } else {
    musica.play();
  }
}

// 5. Função criarTabela ATUALIZADA com as novas variáveis de imagem (.gif)
function criarTabela() {
  qtd_bombas = 0;
  qtd_barcos = 0;
  qtd_aguas = 0;
  
  const tabela = document.createElement('table');
  const cenario = document.getElementById('tabuleiro-jogo');
  cenario.innerHTML = '';

  const config = CONFIG_DIFICULDADE[dificuldade];
  vidasRestantes = config.vidas;
  vidasMaquina = config.vidas;

  let id_vidas = document.getElementById("vidas");
  if (id_vidas) {
    id_vidas.innerText = "";
    for (let i = 0; i < vidasRestantes; i++) {
      let img_vidas = document.createElement("img");
      img_vidas.className = "coracoes";
      img_vidas.src = "img/vidas.png";
      img_vidas.id = "vida-" + i;
      id_vidas.appendChild(img_vidas);
    }
  }

  let id_vidas_maquina = document.getElementById("vidasMaquina");
  if (id_vidas_maquina) {
    id_vidas_maquina.innerText = "";
    for (let i = 0; i < vidasMaquina; i++) {
      let imgVida = document.createElement("img");
      imgVida.className = "coracoes";
      imgVida.src = "img/vidas.png";
      imgVida.id = "vidaMaquina-" + i;
      id_vidas_maquina.appendChild(imgVida);
    }
  }

  for (let i = 0; i < 10; i++) {
    const linha = document.createElement('tr');
    tabela.appendChild(linha);

    for (let j = 0; j < 10; j++) {
      const celula = document.createElement('td');
      linha.appendChild(celula);
      
      let indiceAssegurado = (i * 10) + j;
      let tipoItem = galeria[indiceAssegurado];

      const imagemVerso = document.createElement('img');
      imagemVerso.style.display = "none"; 
      imagemVerso.id = `verso-${i}-${j}`;

      // AQUI: Atribuição dos novos nomes de gifs fornecidos nas imagens
      if (tipoItem === "bomba") {
          imagemVerso.src = 'img/bomb_gif.gif'; 
          qtd_bombas++;
      } else if (tipoItem === "barco") {
          imagemVerso.src = 'img/barco_gif.gif'; 
          qtd_barcos++;
      } else {
          imagemVerso.src = 'img/wave_gif.gif'; 
          qtd_aguas++;
      }

      const imagemFrente = document.createElement('img');
      imagemFrente.src = 'img/Fire-icon.png';
      imagemFrente.id = `frente-${i}-${j}`; 
      imagemFrente.classList.add('carta-frente');

      imagemFrente.addEventListener('click', () => {
        if (!jogoAtivo || maquinaPensando) return;

        imagemFrente.style.display = 'none';
        imagemVerso.style.display = 'block';

        if (galeria[indiceAssegurado] == "bomba"){
          qtd_bombas -= 1;
          document.getElementById("bombas").innerText = "Bombas: " + qtd_bombas;
          if (pontuacao >= 10) {
              pontuacao -= 10;
              document.getElementById("pontuacao").innerText = "Pontuação: " + pontuacao; 
          }
          if (vidasRestantes > 0) {
            vidasRestantes--;
            let id_img_vidas = document.getElementById("vida-" + vidasRestantes);
            if (id_img_vidas) id_img_vidas.style.display = 'none';
            alert("Perdeu uma vida, só restam: " + vidasRestantes);
            if (vidasRestantes == 0 ) {
              encerrarPartida();
              mostrarDerrota();
            }
          }
        } else if (galeria[indiceAssegurado] == "barco") {
          pontuacao += 10;
          document.getElementById("pontuacao").innerText = "Pontuação: " + pontuacao;
          qtd_barcos -= 1;
          document.getElementById("barcos").innerText = "Barcos: " + qtd_barcos;

          if (pontuacao == 100 ) {
            pararTemporizador();
            musica.pause();
            somTensao.pause();
            somVitoria.play();
            mostrarVitoria();
          }
        } else {
          qtd_aguas -= 1;
          document.getElementById("agua").innerText = "Águas: " + qtd_aguas;
        }
        
        contadorJogadas += 1;
        document.getElementById('jogadas').innerText = 'Jogadas: ' + contadorJogadas;

        if (modoJogo === "Maquina" && jogoAtivo) {
          maquinaPensando = true;
          const chessboard = document.getElementById('tabuleiro-jogo');
          if (chessboard) chessboard.classList.add('bloqueado');

          setTimeout(() => {
              if (jogoAtivo) {
                jogadaMaquina();
              }
          }, 1000);
        }
      });
        
      celula.appendChild(imagemVerso);
      celula.appendChild(imagemFrente);
    }
  }
  
  document.getElementById("bombas").innerText = "Bombas: " + qtd_bombas;
  document.getElementById("agua").innerText = "Águas: " + qtd_aguas;
  document.getElementById("barcos").innerText = "Barcos: " + qtd_barcos;
  cenario.appendChild(tabela);
}

function abrirMenu() {
  const menu = document.getElementById('menu');
  if (menu) menu.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  pararTemporizador();
}

function fecharMenu() {
  const menu = document.getElementById('menu');
  if (menu) menu.style.display = 'none';
  document.body.style.overflow = '';
  temporizador();
}

function mudarParaMenu() {
  window.location.href = '../Menu_jogo/index.html';
}

let totalSegundos = 0;
let meuIntervalo;

function pararTemporizador() {
  clearInterval(meuIntervalo);
  meuIntervalo = null;
}

function encerrarPartida() {
  if (!jogoAtivo) return;
  jogoAtivo = false;
  pararTemporizador();
  musica.pause();
  musica.currentTime = 0;
  somTensao.pause();
  somTensao.currentTime = 0;
  somDerrota.currentTime = 0;
  somDerrota.play();
}

function temporizador() {
  pararTemporizador();
  meuIntervalo = setInterval(() => {
    totalSegundos++;
    let minutos = Math.floor(totalSegundos / 60);
    let segundos = totalSegundos % 60;
    if (segundos < 10) segundos = "0" + segundos;
    
    let elTempo = document.getElementById("tempo");
    if (elTempo) elTempo.innerText = "Tempo: " + minutos + ":" + segundos;
  }, 1000);
}

somTensao.addEventListener("timeupdate", () => {
    if (somTensao.currentTime >= 42) {
        somTensao.currentTime = 0;
    }
});

function jogadaMaquina() {
    if (!jogoAtivo || !maquinaPensando) return;

    let indice;
    do {
        indice = Math.floor(Math.random() * 100);
    } while (jogadasMaquina.includes(indice));

    jogadasMaquina.push(indice);
    let item = galeria[indice];
    let linha = Math.floor(indice / 10);
    let coluna = indice % 10;

    let frente = document.getElementById(`frente-${linha}-${coluna}`);
    let verso = document.getElementById(`verso-${linha}-${coluna}`);
  
    if (frente) frente.style.display = "none";
    if (verso) verso.style.display = "block";

    if (item === "barco") {
        pontuacaoMaquina += 10;
    } else if (item === "bomba") {
        pontuacaoMaquina = Math.max(0, pontuacaoMaquina - 10);
        if (vidasMaquina > 0) {
          vidasMaquina--;
          let coracao = document.getElementById("vidaMaquina-" + vidasMaquina);
          if (coracao) coracao.style.display = "none";
          if (vidasMaquina === 0) {
            encerrarPartida();
          }
        }
    }

    contadorJogadasMaquina++;

    const pontMaquina = document.getElementById("pontuacaoMaquina");
    if (pontMaquina) pontMaquina.innerText = "Pontuação: " + pontuacaoMaquina;

    const jogMaquina = document.getElementById("jogadasMaquina");
    if (jogMaquina) jogMaquina.innerText = "Jogadas: " + contadorJogadasMaquina;

    const tablero = document.getElementById('tabuleiro-jogo');
    if (tablero && tablero.classList.contains('bloqueado')) {
      tablero.classList.remove('bloqueado');
    }

    maquinaPensando = false;
    console.log("Máquina escolheu:", indice);
}

function mostrarVitoria() {
    const telaVitoria = document.getElementById("vitoria");
    if (telaVitoria) telaVitoria.style.display = "flex";
}

function mostrarDerrota() {
    const telaDerrota = document.getElementById("derrota");
    if (telaDerrota) telaDerrota.style.display = "flex";
}

let pontos = document.getElementById("pontuacao");
if (pontos) {
  pontos.classList.add("piscarPontos");
  setTimeout(() => {
      pontos.classList.remove("piscarPontos");
  }, 500);
}


function resetarJogo_D() {
  jogoAtivo = true;
  maquinaPensando = false;

  const tablero = document.getElementById('tabuleiro-jogo');
  if (tablero) {
    tablero.classList.remove('bloqueado');
    tablero.innerHTML = '';
  }

  const derrota = document.getElementById("derrota");
  const vitoria = document.getElementById("vitoria");

  if (derrota) derrota.style.display = "none";
  if (vitoria) vitoria.style.display = "none";

  prepararGaleria();
  criarTabela();

  contadorJogadas = 0;
  pontuacao = 0;

  document.getElementById('jogadas').innerText = 'Jogadas: 0';
  document.getElementById('pontuacao').innerText = 'Pontuação: 0';

}

function resetarJogo_V() {
  jogoAtivo = true;
  maquinaPensando = false;

  const tablero = document.getElementById('tabuleiro-jogo');
  if (tablero) {
    tablero.classList.remove('bloqueado');
    tablero.innerHTML = '';
  }

  const derrota = document.getElementById("derrota");
  const vitoria = document.getElementById("vitoria");

  if (derrota) derrota.style.display = "none";
  if (vitoria) vitoria.style.display = "none";

  prepararGaleria();
  criarTabela();

  contadorJogadas = 0;
  pontuacao = 0;

  document.getElementById('jogadas').innerText = 'Jogadas: 0';
  document.getElementById('pontuacao').innerText = 'Pontuação: 0';
}
