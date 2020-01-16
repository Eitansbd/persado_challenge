import React from 'react';

class FishTable extends React.Component {
  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>Common Name</th>
            <th>Species Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
        {this.props.fish.map(fish => 
          <tr key={fish.id}>
            <td>{fish.common_name}</td>
            <td>{fish.species_name}</td>
            <td>{fish.location}</td>
            <td onClick={() => this.props.onDelete(fish.id)}>Delete</td>
          </tr>
        )}
        </tbody>
      </table>
    );
  }
}

export default FishTable;