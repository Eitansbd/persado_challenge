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
        allFish: [],
        editingFishId: null,
        showForm: false,
        pagesLoaded: 0
      };
      
      this.addFish = this.addFish.bind(this);
      this.deleteFish = this.deleteFish.bind(this);
      this.toggleForm = this.toggleForm.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
      this.editFish = this.editFish.bind(this);
      this.fetchFish = this.fetchFish.bind(this);
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
          const allFish = this.state.allFish.filter(fish => fish.id !== fishId);
          this.setState({
            allFish: allFish
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
          const allFish = this.state.allFish.map(fish => {
            return(fish.id === fishId ? updatedFish : fish);
          });
          this.setState({
            allFish: allFish,
            editingFishId: null
          });
          
        })
        .catch(error => 
          console.log(error)
        );
    }
    
    addFish(common_name, species_name, location) {
      axios
      .post('/fish', {fish: { common_name, species_name, location }})
      .then(response => {
        const newFish = response.data;
        this.setState(state => ({
          allFish: [ ...state.allFish, newFish ],
          showForm: false,
        }));
        alert('You added the fish');
      })
      .catch(error => 
        console.log(error)
      );
    }
    
    fetchFish() {
      const nextPage = this.state.pagesLoaded + 1;
      
      axios.get(`/fish?page=${nextPage}`)
      .then(response => {
        const newFish = response.data;
          this.setState(state => ({
              allFish: [ ...state.allFish, ...newFish],
              pagesLoaded: nextPage
          }));
      })
      .catch(error => console.log(error));
    }
    
    componentDidMount() {
      this.fetchFish();
    }
  
  render() {
    return(
      <div className="container mt-4">
        <div className="mb-5">
          <div className="btn-group">
            <button className="btn btn-primary" 
                    onClick={this.toggleForm}>
              {this.state.showForm ? "Cancel" : "Add Fish"}
            </button>
            <button className="btn btn-primary"
                    onClick={this.fetchFish}>
              Load More
            </button>
          </div>
          { this.state.showForm &&
            <NewFishForm addFish={this.addFish} />
          }
        </div>
        <div>
          <FishTable allFish={this.state.allFish} 
                   handleDelete={this.deleteFish}
                   editingFishId={this.state.editingFishId}
                   cancelEdit={this.cancelEdit}
                   handleEdit={this.handleEdit}
                   editFish={this.editFish}/>
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
