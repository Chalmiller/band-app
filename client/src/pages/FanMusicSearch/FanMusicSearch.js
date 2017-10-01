import React, { Component } from 'react';
import MusicSearchBar from "../../components/MusicSearchBar/MusicSearchBar";
import DisplayGenres from "../../components/DisplayGenres/DisplayGenres";
import API from '../../utils/API';
import './FanMusicSearch.css';

class FanMusicSearch extends Component{
  constructor(){
    super();
    this.state = {
      allBands : [],
      filteredBands: []
    }
  }

  getDataFromChild = (dataFromChild) =>{
    //we will use data from child here
    if(!dataFromChild.length){
      console.log("artist's dont exist");
      this.setState({
        filteredBands: this.state.allBands
      })
    }else{
      console.log("artists exist!");
      this.setState({
        filteredBands: dataFromChild
      })
    }
  }

  componentDidMount(){
    API.getBands()
        .then(res =>
          this.setState({
            allBands:res.data,
            filteredBands: res.data
          })
        )
        .catch(err => console.log(err));
  }

  render(){
    return(
      <div className="musicSearch">
        <h2>Well hello there?</h2>
        <h4>What kind of music are you looking for?</h4>
        <MusicSearchBar
        bandStuff = {this.state.filteredBands}
        callBackFromParent = {this.getDataFromChild}/>
        <DisplayGenres
        bandData = {this.state.filteredBands}/>
      </div>

    )
  }
}



export default FanMusicSearch;
