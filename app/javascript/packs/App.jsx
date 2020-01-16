// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NewFishForm from './NewFishForm';
import FishTable from './FishTable';

const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class App extends React.Component {
    constructor(props){
      super(props);
      
      this.state = {
        fish: [],
        editingFishId: null,
        showForm: false
      };
      
      this.addFish = this.addFish.bind(this);
      this.deleteFish = this.deleteFish.bind(this);
      this.toggleForm = this.toggleForm.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
      this.editFish = this.editFish.bind(this);
    }
    
    toggleForm() {
      this.setState(state => ({
        showForm: !state.showForm
      }));
    }
    
    cancelEdit() {
      this.setState({
        editingFishId: null
      });
    }
    
    handleEdit(fishId) {
      this.setState(state => ({
        editingFishId: fishId
      }));
    }
    
    deleteFish(fishId){
      axios
        .delete(`/fish/${fishId}`)
        .then(response => {
          const fish = this.state.fish.filter(fish => fish.id !== fishId);
          this.setState({
            fish: fish
          });
          alert('You deleted the fish');
        })
        .catch(error => console.log(error));
    }
    
    editFish(fishId, common_name, species_name, location) {
      axios
        .patch(`/fish/${fishId}`, {fish: { common_name, species_name, location }})
        .then(response => {
          const updatedFish = response.data;
          console.log(updatedFish);
          const allFish = this.state.fish.map(fish => {
            return(fish.id === fishId ? updatedFish : fish);
          });
          
          this.setState({
            fish: allFish,
            editingFishId: null
          })
          
        })
    }
    
    addFish(common_name, species_name, location) {
      axios
      .post('/fish', {fish: { common_name, species_name, location }})
      .then(response => {
        const newFish = response.data;
        this.setState(state => ({
          fish: [ ...state.fish, newFish ],
          showForm: false,
        }));
        alert('You added the fish');
      })
      .catch(error => 
        console.log(error)
      );
    }
    
    componentDidMount() {
      axios.get('/fish')
      .then(response => {
          this.setState({
              fish: response.data
          });
      })
      .catch(error => console.log(error));
    }
  
  render() {
    return(
      <div className="container">
        <div>
          <button className="btn btn-primary" 
                  onClick={this.toggleForm}>
            {this.state.showForm ? "Cancel" : "Add Fish"}
          </button>
          { this.state.showForm &&
            <NewFishForm addFish={this.addFish} />
          }
        </div>
        <FishTable fish={this.state.fish} 
                   handleDelete={this.deleteFish}
                   editingFishId={this.state.editingFishId}
                   cancelEdit={this.cancelEdit}
                   handleEdit={this.handleEdit}
                   editFish={this.editFish}/>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.getElementById("root"),
  );
});
