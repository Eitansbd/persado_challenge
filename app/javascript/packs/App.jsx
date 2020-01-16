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
    }
    
    toggleForm() {
      this.setState(state => ({
        showForm: !state.showForm
      }));
    }
    
    deleteFish(fish_id){
      axios
        .delete(`/fish/${fish_id}`)
        .then(response => {
          alert('deleted');
          const fish = this.state.fish.filter(fish => fish.id !== fish_id);
          this.setState({
            fish: fish
          });
        })
        .catch(error => console.log(error));
    }
    
    addFish(common_name, species_name, location) {
      axios
      .post('/fish', {fish: { common_name, species_name, location }})
      .then(response => {
        const newFish = response.data;
        this.setState(state => ({
          fish: [ ...state.fish, newFish ],
          showForm: false
        }));
      })
      .catch(error => 
        console.log(error)
      );
    }
    
    componentDidMount() {
      axios.get('/fish')
      .then(response => {
          console.log(response);
          this.setState({
              fish: response.data
          });
      })
      .catch(error => console.log(error));
    }
  
  render() {
    return(
      <div>
        <FishTable fish={this.state.fish} 
                   onDelete={this.deleteFish}
                   editingFishId={this.state.editingFishId}/>
        <div>
          <button onClick={this.toggleForm}>
            {this.state.showForm ? "Cancel" : "Add Fish"}
          </button>
          { this.state.showForm &&
            <NewFishForm addFish={this.addFish} />
          }
        </div>
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
