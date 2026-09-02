import { initAppointments } from "./appointments.js";
import { initModals } from "./modals.js";
import { initClients } from "./clients.js";
import { initEmployees } from "./employees.js";


function updateHoursCounter() {
    // The hours counter will be implemented in another module.
}

initModals();
initClients();
initEmployees();
initAppointments(updateHoursCounter);