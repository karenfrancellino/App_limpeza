export function findAppointmentConflict(day, newAppointment, ignoredCard = null) {
    const existingAppointments = day.querySelectorAll(".evento");

    for (const appointmentElement of existingAppointments) {
        if (appointmentElement === ignoredCard) {
            continue;
        }

        const existingAppointment = JSON.parse(
            appointmentElement.dataset.appointment
        );
        if (existingAppointment.employee !== newAppointment.employee) {
            continue;
        }

        const existingStart = timeToMinutes(existingAppointment.startTime);
        const existingEnd = timeToMinutes(existingAppointment.endTime);

        const newStart = timeToMinutes(newAppointment.startTime);
        const newEnd = timeToMinutes(newAppointment.endTime);
        const hasConflict =
            newStart < existingEnd &&
            newEnd > existingStart;
        if (hasConflict) {
            return appointmentElement;
        }

    }
    return null;
}

function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
}
