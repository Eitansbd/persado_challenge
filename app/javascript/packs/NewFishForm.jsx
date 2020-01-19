import React from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

class NewFishForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      commonName: "",
      speciesName: "", 
      location: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const { commonName, speciesName, location } = this.state;
    
    this.props.onSubmitNewFish(commonName, speciesName, location);
  }
  
  render() {
    const {commonName , speciesName, location } = this.state;
    const errors = this.props.errors;
    
    return(
      <form className="" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-auto">
            <div className="form-group mr-2">  
              <label>
                Common Name: 
                <input
                  className="form-control"
                  type="text"
                  name="commonName"
                  value={commonName}
                  onChange={this.handleChange}
                />
              </label>
              <ErrorMessage errorMessages={errors.common_name}/>
            </div>
            <div className="form-group mr-2">  
              <label>
                Species Name: 
                <input
                  className="form-control"
                  type="text"
                  name="speciesName"
                  value={speciesName}
                  onChange={this.handleChange}
                />
              </label>
              <ErrorMessage errorMessages={errors.species_name}/>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mr-2">  
              <label className="new-location">
                Location: 
                <textarea 
                  className="form-control"
                  type="text"
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                />
              </label>
              <ErrorMessage errorMessages={errors.location}/>
            </div>
            <button className="btn btn-primary" type="submit">Add Fish</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewFishForm;