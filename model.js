const Item = class {
    type;
    strength = 0;
    brain = 0;
    condition = 0;
    insight = 0;

    constructor(type, strength, brain, condition, insight) {
      this.type = type;
      this.strength = strength;
      this.brain = brain;
      this.condition = condition;
      this.insight = insight;
    }
  };