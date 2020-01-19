import React from 'react';
import EditFishForm from './EditFishForm';


class FishTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sortBy: "common_name",
      SortDirection: "asc"
    };
    
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }
  
  handleChangeSort(sortBy) {
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
    const allFish = [ ...this.props.allFish ];
    const { sortBy, sortDirection } = this.state;
    
    allFish.sort((a,b) => {
      const sortMultiplier = (sortDirection === "asc" ? 1 : -1);
      const comparison = ((a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? 1 : -1);
      return (sortMultiplier * comparison);
    });
        
    return(
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-nowrap" onClick={() => this.handleChangeSort("common_name")}>Common Name
            </th>
            <th scope="col" className="text-nowrap" onClick={() => this.handleChangeSort("species_name")}>Species Name</th>
            <th scope="col" className="text-nowrap">Location</th>
            <th scope="col" className="text-nowrap">Options</th>
          </tr>
        </thead>
        <tbody>
        {allFish.map(fish =>
          (fish.id === this.props.editingFishId) ?
          ( 
            <EditFishForm key={fish.id} 
                          fish={fish}
                          errors={this.props.errors}
                          onCancelEdit={this.props.onCancelEdit}
                          onSubmitEditFish={this.props.onSubmitEditFish} />
          ) :
          (<tr key={fish.id}>
            <td className="text-nowrap">{fish.common_name}</td>
            <td className="text-nowrap">{fish.species_name}</td>
            <td>{fish.location}</td>
            <td className="text-nowrap">
              <button className="btn btn-small btn-default" onClick={() => this.props.onDeleteFish(fish.id)}>Delete
              </button>
              <button className="btn btn-small btn-default" onClick={() => this.props.onBeginEdit(fish.id)}>Edit
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