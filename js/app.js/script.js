import { initAppointments } from "./js/appointments.js";

const jours = document.querySelectorAll(".jour"); 
const modalRendezvous = document.getElementById("modal-rendezvous"); 
const save = document.getElementById("save"); 

const modalClient = document.getElementById("modal-client"); 
const btnClientNouveau = document.getElementById("btn-client-nouveau"); 

const modalEmploye = document.getElementById("modal-employe"); 
const btnEmployeNouveau = document.getElementById("btn-employe-nouveau");

const saveClient = document.getElementById("save-client");

const saveEmploye = document.getElementById("save-employe");

const modalConflit = document.getElementById("modal-conflit");
const conflitInfo = document.getElementById("conflit-info");
const conflitRemplacer = document.getElementById("conflit-remplacer");
const conflitConserver = document.getElementById("conflit-conserver");

let rendezvousEnConflit = null;
let evenementEnConflit = null;

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        modal.classList.add("hidden");
    });
});
 

// Abrir modal de cliente
btnClientNouveau.addEventListener("click", () => {

    // Limpa o formulário para novo cliente
    document.getElementById("client-nom").value = "";
    document.getElementById("client-tel").value = "";
    document.getElementById("client-adresse").value = "";
    document.getElementById("client-info").value = "";

    modalClient.classList.remove("hidden");
});

// Abrir modal de funcionaria 
btnEmployeNouveau.addEventListener("click", () => { 
    modalEmploye.classList.remove("hidden"); 
});


    // Verifica conflitos no mesmo dia 
    const eventosDoDia = jourActif.querySelectorAll(".evento"); 
    for (const ev of eventosDoDia) { 
        const rdv = JSON.parse(ev.dataset.rendezvous); 
        
    // Só compara a mesma funcionária 
    if (rdv.employe !== employe) continue; 
    
    const [hIni, mIni] = rdv.heure.split(":").map(Number); 
    const [hFim, mFim] = rdv.heureFin.split(":").map(Number); 
    
    const debutExistente = hIni * 60 + mIni; 
    const finExistente = hFim * 60 + mFim; 
    
  // Verifica sobreposição
const conflit =
    debutNouveau < finExistente &&
    finNouveau > debutExistente;

if (conflit) {

    rendezvousEnConflit = rdv;
    evenementEnConflit = ev;

    conflitInfo.innerHTML = `
        <p><strong>Agendamento atual</strong></p>
        <p>Cliente: ${rdv.client}</p>
        <p>Horário: ${rdv.heure} - ${rdv.heureFin}</p>

        <p><strong>Novo agendamento</strong></p>
        <p>Cliente: ${client}</p>
        <p>Horário: ${heure} - ${heureFin}</p>
    `;

    modalConflit.classList.remove("hidden");

    return;
}
    }
    
    // Objeto do agendamento (estrutura profissional) 
   const date = jourActif.querySelector(".date").textContent; 
   
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
            <div class="evento-topo"> 
                <strong>${rendezvous.client}</strong> 
                <button class="delete-evento" type="button">🗑️</button> 
             </div> 
                
            <div class="hora"> ${rendezvous.employe} • ${rendezvous.heure} • ${rendezvous.duree}h 
        </div> 
    </div> 
`;

const deleteBtn = evento.querySelector(".delete-evento"); 

deleteBtn.addEventListener("click", (e) => { 
    e.stopPropagation(); 
    
    if (confirm("Supprimer ce rendez-vous ?")) { 
        evento.remove(); atualizarContadorHoras(); 
    } 
});

    // Guarda os dados completos no elemento
evento.dataset.rendezvous = JSON.stringify(rendezvous);

// Adiciona ao google agenda
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

// Atualiza o contador de horas
atualizarContadorHoras();

// Limpa o formulário 
document.getElementById("heure").value = ""; 
document.getElementById("duree").value = ""; 
document.getElementById("obs").value = ""; 

// Volta para a primeira funcionária 
document.getElementById("employe").selectedIndex = 0; 

// Volta para o primeiro cliente
document.getElementById("client").selectedIndex = 0;

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
        
        // Limpa o formulário para o próximo cliente 
        document.getElementById("client-nom").value = ""; 
        document.getElementById("client-tel").value = ""; 
        document.getElementById("client-adresse").value = ""; 
        document.getElementById("client-info").value = ""; 
    
        modalClient.classList.add("hidden"); 
    });
  

    saveEmploye.addEventListener("click", () => { 
    
    const nome = document.getElementById("employe-nom").value; 
    const cor = document.getElementById("employe-couleur").value; 
    
    if (!nome) return; 
    
    const selectEmploye = document.getElementById("employe"); 
    
    const option = document.createElement("option"); 
    option.textContent = nome; 
    option.value = cor; 
    
    selectEmploye.appendChild(option); 
    
    modalEmploye.classList.add("hidden"); 
});

function atualizarContadorHoras() { 
    const eventos = document.querySelectorAll('.evento'); 
    const totais = {}; 
    
    eventos.forEach(ev => { 
        const rdv = JSON.parse(ev.dataset.rendezvous); 
        
        if (!totais[rdv.employe]) { 
            totais[rdv.employe] = 0; 
        } 
        
        totais[rdv.employe] += Number(rdv.duree); 
    }); 
    
    const container = document.getElementById('compteur-heures'); 
    
    if (!container) return; 
    
    container.innerHTML = ''; 
    
    for (const nome in totais) { 
        const linha = document.createElement('div'); 
        linha.className = 'ligne-heures'; 
        
        linha.innerHTML = ` 
            <span>${nome}</span> 
            <strong>${totais[nome]}h</strong> 
        `; 
        
        container.appendChild(linha); 
    } 

initAppointments(updateHoursCounter);

}