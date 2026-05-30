// ARRAY COM TODOS OS ELEMENTOS
let galeria = [];

// 35 bombas
for(let i = 0; i < 35; i++){
    galeria.push("img/bomba.png");
}

// 35 águas
for(let i = 0; i < 35; i++){
    galeria.push("img/Wave.png");
}

// 10 barcos 1
for(let i = 0; i < 10; i++){
    galeria.push("img/Ship-1.png");
}

// 10 barcos 2
for(let i = 0; i < 10; i++){
    galeria.push("img/Ship-2.png");
}

// 10 barcos 3
for(let i = 0; i < 10; i++){
    galeria.push("img/Ship-3.png");
}



function criartabela() {

    let tabela = document.createElement("table");

    let cenario = document.getElementById("exibirjogo");

    // limpa tabela antiga
    cenario.innerHTML = "";

    // contador para percorrer array
    let contador = 0;

    for(let i = 0; i < 10; i++) {

        let linha = document.createElement("tr");

        tabela.appendChild(linha);

        for(let j = 0; j < 10; j++) {

            let celula = document.createElement("td");

            linha.appendChild(celula);

            // ---------------------------------
            // IMAGEM ESCONDIDA
            // ---------------------------------

            let img_secundaria = document.createElement("img");

            img_secundaria.src = galeria[contador];

            contador++;

            img_secundaria.style.display = "none";

            img_secundaria.style.width = "50px";

            img_secundaria.style.height = "50px";

            celula.appendChild(img_secundaria);

            // ---------------------------------
            // IMAGEM FIRE
            // ---------------------------------

            let img_primaria = document.createElement("img");

            img_primaria.src = "img/Fire-icon.png";

            img_primaria.style.width = "50px";

            img_primaria.style.height = "50px";

            img_primaria.id = i + "-" + j;

            // ---------------------------------
            // EVENTO DE CLIQUE
            // ---------------------------------

            img_primaria.onclick = function() {

                img_primaria.style.display = "none";

                img_secundaria.style.display = "block";
            };

            celula.appendChild(img_primaria);
        }
    }
    

    cenario.appendChild(tabela);
   

}

        