const jours = document.querySelectorAll(".jour"); 
const modal = document.getElementById("modal"); 
const save = document.getElementById("save"); 

let jourActif = null; 

// Abrir modal ao clicar no dia 
jours.forEach(jour => { 
    jour.addEventListener("click", () => { 
        jourActif = jour;
        modal.classList.remove("hidden"); 
    }); 
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

        modal.classList.add("hidden"); 
    });