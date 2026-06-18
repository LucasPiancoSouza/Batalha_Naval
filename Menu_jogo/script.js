

function mudar_para_jogo(){
    window.location.href = "../Pagina_do_jogo/index.html"
}

function armezenar_Dificuldade(){ 
    const dificuldade = document.getElementById("dificuldade").value;
    localStorage.setItem("dificuldade", dificuldade);
    console.log(dificuldade);

    if(dificuldade === ""){
        let id = document.getElementById("btnIniciar");
        id.disabled = true;
    }
    else{
        let id = document.getElementById("btnIniciar");
        id.style.display = "flex";
        id.disabled = false;
    }
}