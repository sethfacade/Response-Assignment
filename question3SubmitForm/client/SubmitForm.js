import React from "react";
import axios from "axios";

class CourseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      choiceA: "",
      choiceB: "",
      choiceC: "",
      validation: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async postRequest(data) {
    try {
      await axios.post(`/api/submit`, data);
      alert("Form has been succesfuly submitted!");
    } catch (err) {
      console.error("Unable to post the data");
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    let temp = false;
    const dataToSendBackEnd = {};

    // Loop through the current state and if it's a string, convert it to lowercase and check if one of them has calculus in it //
    for (let choices in this.state) {
      if (typeof this.state[choices] === "string") {
        dataToSendBackEnd[choices] = this.state[choices].toLowerCase();
        if (dataToSendBackEnd[choices] === "calculus") {
          temp = true;
        }
      }
    }
    // If there is calculus in one of the input choices then proceed to send the data to backend //
    if (temp) {
      await this.postRequest(dataToSendBackEnd);
    } else {
      // Set validation to false if there is no calculus so that the page renders to have calculus as a choice //
      this.setState({ validation: false });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const validation = this.state.validation;
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="choiceA">Choice A: </label>
          <input
            name="choiceA"
            type="text"
            value={this.state.choiceA}
            onChange={this.handleChange}
          />
          <label htmlFor="choiceB">Choice B:</label>
          <input
            name="choiceB"
            type="text"
            value={this.state.choiceB}
            onChange={this.handleChange}
          />
          <label htmlFor="choiceC">Choice C:</label>
          <input
            name="choiceC"
            type="text"
            value={this.state.choiceC}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {!validation && <div>Please have Calculus as one of your choices</div>}
      </div>
    );
  }
}

export default CourseForm;
