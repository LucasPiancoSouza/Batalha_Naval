/*Teste */
function login () {
    let id = document.getElementById ("conteudodocontainer");
    let formulario = document.createElement ("form");
    let nome = document.createElement ("input");


nome.placeholder = "Nome";
nome.id = "input-1";
nome.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        entrar();
    }
});
formulario.appendChild(nome);
id.appendChild(formulario);
}

function entrar () {
 let nome = document.getElementById("input-1").value;
if (nome === "") {
alert("Erro! Coloque seu nome.");
return;
}

if (nome.length < 4) {
alert("Seu nome precisa ter pelo menos 4 caracteres.");
return;
}
localStorage.setItem ("nome", nome);
window.location.href = "Menu_jogo/index.html";

}
