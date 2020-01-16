import React from 'react';
import EditFishForm from './EditFishForm';


class FishTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sortBy: "common_name",
      SortDirection: "desc"
    }
  }
  
  changeSort(sortBy) {
    const sortDirection = this.state.sortDirection === "asc" ? "desc" : "asc";
    this.setState({
      sortDirection: sortDirection,
      sortBy: sortBy
    })
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
      <form>
        <table>
          <thead>
            <tr>
              <th onClick={() => this.changeSort("common_name")}>Common Name</th>
              <th onClick={() => this.changeSort("species_name")}>Species Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
          {fish.map(fish =>
            (fish.id === this.props.editingFishId) ?
            ( 
              <EditFishForm key={fish.id} fish={fish}/>
            ) :
            (<tr key={fish.id}>
              <td>{fish.common_name}</td>
              <td>{fish.species_name}</td>
              <td>{fish.location}</td>
              <td onClick={() => this.props.handleDelete(fish.id)}>Delete</td>
              <td onClick={() => this.props.handleEdit(fish.id)}>edit</td>
              
            </tr>)
          )}
          </tbody>
        </table>
      </form>
    );
  }
}

export default FishTable;