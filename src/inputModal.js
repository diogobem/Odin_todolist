//all buttons should have the following dataset properties according to the use desired
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

// CODIGO DO MODAL  //
//modal open
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        clearInputsModal(modal)
        openModal(modal);
    })
})

// modal close
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal);
    })
})

// overlay = dark background behind modal
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => closeModal(modal))
})

// function to open the modal
export function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active')
    
}

// function do close the modal
export function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active')
}

// function to capture de values inputed in the modal inputs AND selects
export function valuesInputModal(modal) {

    let inputs = modal.querySelector('form');
    let inputValues = [];

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName === "INPUT" || inputs[i].nodeName === "SELECT" || inputs[i].nodeName === "TEXTAREA") {

            let fieldName = inputs[i].dataset.id;
            let fieldValue = inputs[i].value

            inputValues[fieldName] = fieldValue
        }
    }

    return inputValues
}

// load the values from object into the modal input and select fields
export function loadValuesInputsModal(modal, object) {
    object = (object[0])
    let input;
    let value;
    for (let key in object) {
        if ([key]!='taskStatus') {
            input = modal.querySelector(`[data-id=${key}]`);
            value = `${object[key]}`;
            input.value = value;
        }
    }
}

// clears the modal
export function clearInputsModal(modal) {
    let inputs = modal.querySelector('form');
    let inputValues = [];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName === "INPUT" || inputs[i].nodeName === "SELECT" || inputs[i].nodeName === "TEXTAREA") {
            inputs[i].value = '';
        }
    }
}