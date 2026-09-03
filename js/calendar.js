export function initCalendar(openAppointmentModal) {
    const days = document.querySelectorAll(".jour");
        
    days.forEach(day => {
        day.addEventListener("click", () => {
            openAppointmentModal(day);
        });
    });
}