const botao = document.getElementById("btn-client");
const calendrier = document.getElementById("calendrier");

botao.addEventListener("click", () =>{
    const nome = prompt("Nom du client :");
    const hora = prompt("Heure du service :");

    if (!nome || !hora) {
        return;
    }

    const evento = document.createElement("div");
    evento.className = "evento";

    evento.innerHTML = `
        <strong>${nome}</strong>
        <br>
        ${hora}
    `;

    calendrier.appendChild(evento);
    
});