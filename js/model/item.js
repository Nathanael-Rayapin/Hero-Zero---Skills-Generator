const Item = class {
  id;
  type;
  strength;
  condition;
  brain;
  insight;

  constructor(id, type, strength, condition, brain, insight) {
    this.id = id;
    this.type = type;
    this.strength = strength;
    this.condition = condition;
    this.brain = brain;
    this.insight = insight;
  }
};