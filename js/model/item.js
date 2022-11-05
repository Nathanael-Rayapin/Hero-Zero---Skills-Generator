const Item = class {
  type;
  strength = 0;
  condition = 0;
  brain = 0;
  insight = 0;

  constructor(type, strength, condition, brain, insight) {
    this.type = type;
    this.strength = strength;
    this.condition = condition;
    this.brain = brain;
    this.insight = insight;
  }
};