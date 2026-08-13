const jours = document.querySelectorAll(".jour"); 
const modalRendezvous = document.getElementById("modal-rendezvous"); 
const save = document.getElementById("save"); 

const modalClient = document.getElementById("modal-client"); 
const btnClientNouveau = document.getElementById("btn-client-nouveau"); 
const saveClient = document.getElementById("save-client");

let jourActif = null; 

// Abrir modal ao clicar no dia 
jours.forEach(jour => { 
    jour.addEventListener("click", () => { 
        jourActif = jour;
        modalRendezvous.classList.remove("hidden");
    }); 
}); 

// Abrir modal de cliente 
btnClientNouveau.addEventListener("click", () => { 
    modalClient.classList.remove("hidden"); 
});


// Salvar evento 
save.addEventListener("click", () => { 
    
    const client = document.getElementById("client").value; 
    const heure = document.getElementById("heure").value; 
    const duree = document.getElementById("duree").value; 
    const obs = document.getElementById("obs").value; 
    
    const selectEmploye = document.getElementById("employe"); 
    const employe = 
    selectEmploye.options[selectEmploye.selectedIndex].text; 
    const cor = selectEmploye.value; 
    
    if (!heure || !duree) return; 
    
    // Objeto do agendamento (estrutura profissional) 
   const date = jourActif.querySelector(".date").textContent; 
   
   // Calcula hora final 
   const [h, m] = heure.split(":").map(Number); 
   const fin = new Date(2026, 0, 1, h, m); 
   fin.setHours(fin.getHours() + Number(duree)); 
   
   const heureFin = 
   String(fin.getHours()).padStart(2, "0") + ":" + 
   String(fin.getMinutes()).padStart(2, "0"); 
   
   const rendezvous = { 
    client, 
    date, 
    heure, 
    heureFin, 
    duree, 
    employe, 
    cor, 
    obs, 
};
    
    // Cria o cartão visual do calendário 
    const evento = document.createElement("div"); 
    evento.className = "evento"; 
    
    // Cor da funcionária 
    evento.style.borderLeftColor = rendezvous.cor; 
    
    // CALENDÁRIO LIMPO 
    evento.innerHTML = ` 
     <div class="evento-resumo"> 
        <strong>${rendezvous.client}</strong> 
        <div class="hora"> 
            ${rendezvous.employe} •  ${rendezvous.heure} • 
        ${rendezvous.duree}h 
    </div> 
    </div> 
    `;

    // Guarda os dados completos no elemento
evento.dataset.rendezvous = JSON.stringify(rendezvous);

// Adiciona ou google agenda
evento.addEventListener("click", (e) => { 
    e.stopPropagation(); 
    
    const data = JSON.parse(evento.dataset.rendezvous); 
    
    // Pega o dia clicado (ex.: "3 mai" -> 3) 
    const jour = parseInt(data.date); 
    
    // Hora inicial 
    const [h, m] = data.heure.split(":").map(Number); 
    
    // Duração em horas 
    const duree = Number(data.duree); 
    
    // Data de início 
    const debut = new Date(2026, 4, jour, h, m); 
    
    // Data de fim 
    const fin = new Date(debut); 
    fin.setHours(fin.getHours() + duree); 
    
    // Formato aceito pelo Google Calendar 
    function formatGoogle(d) { 
        return d.toISOString().replace(/[-:]/g, "").split(".")
        [0] + "Z"; 
    } 
    
    const dateDebut = formatGoogle(debut); 
    const dateFin = formatGoogle(fin); 
    
    const titre = encodeURIComponent(`Nettoyage - 
        ${data.client}`); 
        
    const details = encodeURIComponent( 
        `Employée: ${data.employe} 
    Observations: ${data.obs || "Aucune"}` 
); 

const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${titre}` + 
    `&dates=${dateDebut}/${dateFin}` + 
    `&details=${details}`; 
    
    window.open(url, "_blank"); 
});

// Adiciona ao dia selecionado
jourActif.appendChild(evento);

// Fecha o modal
modalRendezvous.classList.add("hidden");
    });

    saveClient.addEventListener("click", () => { 
        const nome = document.getElementById("client-nom").value; 
        if (!nome) return; 
        const selectClient = document.getElementById("client"); 
        const option = document.createElement("option"); 
        option.textContent = nome; 
        selectClient.appendChild(option); 
        modalClient.classList.add("hidden"); 
    });