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
        /* Declare User object values */
        const strengthByObj = parseInt(document.getElementById('strengthBy').value); 
        const conditionByObj = parseInt(document.getElementById('conditionBy').value); 
        const brainByObj = parseInt( document.getElementById('brainBy').value); 
        const insightByObj = parseInt(document.getElementById('insightBy').value); 

        /* Declare initial array IDS and Greater Objects */
        const itemsGreater = [];

        /* Compare Item with User Objects */
        for (const item of result.finalResult) {
            if (item.Force >= strengthByObj && item.Condition >= conditionByObj && 
                item.Cerveau >= brainByObj && item.Intuition >= insightByObj) {
                itemsGreater.push(item);
            };
        };

        /* Check if itemsGreater is Empty or Not*/
        if(!(itemsGreater?.length)) {
            console.log("No items fit into the requirements");
            return;
        }

        /* Compare Item Between Items (If Exists) */
        const idsSended = [];
        if(itemsGreater?.length && itemsGreater?.length > 1) {

        let total = 0;
        let resultStrength = 0;
        let resultCondition = 0;
        let resultBrain = 0;
        let resultInsight = 0;

        for (const item of itemsGreater) {
            const newTotal = item.Force + item.Condition + item.Cerveau + item.Intuition;
            if(newTotal > total) {
                total = newTotal;
                resultStrength = item.Force;
                resultCondition = item.Condition;
                resultBrain = item.Cerveau;
                resultInsight = item.Intuition;

                idsSended.splice(0);
                idsSended.push(...item.Identifiants);
            };
        };
        }
        
        /* Passed Result to Span (innerText) */
        document.getElementById('resultStrength').innerText = itemsGreater[0].Force || resultStrength;
        document.getElementById('resultCondition').innerText = itemsGreater[0].Condition || resultCondition;
        document.getElementById('resultBrain').innerText = itemsGreater[0].Cerveau || resultBrain;
        document.getElementById('resultInsight').innerText = itemsGreater[0].Intuition || resultInsight;

        /* Get Best Item (Final Result) */
        if(idsSended?.length > 0) {
            result.getObjectBoxColored(idsSended);
        } else {
            result.getObjectBoxColored(itemsGreater[0].Identifiants);
        }
    },

    // Get Colored Object IDS
    getObjectBoxColored: function (ids) {
        for (const id of ids) {
            const idSelector = document.querySelector(`#${id}`);
            idSelector.style.background = '#157347';
        };
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