const result = {
    // Re-usable Element 
    configuration: {
        currentItems: null,
        finalResult: null
    },

    // Sum of all Unique Current Items
    sumItemsAttr: function(currentItems) {
        result.currentItems = currentItems;
        result.finalResult = [];

        let sumStrength = 0;
        let sumCondition = 0;
        let sumBrain = 0;
        let sumInsight = 0;

        for (const value of currentItems) {
            sumStrength += value.strength;
            sumCondition += value.condition;
            sumBrain += value.brain;
            sumInsight += value.insight;
        };

        const total ={
            "Force": sumStrength,
            "Condition": sumCondition,
            "Cerveau": sumBrain,
            "Intuition": sumInsight
        };

        result.finalResult.push(total);
    },

    // Calculate and Compare with all Duplicate values
    calcAndCompare: function(duplicateItems) {
        if(!(result.currentItems) || duplicateItems.length == 0) return;

        const totalItemsCompared = [];
        for (const item of duplicateItems) {
            /* Retrieve "type" of duplicate items */
            let currentType = item.type;
            /* Retrieve index of this type on current items */
            const index = result.currentItems.map(object => object.type).indexOf(currentType);
            /* Replace current values */
            result.currentItems[index] = item;

            /* Calcul Total */
            let sumStrength = 0;
            let sumCondition = 0;
            let sumBrain = 0;
            let sumInsight = 0;

            for (const item of result.currentItems) {
                sumStrength += item.strength;
                sumCondition += item.condition;
                sumBrain += item.brain;
                sumInsight += item.insight;
            }

            const total = {
                "Force": sumStrength,
                "Condition": sumCondition,
                "Cerveau": sumBrain,
                "Intuition": sumInsight
            };
            result.finalResult.push(total);
        }
    },

    retrieveBestItems: function() {
       
    }
}