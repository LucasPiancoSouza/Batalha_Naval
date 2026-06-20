function armazenar_maquina(){
    const maquina = document.getElementById("btnMaquina").value;
    localStorage.setItem("Maquina", maquina);
    localStorage.setItem("modoJogo", "maquina");
    localStorage.setItem("Solo", "");
    mudar_para_jogo();
}

function mudar_para_jogo(){
    window.location.href = "../Pagina_do_jogo/index.html"
}

function aparecer_dificuldade(){
    let id_dificuldade = document.getElementById("dificuldade");
    id_dificuldade.style.display = "flex";
}

function armazenar_solo(){
    const botaoSolo = document.getElementById("btnIniciar");
    const solo = botaoSolo?.value || "Solo";
    localStorage.setItem("Solo", solo);
    localStorage.setItem("modoJogo", "solo");
    localStorage.setItem("Maquina", "");
    console.log("Solo salvo:", solo);
    aparecer_dificuldade();
}

function armezenar_Dificuldade(){ 
    const dificuldade = document.getElementById("dificuldade").value;
    localStorage.setItem("dificuldade", dificuldade);
    console.log("Dificuldade salva:", dificuldade);

    if(dificuldade === ""){
        let id = document.getElementById("btnIniciar");
        id.disabled = true;
    }
    else{
        const botaoSolo = document.getElementById("btnIniciar");
        const solo = botaoSolo?.value || "Solo";
        localStorage.setItem("Solo", solo);
        localStorage.setItem("modoJogo", "solo");
        console.log("Solo confirmado:", solo);
        mudar_para_jogo();
    }
}