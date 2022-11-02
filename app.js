const app = {
    // Initialization
    init: function () {
        const btnElem = document.querySelector('#objectNumber + button');
        btnElem.addEventListener('click', app.retrieveObjectInput);
    },

    // First Step - Retrieve Object Input
    retrieveObjectInput: function () {
        /* Retrieve and Format input value */
        const inputValue = document.getElementById('objectNumber');
        if (isNaN(inputValue.value)) {
            console.log("Veuillez entrer un nombre");
            return;
        }
        if (inputValue.value === '' || inputValue.value === 0) {
            console.log("Veuillez entrer une valeur correcte");
            return;
        }
        const enteredValue = parseInt((inputValue.value));

        /* Create template depending on input value */
        for (let index = 0; index < enteredValue; index++) {
            app.createObjectBox(index+1);
        }
    },

    // Second Step - Create Object Box
    createObjectBox: function (index) {
        /* Clone object-box template */
        const templateElem = document.getElementById('template-object');
        const contentTemplate = document.importNode(templateElem.content, true);

        /* Modify content value */
        contentTemplate.querySelector('.object-box').id = `id_${index}`;

        /* Add content to the view */
        const objectView = document.getElementById('object-view');
        objectView.append(contentTemplate);
    }
}

document.addEventListener('DOMContentLoaded', app.init);