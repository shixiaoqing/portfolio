import React, {Component, useLayoutEffect} from 'react';
import './App.css';
import {Game} from './Game.js';

class App extends Component {
  // Initialize state
  state = {gameStart: false, difficulty: false};

  componentDidMount() {
    this.setGame();
  }

  setGame() {
    const gameStart = false;
    this.setState({
        gameStart: gameStart,
        difficulty: false});
  }

  startGame(){
      this.setState({
          gameStart: true
      })
  }

  handleChangeDifficulty(){
      this.setState({difficulty: !this.state.difficulty})
  }

  introScreen(gameStart){
      const difficulty = this.state.difficulty
      let diff = ""
      if (difficulty == false){
        diff = "Normal";
      }
      else{
              diff = "Hard";
          }

      if(gameStart == false){
          return (
              <div id="menuBox">
                  <p id="title">Simon Says</p>
                  <p id="difficulty" onClick={() => this.handleChangeDifficulty()}> Current Difficulty: {diff} (Click to Change) </p>
                  <div id="simonSays">
                      <div id="red"/>
                      <div id="blue"/>
                      <div id="green"/>
                      <div id="yellow"/>
                  </div>
                  <button id="startGameButton" onClick={() => this.startGame()}>Start Game</button>
              </div>
          );
      }
      else{
          return (
              <Game difficulty={difficulty}/>
          )
      }
  }

render() {
    return (
        this.introScreen(this.state.gameStart)
      );
  }
}

export default App;
