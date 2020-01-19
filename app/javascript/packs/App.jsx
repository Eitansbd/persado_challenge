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
      pagesLoaded: 0,
      showForm: false,
      newFormErrors: {},
      editingFishId: null,
      editFormErrors: {}
    };
    
    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.handleBeginEdit = this.handleBeginEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.getFish = this.getFish.bind(this);
    this.handleSubmitNewFish = this.handleSubmitNewFish.bind(this);
    this.handleDeleteFish = this.handleDeleteFish.bind(this);
    this.handleSubmitEditFish = this.handleSubmitEditFish.bind(this);
  }
  
  toggleShowForm() {
    this.setState(state => ({
      showForm: !state.showForm,
      newFormErrors: {}
    }));
  }
  
  handleBeginEdit(fishId) {
    this.setState(state => ({
      editingFishId: fishId
    }));
  }
  
  handleCancelEdit() {
    this.setState({
      editingFishId: null,
      editFormErrors: {}
    });
  }
  
  handleSubmitNewFish(common_name, species_name, location) {
    axios
    .post('/fish', {fish: { common_name, species_name, location }})
    .then(response => {
      const newFish = response.data;
      this.setState(state => ({
        allFish: [ ...state.allFish, newFish ],
        showForm: false,
      }));
    })
    .catch(error => {
      if (error.response) {
        const errors = error.response.data.errors;
        this.setState({
          newFormErrors: errors
        });
      } else {
        console.log(error);
      }
    });
  }
  
  handleDeleteFish(fishId){
    axios
      .delete(`/fish/${fishId}`)
      .then(response => {
        const allFish = this.state.allFish.filter(fish => fish.id !== fishId);
        this.setState({
          allFish: allFish
        });
      })
      .catch(error => console.log(error));
  }
  
  handleSubmitEditFish(fishId, common_name, species_name, location) {
    axios
      .patch(`/fish/${fishId}`, {fish: { common_name, species_name, location }})
      .then(response => {
        const updatedFish = response.data;
        const allFish = this.state.allFish.map(fish => {
          return(fish.id === fishId ? updatedFish : fish);
        });
        this.setState({
          allFish: allFish,
          editingFishId: null,
          editFormErrors: {}
        });
        
      })
      .catch(error => {
        if (error.response) {
         const errors = error.response.data.errors;
         this.setState({
           editFormErrors: errors
         });
        } else {
         console.log(error);
        }
      });
  }
  
  getFish() {
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
    this.getFish();
  }

  render() {
    return(
      <div className="container mt-4 mb-4">
        <div className="mb-2">
          <button className="btn btn-primary" 
                  onClick={this.toggleShowForm}>
            {this.state.showForm ? "Cancel" : "Add Fish"}
          </button>
          { this.state.showForm &&
            <NewFishForm onSubmitNewFish={this.handleSubmitNewFish}
                         errors={this.state.newFormErrors} />
          }
        </div>
        <div>
          <FishTable allFish={this.state.allFish}
                     editingFishId={this.state.editingFishId}
                     errors={this.state.editFormErrors}
                     onBeginEdit={this.handleBeginEdit}
                     onCancelEdit={this.handleCancelEdit}
                     onSubmitEditFish={this.handleSubmitEditFish}
                     onDeleteFish={this.handleDeleteFish}/>
        </div>
        <div className="text-center" >
          <button className="btn btn-primary"
                  onClick={this.getFish}>
            Load More
          </button>
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
