import { findAppointmentConflict } from "./conflicts.js";

export function initAppointments(updateHoursCounter) {
    const appointmentModal = document.getElementById("modal-rendezvous");
    const saveButton = document.getElementById("save");
    const conflictModal = document.getElementById("modal-conflit");
    const keepButton = document.getElementById("conflit-conserver");

    keepButton.addEventListener("click", () => {
        conflictModal.classList.add("hidden");
        appointmentModal.classList.add("hidden");
        clearAppointmentForm();
    });

    let activeDay = null;
    let pendingAppointment = null;
    let conflictingCard = null;
    let editingCard = null;
    let newCardDuringEdit = null;

    // Open appointment modal
    function openAppointmentModal(day) {
        activeDay = day;

        clearAppointmentForm();

        appointmentModal.classList.remove("hidden");
    }

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

        const conflict = findAppointmentConflict(
            activeDay,
            appointment,
            editingCard
        );

        if (editingCard) {
            if (conflict) {
                alert("Modifiez l'ancien rendez-vous pour éviter le conflit.");
                return;
            }

            editingCard.remove();
            editingCard = null;
            newCardDuringEdit = null;

            createAppointmentCard(
                activeDay,
                appointment,
                updateHoursCounter
            );

            clearAppointmentForm();
            appointmentModal.classList.add("hidden");
            return;
        }

        if (conflict) {
            const conflictInfo = document.getElementById("conflit-info");
            const oldAppointment = JSON.parse(conflict.dataset.appointment);

            pendingAppointment = appointment;
            conflictingCard = conflict;

            conflictInfo.textContent =
                `${oldAppointment.employee} a déjà un rendez-vous avec ` +
                `${oldAppointment.client} de ${oldAppointment.startTime} ` +
                `à ${oldAppointment.endTime}.`;

            conflictModal.classList.remove("hidden");
            return;
        }

        createAppointmentCard(
            activeDay,
            appointment,
            updateHoursCounter
        );

        clearAppointmentForm();
        appointmentModal.classList.add("hidden");
    });

    document.getElementById("conflit-remplacer")
        .addEventListener("click", () => {
            if (!pendingAppointment || !conflictingCard) return;

            conflictingCard.remove();

            createAppointmentCard(
                activeDay,
                pendingAppointment,
                updateHoursCounter
            );

            conflictModal.classList.add("hidden");
            appointmentModal.classList.add("hidden");
            clearAppointmentForm();

            pendingAppointment = null;
            conflictingCard = null;
        });

    document.getElementById("conflit-gerer")
        .addEventListener("click", () => {
            if (!pendingAppointment || !conflictingCard) return;

            const anotherConflict = findAppointmentConflict(
                activeDay,
                pendingAppointment,
                conflictingCard
            );

            if (anotherConflict) {
                alert(
                    "Ce rendez-vous entre en conflit avec plusieurs rendez-vous. " +
                    "Modifiez d'abord les anciens rendez-vous."
                );
                return;
            }

            const oldCard = conflictingCard;
            const oldAppointment = JSON.parse(oldCard.dataset.appointment);

            newCardDuringEdit = createAppointmentCard(
                activeDay,
                pendingAppointment,
                updateHoursCounter
            );

            editingCard = oldCard;
            pendingAppointment = null;
            conflictingCard = null;

            conflictModal.classList.add("hidden");
            clearAppointmentForm();

            document.getElementById("client").value = oldAppointment.client;
            document.getElementById("heure").value = oldAppointment.startTime;
            document.getElementById("duree").value = oldAppointment.duration;
            document.getElementById("employe").value = oldAppointment.color;
            document.getElementById("obs").value = oldAppointment.notes;

            appointmentModal.classList.remove("hidden");
        });

    appointmentModal.querySelector(".close-modal")
        .addEventListener("click", () => {
            if (!editingCard) return;

            newCardDuringEdit.remove();
            updateHoursCounter();

            newCardDuringEdit = null;
            editingCard = null;
            clearAppointmentForm();
        });


    return openAppointmentModal;
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

    return eventCard;

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