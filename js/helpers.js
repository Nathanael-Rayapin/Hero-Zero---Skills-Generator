const helpers = {
    /* Display or Hide button Confirm */
    displayOrHide: function () {
        if (app.objectView && app?.objectView.querySelectorAll('.object-box').length > 0) {
            app.btnGenerator.style.display = 'block';
        } else {
            app.btnGenerator.style.display = 'none';
        }
    },

    // Update Objects Positions
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
    },

    // Add or Remove object depending on User response
    addOrRemoveObjectBox: function (value) {
        /* If Boxes doesn't exist, create Box depending on input value*/
        if (!(app?.objectView)) {
            for (let index = 0; index < value; index++) {
                app.createObjectBox(index + 1);
            }
            return;
        };

        /* If current Boxes exists, backgroundColor back to Default */
        const backgroundToDefault = app?.objectView.querySelectorAll('.object-box');
        backgroundToDefault.forEach((box) => {
            box.style.background = 'linear-gradient(#404447, #23272b)';
        })

        const numberCurrentBox = app?.objectView.querySelectorAll('.object-box').length;
        /* If current Boxes exists and is highter than entered Value, remove */
        if (numberCurrentBox > value) {
            const differenciesValue = numberCurrentBox - value;
            app?.objectView.querySelectorAll(`.object-box:nth-last-child(-n+${differenciesValue})`).forEach((box) => {
                box.remove();
            })
            /* Else, add */
        } else {
            for (let index = numberCurrentBox; index < value; index++) {
                app.createObjectBox(index + 1);
            }
        }
    }
}