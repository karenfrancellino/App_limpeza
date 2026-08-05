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
    const employe = selectEmploye.options[selectEmploye.selectedIndex].text; 
    const cor = selectEmploye.value; 
    
    if (!heure || !duree) return; 
    
    const evento = document.createElement("div"); 
    evento.className = "evento"; 
    
    evento.style.borderLeftColor = cor; 
    evento.innerHTML = ` 
        <strong>${client}</strong> 
        <br>👩 ${employe} 
        <br>🕒 ${heure} 
        <br>⏱ ${duree}h 
        <br>📝 ${obs} 
        `; 
        
        jourActif.appendChild(evento); 

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