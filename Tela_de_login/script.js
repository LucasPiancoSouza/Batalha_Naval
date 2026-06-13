function login () {
    let id = document.getElementById ("conteudodocontainer");
    let formulario = document.createElement ("form");
    let nome = document.createElement ("input");


nome.placeholder = "Nome";
nome.id = "input-1";
formulario.appendChild(nome);
id.appendChild(formulario);
}

function entrar () {
     window.location.href = "../Menu_jogo/index.html";
}