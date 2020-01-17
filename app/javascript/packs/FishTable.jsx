import React from 'react';
import EditFishForm from './EditFishForm';


class FishTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sortBy: "common_name",
      SortDirection: "asc"
    };
  }
  
  changeSort(sortBy) {
    let sortDirection;
    if (this.state.sortBy === sortBy) {
      sortDirection = this.state.sortDirection === "asc" ? "desc" : "asc";
      this.setState({
        sortDirection: sortDirection
      });
    } else {
      this.setState({
        sortBy: sortBy
      });
    }
  }
  
  render() {
    const fish = [ ...this.props.fish ];
    const { sortBy, sortDirection } = this.state;
    fish.sort((a,b) => {
      const sortMultiplier = (sortDirection === "asc" ? 1 : -1);
      const comparison = ((a[sortBy] > b[sortBy]) ? 1 : -1);
      return (sortMultiplier * comparison);
    });
    
    
    return(
      
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" onClick={() => this.changeSort("common_name")}>Common Name
              </th>
              <th scope="col" onClick={() => this.changeSort("species_name")}>Species Name</th>
              <th scope="col">Location</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
          {fish.map(fish =>
            (fish.id === this.props.editingFishId) ?
            ( 
              <EditFishForm key={fish.id} 
                            fish={fish}
                            cancelEdit={this.props.cancelEdit}
                            editFish={this.props.editFish}/>
            ) :
            (<tr key={fish.id}>
              <td>{fish.common_name}</td>
              <td>{fish.species_name}</td>
              <td>{fish.location}</td>
              <td>
                <button className="btn btn-small btn-default" onClick={() => this.props.handleDelete(fish.id)}>Delete
                </button>
                <button className="btn btn-small btn-default" onClick={() => this.props.handleEdit(fish.id)}>edit
                </button>
              </td>
              
            </tr>)
          )}
          </tbody>
        </table>
      
    );
  }
}

export default FishTable;