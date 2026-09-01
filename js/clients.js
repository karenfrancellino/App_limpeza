export function initClients() {
    const clientModal = document.getElementById("client-modal");
    const addClientButton = document.getElementById("add-client-button");
    const saveClientButton = document.getElementById("save-client-button");
    const clientSelect = document.getElementById("client");

    addClientButton.addEventListener("click", () => {
        document.getElementById("client-name").value = "";
        document.getElementById("client-phone").value = "";
        document.getElementById("client-email").value = "";
        document.getElementById("client-address").value = "";
        document.getElementById("client-information").value = "";

        clientModal.classList.remove("hidden");
    });

    saveClientButton.addEventListener("click", () => {
        // Implementation for saving client information
        const clientName = document.getElementById("client-name").value.trim();
        const clientPhone = document.getElementById("client-phone").value.trim();
        const clientEmail = document.getElementById("client-email").value.trim();
        const clientAddress = document.getElementById("client-address").value.trim();
        const clientInformation = document.getElementById("client-information").value.trim();

        if (!clientName) {
            alert("Veuillez saisir le nom du client.");
            return;
        }

        const client = {
            name: clientName,
            phone: clientPhone,
            email: clientEmail,
            address: clientAddress,
            information: clientInformation
        };

        const option = document.createElement("option");
        option.textContent = client.name;
        option.value = client.name;
        option.dataset.client = JSON.stringify(client);
        clientSelect.appendChild(option);
        clientSelect.value = client.name;
        clientModal.classList.add("hidden");

    });
}