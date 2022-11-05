const app = {
    // Re-usable Element 
    configuration: {
        objectView: null,
        btnGenerator: null
    },

    // Initialization
    init: function () {
        const inputConfirmElem = document.querySelector('#objectNumber + button');
        inputConfirmElem.addEventListener('click', app.retrieveObjectInput);

        app.btnGenerator = document.getElementById('btn-test');
        app.btnGenerator.addEventListener('click', app.retrieveObjectValues);
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
        helpers.addOrRemoveObjectBox(parseInt(inputValue.value));

        /* After creating all Objects, update objects positions
        and Show or Hide button Generator */
        helpers.updateObjectPosition();
        helpers.displayOrHide();
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

    // Fourth Step - Retrieve Objects Values
    retrieveObjectValues: function () {
        /* Init Error boolean and Items array */
        let newItems = [];
        let newError = false;

        if (!app.objectView) {
            return;
        }

        /* Retrieve all Values */
        const objectsBox = app.objectView.querySelectorAll('.object-box');
        objectsBox.forEach((box) => {
            const itemType = box.querySelector('select').value;
            const itemStrength = parseInt(box.querySelector('.strength').value);
            const itemCondition = parseInt(box.querySelector('.condition').value);
            const itemBrain = parseInt(box.querySelector('.brain').value);
            const itemInsight = parseInt(box.querySelector('.insight').value);

            /* Instancie new Class Item */
            const item = new Item(itemType, itemStrength, itemCondition, itemBrain, itemInsight);

            // Manage Error => Watch Key/Value, skip key = 'type'
            Object.entries(item).forEach(([key, value]) => {
                /* Case : Error */
                if (!(key === 'type') && isNaN(value)) {
                    console.log("Erreur : Informations Manquantes");
                    box.querySelector(`.${key}`).style.border = "1px solid red";
                    newError = true;
                }

                /* Case : Not Error */
                if (!(key === 'type') && !(isNaN(value))) {
                    box.querySelector(`.${key}`).style.border = "0px solid black";
                }
            })

            if (newError) return;
            newItems.push(item);
        });

        if (newItems.length > 0) {
            app.buildUniqueValues(newItems);
        }
    },

    // Build Unique Value and set aside the Rest
    buildUniqueValues: function (newItems) {
        const duplicateItems = [];
        const currentItems = []
        const uniqueItems = new Set();

        /* Sort newItems by ASC */
        // newItems.sort((a, b) => (a.id > b.id ? 1 : -1))

        for (const item of newItems) {
            if (uniqueItems.has(item.type)) {
                duplicateItems.push(item);
            } else {
                currentItems.push(item);
                uniqueItems.add(item.type);
            }
        }

        console.log("UNIQUE SIZE : ", uniqueItems.size);

        console.log(currentItems);
        console.log(duplicateItems);
        result.sumItemsAttr(currentItems);
        result.calcAndCompare(duplicateItems);  
        
        setTimeout(() => {
            console.log(result.finalResult);
            result.retrieveBestItems();
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', app.init);