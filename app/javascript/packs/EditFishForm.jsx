import React from 'react';

class EditFishForm extends React.Component {
  constructor(props) {
    super(props);
    const { common_name, species_name, location} = props.fish;
    
    this.state = {
      commonName: common_name,
      speciesName: species_name, 
      location: location
    };
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value 
    });
  }
  
  handleSaveEdit() {
    const { commonName, speciesName, location } = this.state;
    const fishId = this.props.fish.id;
    
    this.props.editFish(fishId, commonName, speciesName, location);
  }
  
  render() {
    const { commonName, speciesName, location } = this.state;
    const errors = this.props.errors;
    console.log(errors)
    return (
      <tr>
        <td>
          <input name="commonName"
                 value={commonName}
                 onChange={this.handleChange}/>
          {errors.common_name &&
              (<small className="form-text text-danger">
                {errors.common_name.join(" and ")}
               </small>)}
        </td>
        <td>
          <input name="speciesName"
                 value={speciesName}
                 onChange={this.handleChange}/>
            {errors.species_name &&
              (<small className="form-text text-danger">
                {errors.species_name.join(" and ")}
               </small>)}
        </td>
        <td>
          <textarea className="edit-location" name="location"
                 value={location}
                 onChange={this.handleChange}/>
                 {errors.location &&
              (<small className="form-text text-danger">
                {errors.location.join(" and ")}
               </small>)}
        </td>
        <td>
          <button className="btn btn-default"
                  onClick={this.props.cancelEdit}>
            Cancel
          </button>
          <button className="btn btn-default"
                  onClick={this.handleSaveEdit}>Save
          </button>
        </td>
      </tr>
    )
  }
}

export default EditFishForm;