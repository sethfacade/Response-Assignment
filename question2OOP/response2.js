class Man {
  constructor() {
    this.openOrCloseMouth = null;
    this.occupation = "";
  }
  open() {
    this.openOrCloseMouth = true;
  }
  close() {
    this.openOrCloseMouth = false;
  }
  whoIsAsking(Man, openOrClose) {
    if (Man.occupation === "doctor") {
      if (openOrClose === "open") {
        this.open();
        return this;
      } else if (openOrClose === "close") {
        this.close();
        return this;
      }
    } else {
      return `I will only follow commands from a doctor`;
    }
  }
}

class Doctor extends Man {
  constructor() {
    super();
    this.occupation = "doctor";
  }
}

class Receptionist extends Man {
  constructor() {
    super();
    this.occupation = "receptionist";
  }
}

// Test //
const man = new Man();
const doctor = new Doctor();
const receptionist = new Receptionist();
console.log(man.whoIsAsking(doctor, "open"));
console.log(man.whoIsAsking(receptionist, "open"));
