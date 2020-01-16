import React from 'react';
import axios from 'axios';

class NewFishForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = this.clearForm();
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  resetForm() {
    
  }
  
  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }
  
  clearForm() {
    return({
      commonName: "",
      speciesName: "", 
      location: ""
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const { commonName, speciesName, location } = this.state;
    
    this.props.addFish(commonName, speciesName, location);
  }
  
  render() {
    const {commonName , speciesName, location } = this.state;
    
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="commonName"
          value={commonName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="speciesName"
          value={speciesName}
          onChange={this.handleChange}
          />
        <input 
          type="text"
          name="location"
          value={location}
          onChange={this.handleChange}
          />
        <button type="submit">Add Fish</button>
      </form>
    );
  }
}

export default NewFishForm;