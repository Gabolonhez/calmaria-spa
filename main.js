let lastFocusedElement;


function manageFocusModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    const elementsModal = modal.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  
    const firstElement = elementsModal[0];
  
    firstElement.focus();

    modal.addEventListener('keydown', (event) => {
        if (event.keyCode === "Tab") {
            if (event.shiftkey) {
                if(document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
            if (
                document.activeElement === lastElement ||
                !modal.contains(document.activeElement)) {
                event.preventDefault();     
                }
            }
        }
    });
  }
  
function alternModal(modalId, open) {
    const modal = document.querySelector(`#${modalId}`);
  
    if (open) {
        lastFocusedElement = document.activeElement;

        modal.style.display = "block";
        manageFocusModal(modalId); 
    } else {
        modal.style.display = "none";

        if(lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }
  
    document.body.style.overflow = open ? "hidden" : "auto";
  }

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        alternModal('ver-modal-inscrito', false);
        alternModal('ver-modal-contato', false);
        alternModal('ver-modal-enviado', false);

        document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
            alternSubmenu(item, false);
    });
    }
});

function alternSubmenu(item, display) {
    const submenu = item.querySelector(".submenu");

    if (submenu) { 
        submenu.style.display = display ? "block" : "none";

        const menuItem = item.querySelector(".cabecalho__lista-item a");
        menuItem.setAttribute("aria-expanded", display ? true : false);

        const dropDownExpandedIcon = item.querySelector(
            ".material-symbols-outlined icone");

        dropdownExpandedIcon.classList.toggle("active", display);
    }
}


// select cabecalho__lista-item
document.querySelectorAll(".cabecalho__lista-item").forEach(item => {
    // Add a mouseover listener
    item.addEventListener("mouseover", () => alternSubmenu(item, true));

    // Add a mouseout listener
    item.addEventListener("mouseout", () => alternSubmenu(item, false));

    item.addEventListener("click", () => {
        const submenu = item.querySelector(".submenu");
        
        const isDisplayed = submenu.style.display === "block";

        alternSubmenu (item, !isDisplayed);
        });
});

// Acordion

document.querySelectorAll(".botao-acordeao").forEach(button => {
    button.addEventListener('click', () => alternAcordion(button));
});

function alternAcordion(button) {
    const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".botao-acordeao").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");

        const content = btn.nextElementSibling;
        content.classList.remove("expandido");
        content.setAttribute("aria-hidden", "true");
    });

    if (!isAlreadyOpen) { 
        button.setAttribute("aria-expanded", "true");
    
        const content = button.nextElementSibling;
        content.classList.add("expandido");

        content.setAttribute("aria-hidden", "false");
    }
}