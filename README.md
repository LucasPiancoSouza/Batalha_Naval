# 🚢 Batalha Naval

Jogo web completo de **Batalha Naval** criado com **HTML**, **CSS** e **JavaScript**. O projeto conta com tela de login, menu de seleção de modo, escolha de dificuldade e uma partida dinâmica com sistema de pontos, vidas e efeitos sonoros.

## 📌 Visão Geral do Projeto

O jogo possui três telas principais:

1. **Tela inicial** (`index.html`)
   - Formulário de entrada para capturar o nome do jogador
   - Validação de nome com mínimo de 4 caracteres
   - Redirecionamento automático para o menu após o login

2. **Menu de jogo** (`Menu_jogo/index.html`)
   - Escolha entre **1 vs Máquina** ou **Modo Solo**
   - Seleção de dificuldade em modo solo: **Fácil**, **Médio** ou **Difícil**
   - Armazenamento das opções no `localStorage`

3. **Tela de partida** (`Pagina_do_jogo/index.html`)
   - Tabuleiro 10x10 com 100 cartas
   - Objetivos baseados em pontos e vida
   - Sistema de timer, menu de pausa e regras acessíveis
   - Feedback visual com vitórias e derrotas

## 🎮 Como Jogar

- Clique nas células do tabuleiro para revelar o conteúdo oculto.
- Os conteúdos possíveis são:
  - **Barco**: +10 pontos
  - **Água**: sem alteração de pontos
  - **Bomba**: perde uma vida e pode reduzir pontuação
- O jogador começa com vidas definidas pela dificuldade:
  - Fácil: 4 vidas
  - Médio: 3 vidas
  - Difícil: 2 vidas
- Objetivo principal:
  - Conquistar **100 pontos** para vencer
- No modo **1 vs Máquina**, a máquina também realiza jogadas aleatórias contra o mesmo tabuleiro.

## 🧠 Lógica do Jogo

A partida é gerada dinamicamente a partir da dificuldade escolhida:

- Cada dificuldade define quantidade de bombas, barcos e águas
- A distribuição é embaralhada para criar partidas diferentes
- Ao clicar em uma carta:
  - o lado frontal é escondido
  - o verso apropriado é exibido
  - pontuação, vidas e contadores são atualizados

## 🛠️ Tecnologias Utilizadas

- `HTML5` para a estrutura das páginas
- `CSS3` para a interface visual e responsiva
- `JavaScript` para lógica do jogo, navegação e armazenamento local

## 📁 Estrutura de Pastas

- `index.html` — tela de login principal
- `style.css` — estilo da tela de login
- `script.js` — lógica do login e navegação para o menu
- `Menu_jogo/` — interface de seleção de modo e dificuldade
- `Pagina_do_jogo/` — tela do jogo com tabuleiro, regras e sistema de vitória/derrota
- `Imagens/` e `Pagina_do_jogo/img/` — imagens e ícones usados nas telas
- `Pagina_do_jogo/Som/` — efeitos sonoros e trilhas do jogo

## 🚀 Funcionalidades Principais

- Tela de login funcional
- Modo Solo e 1 vs Máquina
- Seleção de dificuldade e persistência via `localStorage`
- Tabuleiro 10x10 gerado dinamicamente
- Sistema de pontuação e vidas
- Menu de pausa e regras explicativas
- Telas de vitória e derrota
- Música ambiente e efeitos sonoros

## ✅ Observações

- O projeto está pronto para rodar localmente abrindo `index.html` no navegador.
- Para melhorar, é possível adicionar:
  - animações adicionais
  - mais efeitos visuais
  - um modo multiplayer real
  - histórico de partidas ou placar

## 👨‍💻 Desenvolvedores

- Lucas Piancó
- Luis Gabriel
- Carlos Eduardo

## 📌 Status

 Feito ✅ — jogo funcional com interface de login, menu e partida.
