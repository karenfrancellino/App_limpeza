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
    const rendezvous = { 
        client, 
        heure, 
        duree, 
        employe, 
        cor, 
        obs 
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
    <div class="hora"> 🕒 ${rendezvous.heure} • ${rendezvous.duree}h 
    </div> 
    </div> 
    `; 

    // Guarda os dados completos no elemento
evento.dataset.rendezvous = JSON.stringify(rendezvous);

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