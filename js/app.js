import { initAppointments } from "./appointments.js";
import { initModals } from "./modals.js";

function updateHoursCounter() {
    // The hours counter will be implemented in another module.
}

initModals();
initAppointments(updateHoursCounter);