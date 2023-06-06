import React, {Component, useLayoutEffect} from 'react';
import './TypeZhuyin.css';
import "./index.css";
import {Keyboard} from './Keyboard'
import {KeyMappings} from "./Keyboard";

class TypeZhuyin extends Component {
    //Initialize State
    constructor() {
        super();
        this.state = {gameMode: 0, score: 0, keyboardOn: 1, bpmf: new KeyMappings(), index: 0};
        this._handleKeyDown = this._handleKeyDown.bind(this)
        this.state.bpmf.generateQuery()


    }

    _handleKeyDown(e){
        let element = document.getElementById(e.code)
        if(typeof(element) != 'undefined' && element != null && typeof(this.state) != 'undefined') {

            element.style.backgroundColor = '#1E88E5'
        }
        let query = this.state.bpmf.query
        if(e.code === query[this.state.index]['code']){
            document.getElementById((this.state.index).toString().concat(e.code)).style.color = 'black'
            this.setState({index: this.state.index + 1})
        }
        else{

        }
    }


    _handleKeyRelease(e){
        let element = document.getElementById(e.code)
        if(typeof(element) != 'undefined' && element != null){
            element.style.backgroundColor = '#FFC107'
        }
    }


    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown)
        document.addEventListener("keyup", this._handleKeyRelease)

    }

    handleModeSelection(mode) {
        this.setState({gameMode: mode})
    }

    handleEnterInput(e) {
        if (e.key === 'Enter') {
            let sentenceInput = document.getElementById("practiceText").textContent;
            if (sentenceInput === this.sentence){
                prompt("Yay")
            }
            else {
                prompt("Boo")
            }
        }
    }

    renderQuery(){
        let query = this.state.bpmf.query
        let queryTest = []
        for (let i = 0; i < query.length; i++) {
            queryTest.push(<span id={(i).toString().concat(query[i].code)}>{query[i]['character']}</span>)
        }
        return queryTest
    }

    memorizationPractice(){
        let score = this.state.score;
        return(
            <div id={"container"}>
                <div id={"practiceText"}>{this.renderQuery()}</div>
            </div>
        );
    }


    memorizationGame(){
        return (
            <div id={"container"}>
                <p id={"practiceText"}>{this.sentence}</p>
                <Keyboard/>
            </div>
        )
    }

    gameScreen(){
        let gameMode = 1
        if (gameMode == 0) {
            return (
                <div>
                    <p>BoPoMoFo Keyboard Crash Course</p>
                    <button onClick={() => this.handleModeSelection(1)}> Learn</button>
                    <button onClick={() => this.handleModeSelection(2)}> Quiz</button>
                </div>
            )
        }
        else if (gameMode == 1) {
            return (
                <div id={"container"}>
                    <p>{this.memorizationPractice()}</p>
                    <Keyboard/>

                </div>
            )
        }
        else {
            return (
                <div>
                    <p>Quiz Time</p>
                </div>
            )
        }
    }

    render(){
        return(this.gameScreen());
    }
}

export default TypeZhuyin;