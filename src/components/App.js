import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class App extends Component {
  constructor(props){
   super(props);
    this.state = { artistQuery : '', artist : null, tracks : []};
    this.searchArtist=this.searchArtist.bind(this);
    this.updateArtistQuery=this.updateArtistQuery.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
  }
  updateArtistQuery(event){
   // console.log('event',event.target.value);
    this.setState({artistQuery : event.target.value});
  }

    searchArtist(event){
      fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
      .then(response => response.json())
      .then(json => {
        //console.log('json',json);
      if(json.artists.total>0){
        const artist = json.artists.items[0];
        this.setState({artist : artist});

        fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
        .then(response => response.json())
        .then(json => this.setState({tracks : json.tracks}))
        .catch(error=>alert(error.message));
      }
    })
    .catch(error=>alert(error.message));
    }

    handleKeyPress(event){
      if(event.key === 'Enter'){
        this.searchArtist();
      }
    }
  render() {
    console.log('this.state',this.state);
    return (
      <div>
          <h2>Music Master</h2>
          <input 
          onChange={this.updateArtistQuery} onKeyPress={this.handleKeyPress}
           placeholader="Search for an Artist"/>
           <button onClick={this.searchArtist} >Search</button>
           <Artist artist={this.state.artist}/>
           <Tracks tracks={this.state.tracks}/>
        </div>
    )
  }
}

export default App;
