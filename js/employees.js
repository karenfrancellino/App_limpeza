export function initEmployees() {
    const employeeModal = document.getElementById("employee-modal");
    const addEmployeeButton = document.getElementById("add-employee-button");
    const saveEmployeeButton = document.getElementById("save-employee-button");
    const employeeSelect = document.getElementById("employe");

    addEmployeeButton.addEventListener("click", () => {
        employeeModal.classList.remove("hidden");
    });

    saveEmployeeButton.addEventListener("click", () => {
        const employeeName = document.getElementById("employee-name").value.trim();
        const employeeAddress = document.getElementById("employee-address").value.trim();
        const employeePhone = document.getElementById("employee-phone").value.trim();
        const employeeEmail = document.getElementById("employee-email").value.trim();
        const employeeHourlyRate = document.getElementById("employee-hourly-rate").value;
        const employeeColor = document.getElementById("employee-color").value;

        if (!employeeName) {
            alert("Veuillez saisir le nom de l'employée.");
            return;
        }

        const employee = {
            name: employeeName,
            address: employeeAddress,
            phone: employeePhone,
            email: employeeEmail,
            hourlyRate: Number(employeeHourlyRate) || 0,
            color: employeeColor
        };

        employee.availability = {
            monday: {
                morning: document.getElementById("monday-morning").checked,
                afternoon: document.getElementById("monday-afternoon").checked,
                evening: document.getElementById("monday-evening").checked
            },
            tuesday: {
                morning: document.getElementById("tuesday-morning").checked,
                afternoon: document.getElementById("tuesday-afternoon").checked,
                evening: document.getElementById("tuesday-evening").checked
            },
            wednesday: {
                morning: document.getElementById("wednesday-morning").checked,
                afternoon: document.getElementById("wednesday-afternoon").checked,
                evening: document.getElementById("wednesday-evening").checked
            },
            thursday: {
                morning: document.getElementById("thursday-morning").checked,
                afternoon: document.getElementById("thursday-afternoon").checked,
                evening: document.getElementById("thursday-evening").checked
            },
            friday: {
                morning: document.getElementById("friday-morning").checked,
                afternoon: document.getElementById("friday-afternoon").checked,
                evening: document.getElementById("friday-evening").checked
            },
            saturday: {
                morning: document.getElementById("saturday-morning").checked,
                afternoon: document.getElementById("saturday-afternoon").checked,
                evening: document.getElementById("saturday-evening").checked
            }
        };

        const option = document.createElement("option");
        option.textContent = employee.name;
        option.value = employee.color;
        option.dataset.employee = JSON.stringify(employee);
        employeeSelect.appendChild(option);
        employeeSelect.value = employee.color;
        employeeModal.classList.add("hidden");
    });
}