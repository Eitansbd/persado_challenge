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
      common_name: "",
      species_name: "", 
      location: ""
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const { common_name, species_name, location } = this.state;
    
    this.props.addFish(common_name, species_name, location)
  }
  
  render() {
    const {common_name , species_name, location } = this.state;
    
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="common_name"
          value={common_name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="species_name"
          value={species_name}
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