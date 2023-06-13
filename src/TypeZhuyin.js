import React, {Component, useLayoutEffect} from 'react';
import './TypeZhuyin.css';
import {Keyboard} from './Keyboard'
import {KeyMappings} from "./Keyboard";

class TypeZhuyin extends Component {
    constructor() {
        super();
        this.state = {gameMode: 0, score: 0, keyboardOn: 1, bpmf: new KeyMappings(), index: 0, time: 0};
        this._handleKeyDown = this._handleKeyDown.bind(this)
        this.state.bpmf.generateQuery()

    }

    _handleKeyDown(e){
        let element = document.getElementById(e.code)
        if(typeof(element) != 'undefined' && element != null && typeof(this.state) != 'undefined') {

            element.style.backgroundColor = '#CACACA'
        }
        let query = this.state.bpmf.query
        if (this.state.index >= 10) {
            this.resetCharacters()
        }
        else {
            if (e.code === query[this.state.index]['code']) {
                document.getElementById((this.state.index).toString().concat(e.code)).style.color = 'black'
                this.setState({index: this.state.index + 1})
            } else {

            }
        }
    }


    _handleKeyRelease(e){
        let element = document.getElementById(e.code)
        if(typeof(element) != 'undefined' && element != null){
            element.style.backgroundColor = '#FFFFFF'
        }
    }


    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown)
        document.addEventListener("keyup", this._handleKeyRelease)

    }

    handleModeSelection(mode) {
        this.setState({gameMode: mode})
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
        return(
            <div>
                <div id={"practiceText"}>{this.renderQuery()}</div>
            </div>
        );
    }

    resetCharacters(){

        const query = this.state.bpmf.query
        console.log(query)
        for (let i = 0; i < 10; i++){
            let e = query[i]
            document.getElementById((i).toString().concat(e.code)).style.color = 'grey'
        }
        this.state.bpmf.generateQuery()
        this.setState({index: 0})

    }

    viewGithub(){
        window.open("https://github.com/shixiaoqing/portfolio/tree/master", "_blank", "noreferrer");
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
                <div>
                    <div id={"moreInfo"}>
                        <button id={"githubButton"} onClick={this.viewGithub}> <img id={"githubLogo"} src={process.env.PUBLIC_URL + '/github-mark.svg'}/> Github Repository</button>
                    </div>
                    <div id={"container"}>
                        <p>{this.memorizationPractice()}</p>
                        <Keyboard/>
                    </div>
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