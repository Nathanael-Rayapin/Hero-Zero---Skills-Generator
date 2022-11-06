const result = {
    // Re-usable Element 
    configuration: {
        currentItems: null,
        finalResult: null
    },

    // Sum of all Unique Current Items
    sumItemsAttr: function (currentItems) {
        result.currentItems = currentItems;
        result.finalResult = [];

        result.calcResultFactory(currentItems);
    },

    // Calculate and Compare with all Duplicate values
    calcAndCompare: function (duplicateItems) {
        if (!(result.currentItems) || duplicateItems.length == 0) return;

        const totalItemsCompared = [];
        for (const item of duplicateItems) {
            /* Retrieve "type" of duplicate items */
            let currentType = item.type;
            /* Retrieve index of this type on current items */
            const index = result.currentItems.map(object => object.type).indexOf(currentType);
            /* Replace current values */
            result.currentItems[index] = item;

            result.calcResultFactory(result.currentItems);
        }
    },

    // Display the Best Items (Ids)
    retrieveBestItems: function () {
        const objectResultValue = document.getElementById('object-result-value');
        objectResultValue.classList.remove('d-none');

        let total = 0;
        let resultStrength = 0;
        let resultCondition = 0;
        let resultBrain = 0;
        let resultInsight = 0;

        const idsSended = [];

        /* Get total of All compared Itms and display the Best Set */
        for (const item of result.finalResult) {
            const newTotal = item.Force + item.Condition + item.Cerveau + item.Intuition;
            if (newTotal > total) {
                total = newTotal;
                resultStrength = item.Force;
                resultCondition = item.Condition;
                resultBrain = item.Cerveau;
                resultInsight = item.Intuition;

                idsSended.splice(0);
                idsSended.push(...item.Identifiants);
            }
        }

        document.getElementById('resultStrength').innerText = resultStrength;
        document.getElementById('resultCondition').innerText = resultCondition;
        document.getElementById('resultBrain').innerText = resultBrain;
        document.getElementById('resultInsight').innerText = resultInsight;

        console.log(idsSended);
        result.getObjectBoxColored(idsSended);
    },

    getObjectBoxColored: function (ids) {
        for (const id of ids) {
            const idSelector = document.querySelector(`#${id}`);
            idSelector.style.background = '#157347';
        }
    },

    // Factory for Calc Total current Items
    calcResultFactory: function (currentItems) {
        const idsLists = [];
        let sumStrength = 0;
        let sumCondition = 0;
        let sumBrain = 0;
        let sumInsight = 0;

        for (const value of currentItems) {
            idsLists.push(value.id);
            sumStrength += value.strength;
            sumCondition += value.condition;
            sumBrain += value.brain;
            sumInsight += value.insight;
        };

        const total = {
            "Identifiants": idsLists,
            "Force": sumStrength,
            "Condition": sumCondition,
            "Cerveau": sumBrain,
            "Intuition": sumInsight
        };

        result.finalResult.push(total);
    }
}