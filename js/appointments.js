export function initAppointments(updateHoursCounter) {
    const days = document.querySelectorAll(".jour");
    const appointmentModal = document.getElementById("modal-rendezvous");
    const saveButton = document.getElementById("save");

    let activeDay = null;

    // Open appointment modal
    days.forEach(day => {
        day.addEventListener("click", () => {
            activeDay = day;

            clearAppointmentForm();

            appointmentModal.classList.remove("hidden");
        });
    });

    // Save appointment
    saveButton.addEventListener("click", () => {
        const client = document.getElementById("client").value;
        const startTime = document.getElementById("heure").value;
        const duration = document.getElementById("duree").value;
        const notes = document.getElementById("obs").value;

        const employeeSelect = document.getElementById("employe");
        const employee =
            employeeSelect.options[employeeSelect.selectedIndex].text;
        const color = employeeSelect.value;

        if (!startTime) {
            alert("Veuillez sélectionner une heure de début.");
            return;
        }

        if (!duration || Number(duration) <= 0) {
            alert("Veuillez saisir une durée valide.");
            return;
        }

        const endTime = calculateEndTime(startTime, duration);

        const date = activeDay.querySelector(".date").textContent;

        const appointment = {
            client,
            date,
            startTime,
            endTime,
            duration,
            employee,
            color,
            notes
        };

        createAppointmentCard(
            activeDay,
            appointment,
            updateHoursCounter
        );

        clearAppointmentForm();
        appointmentModal.classList.add("hidden");
    });
}

// ----------------------------
// Helpers
// ----------------------------

function clearAppointmentForm() {
    document.getElementById("heure").value = "";
    document.getElementById("duree").value = "";
    document.getElementById("obs").value = "";

    document.getElementById("client").selectedIndex = 0;
    document.getElementById("employe").selectedIndex = 0;
}

function calculateEndTime(startTime, duration) {
    const [hour, minute] = startTime.split(":").map(Number);

    const endDate = new Date(2026, 0, 1, hour, minute);
    endDate.setHours(endDate.getHours() + Number(duration));

    return (
        String(endDate.getHours()).padStart(2, "0") +
        ":" +
        String(endDate.getMinutes()).padStart(2, "0")
    );
}

function createAppointmentCard(day, appointment, updateHoursCounter) {
    const eventCard = document.createElement("div");
    eventCard.className = "evento";

    eventCard.style.borderLeftColor = appointment.color;

    eventCard.innerHTML = `
        <div class="evento-resumo">
            <div class="evento-topo">
                <strong>${appointment.client}</strong>
                <button class="delete-evento" type="button">🗑️</button>
            </div>

            <div class="hora">
                ${appointment.employee} •
                ${appointment.startTime} •
                ${appointment.duration}h
            </div>
        </div>
    `;

    eventCard.dataset.appointment = JSON.stringify(appointment);

    eventCard.querySelector(".delete-evento")
        .addEventListener("click", (event) => {
            event.stopPropagation();

            if (confirm("Supprimer ce rendez-vous ?")) {
                eventCard.remove();
                updateHoursCounter();
            }
        });

    eventCard.addEventListener("click", (event) => {
        event.stopPropagation();
        openGoogleCalendar(appointment);
    });

    day.appendChild(eventCard);

    updateHoursCounter();
}

function openGoogleCalendar(appointment) {
    const day = parseInt(appointment.date);

    const [hour, minute] =
        appointment.startTime.split(":").map(Number);

    const startDate =
        new Date(2026, 4, day, hour, minute);

    const endDate = new Date(startDate);
    endDate.setHours(
        endDate.getHours() + Number(appointment.duration)
    );

    const formatDate = (date) =>
        date.toISOString()
            .replace(/[-:]/g, "")
            .split(".")[0] + "Z";

    const title = encodeURIComponent(
        `Nettoyage - ${appointment.client}`
    );

    const details = encodeURIComponent(
        `Employée: ${appointment.employee}
Observations: ${appointment.notes || "Aucune"}`
    );

    const url =
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${title}` +
        `&dates=${formatDate(startDate)}/${formatDate(endDate)}` +
        `&details=${details}`;

    window.open(url, "_blank");
}