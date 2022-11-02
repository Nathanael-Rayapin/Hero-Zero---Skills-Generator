const app = {
    // Re-usable Element 
    configuration: {
        objectView: null
    },

    // Initialization
    init: function () {
        const btnElem = document.querySelector('#objectNumber + button');
        btnElem.addEventListener('click', app.retrieveObjectInput);
    },

    // First Step - Retrieve Object Input
    retrieveObjectInput: function () {
        /* If clones are already present, delete all */
        if (app?.objectView && app?.objectView.querySelectorAll('.object-box').length > 0) {
            app.objectView.querySelectorAll('.object-box').forEach((box) => {
                box.remove();
            })
        }

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
            app.createObjectBox(index + 1);
        }

        /* After creating all Objects, update objects positions */
        app.updateObjectPosition();
    },

    // Second Step - Create Object Box
    createObjectBox: function (index) {
        /* Clone object-box template */
        const templateElem = document.getElementById('template-object');
        const contentTemplate = document.importNode(templateElem.content, true);

        /* Modify content value */
        contentTemplate.querySelector('.object-box').id = `id_${index}`;

        /* Add content to the view */
        app.objectView = document.getElementById('object-view');
        app.objectView.append(contentTemplate);
    },

    // Third Step - Update Objects Positions
    updateObjectPosition: function () {
        if (!app.objectView) {
            return;
        }
        const objectNumber = app.objectView.querySelectorAll('.object-box');
        if (objectNumber.length < 6) {
            objectNumber.forEach((box) => {
                box.classList.add('me-3');
            })
            app.objectView.classList.remove('justify-content-between');
        } else {
            objectNumber.forEach((box) => {
                box.classList.remove('me-3');
            })
            app.objectView.classList.add('justify-content-between');
        }
    }
}

document.addEventListener('DOMContentLoaded', app.init);