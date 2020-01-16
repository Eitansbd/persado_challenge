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
        fish: []
      };
      
      this.addFish = this.addFish.bind(this);
      this.deleteFish = this.deleteFish.bind(this);
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
    
    addFish(new_fish) {
      this.setState(state => ({
        fish: [ ...state.fish, new_fish ]
      }));
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
    
    handleSubmit(e) {
      
    }
  
  render() {
    return(
      <div>
        <FishTable fish={this.state.fish} onDelete={this.deleteFish} />
        <NewFishForm addFish={this.addFish} />
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
