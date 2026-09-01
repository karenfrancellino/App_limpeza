export function initModals() {
    const closeButtons = document.querySelectorAll(".close-modal");

    closeButtons.forEach(closeButton => {
        closeButton.addEventListener("click", () => {
            const modal = closeButton.closest(".modal");

            if (modal) {
                modal.classList.add("hidden");
            }
        });
    });
}