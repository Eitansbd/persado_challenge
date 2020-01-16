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
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">  
          <label>
          Common Name: 
          <input
            className="form-control"
            type="text"
            name="commonName"
            value={commonName}
            placeholder="common name"
            onChange={this.handleChange}
          />
          </label>
        </div>
        <div className="form-group">  
          <label>
          Species Name: 
        <input
          className="form-control"
          type="text"
          name="speciesName"
          value={speciesName}
          placeholder="species name"
          onChange={this.handleChange}
          />
          </label>
        </div>
        <div className="form-group">  
          <label>
          Location: 
        <input 
          className="form-control"
          type="text"
          name="location"
          value={location}
          placeholder="location"
          onChange={this.handleChange}
          />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">Add Fish</button>
      
      </form>
    );
  }
}

export default NewFishForm;