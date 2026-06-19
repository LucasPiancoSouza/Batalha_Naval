// 1. Pegar a dificuldade guardada no localStorage (se não houver, define 'fácil' como padrão)
let dificuldade = localStorage.getItem("dificuldade") || "Médio";
console.log("Dificuldade selecionada:", dificuldade);

// 2. Objeto de configuração que você sugeriu
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

// 3. Função para sortear a quantidade dentro do intervalo
function sortearQuantidade(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 4. Nova função para montar o array baseado na dificuldade
function prepararGaleria() {
  galeria = []; // Limpa o array antigo

  // Pega as configurações da dificuldade atual
  const config = CONFIG_DIFICULDADE[dificuldade];

  // Sorteia a quantidade exata de bombas e barcos para esta partida
  const totalBombas = sortearQuantidade(config.bombas.min, config.bombas.max);
  const totalBarcos = sortearQuantidade(config.barcos.min, config.barcos.max);
  
  // O resto do tabuleiro (total de 100 blocos em uma tabela 10x10) vira água
  const totalAguas = 100 - (totalBombas + totalBarcos);

  // Preenche o array linear
  for (let i = 0; i < totalBombas; i++) galeria.push("bomba");
  for (let i = 0; i < totalBarcos; i++) galeria.push("barco");
  for (let i = 0; i < totalAguas; i++) galeria.push("agua");

  console.log(`Partida Iniciada! Bombas: ${totalBombas} | Barcos: ${totalBarcos} | Água: ${totalAguas}`);
  
  // Embaralha para que fiquem em posições aleatórias
  embaralhar(galeria);
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Inicialização do jogo modificada
document.addEventListener('DOMContentLoaded', () => {
  preparparPartida(); 
  configurarEventos();
  exibirRegras();
});

function preparparPartida() {
  prepararGaleria(); // Monta e embaralha os itens baseados na dificuldade
  criarTabela();     // Renderiza o visual do tabuleiro
}

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
  
  // No reset, chamamos a preparação de novo para sortear novos valores!
  preparparPartida();

  contadorJogadas = 0;
  const elementoJogadas = document.getElementById('jogadas');
  elementoJogadas.innerText = 'Jogadas: ' + contadorJogadas;
  pontuacao = 0;
  id_pontuacao = document.getElementById("pontuacao");
  id_pontuacao.innerText = "Pontuação: "+pontuacao;
  totalSegundos = 0;
  let id_tempo = document.getElementById("tempo");
  id_tempo.innerText = "Tempo: 0:00";
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
  regras.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

const musica = new Audio("Som/piratesom.mp3");
musica.loop = true;

const somDerrota = new Audio("Som/defeat_sound.mp3");


const somVitoria = new Audio("Som/vitoria_sound.wav");

const somTensao = new Audio ("Som/musica_tensao1.mp3");
somTensao.loop = true;

function fecharRegras() {
  const regras = document.getElementById('regras');
  regras.style.display = 'none';
  document.body.style.overflow = '';
  temporizador(1000);
 if (dificuldade === "Difícil") {
      somTensao.play();
  } else {
      musica.play();
  }

}

// 5. Ajuste crucial na função criarTabela para ler o array linear corretamente
function criarTabela() {
  // Reinicia os contadores de exibição
  qtd_bombas = 0;
  qtd_barcos = 0;
  qtd_aguas = 0;
  
  const tabela = document.createElement('table');
  const cenario = document.getElementById('tabuleiro-jogo');
  
  // Limpa o tabuleiro completamente antes de desenhar (evita duplicações)
  cenario.innerHTML = '';

  const config = CONFIG_DIFICULDADE[dificuldade];
        vidasRestantes = config.vidas;
        let contador_vidas = 0;
        let id_vidas = document.getElementById("vidas")
        id_vidas.innerText = "";
        while(contador_vidas < vidasRestantes){
          let img_vidas = document.createElement("img");
          img_vidas.className = "coracoes";
          img_vidas.src = "img/vidas.png";
          img_vidas.id = "vida-"+contador_vidas;
          id_vidas.appendChild(img_vidas);
          contador_vidas++;
        }

  for (let i = 0; i < 10; i++) {
    const linha = document.createElement('tr');
    tabela.appendChild(linha);

    for (let j = 0; j < 10; j++) {
      const celula = document.createElement('td');
      linha.appendChild(celula);
      
      // CÁLCULO MATEMÁTICO DO ÍNDICE: Garante a posição exata de 0 a 99 sem repetir nada
      let indiceAssegurado = (i * 10) + j;
      let tipoItem = galeria[indiceAssegurado];

      // Criar o elemento do Verso (O que está escondido)
      const imagemVerso = document.createElement('img');
      imagemVerso.style.display = "none"; // Começa escondido

      // Define o tipo correto baseado no array embaralhado
      if (tipoItem === "bomba") {
          imagemVerso.src = 'img/bomba.png';
          qtd_bombas++;
      } else if (tipoItem === "barco") {
          imagemVerso.src = 'img/barco.png';
          qtd_barcos++;
      } else {
          imagemVerso.src = 'img/agua.png';
          qtd_aguas++;
      }

      // Criar o elemento da Frente (A fumaça/fogo que o jogador clica)
      const imagemFrente = document.createElement('img');
      imagemFrente.src = 'img/Fire-icon.png';
      imagemFrente.id = `frente-${i}-${j}`; // ID único para evitar conflito no DOM
      imagemFrente.classList.add('carta-frente');
      // Evento de clique isolado por célula
      imagemFrente.addEventListener('click', () => {
        imagemFrente.style.display = 'none';
        imagemVerso.style.display = 'block';
        if (galeria[indiceAssegurado] == "bomba"){
          qtd_bombas -= 1;
          document.getElementById("bombas").innerText = "Bombas: " + qtd_bombas;
          if(pontuacao >= 10){
              pontuacao -= 10;
              let id_pontuacao = document.getElementById("pontuacao");
              id_pontuacao.innerText = "Pontuação: "+pontuacao; 
          }
          if(vidasRestantes > 0){
            vidasRestantes--;
            let id_img_vidas = document.getElementById("vida-"+vidasRestantes);
            id_img_vidas.style.display = 'none';
            if (vidasRestantes == 0) {
              pararTemporizador();
              musica.pause();
    musica.currentTime = 0;

    somTensao.pause();
    somTensao.currentTime = 0;

    somDerrota.currentTime = 0;
    somDerrota.play();
            }
          }
        }else if(galeria[indiceAssegurado] == "barco"){
          pontuacao += 10;
          let id_pontuacao = document.getElementById("pontuacao");
          id_pontuacao.innerText = "Pontuação: "+pontuacao;
          qtd_barcos -= 1;
          document.getElementById("barcos").innerText = "Barcos: " + qtd_barcos;
        }else{
          qtd_aguas -= 1;
          document.getElementById("agua").innerText = "Águas: " + qtd_aguas;
        }
        
        contadorJogadas += 1;
        document.getElementById('jogadas').innerText = 'Jogadas: ' + contadorJogadas;
      });
        
      // IMPORTANTE: Adiciona ambos na ordem correta dentro da célula atual
      celula.appendChild(imagemVerso);
      celula.appendChild(imagemFrente);
    }
  }
  

  // Atualiza os textos do painel de informações uma única vez após o término do loop
  document.getElementById("bombas").innerText = "Bombas: " + qtd_bombas;
  document.getElementById("agua").innerText = "Águas: " + qtd_aguas;
  document.getElementById("barcos").innerText = "Barcos: " + qtd_barcos;
  cenario.appendChild(tabela);


}

function abrirMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  pararTemporizador();
}

function fecharMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
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

function temporizador(){
pararTemporizador();
meuIntervalo = setInterval(() => {
    totalSegundos++;

    let minutos = Math.floor(totalSegundos / 60);
    let segundos = totalSegundos % 60;

    if (segundos < 10) {
        segundos = "0" + segundos;
    }

    document.getElementById("tempo").innerText =
        "Tempo: "+minutos + ":" + segundos;

}, 1000);
}

somTensao.addEventListener("timeupdate", () => {
    if (somTensao.currentTime >= 42) {
        somTensao.currentTime = 0;
    }
});