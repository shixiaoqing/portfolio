import React, {Component, useLayoutEffect} from 'react';
import {Keyboard} from './Keyboard'
import {KeyMappings} from "./Keyboard";
import './TypeZhuyin.css';

class TypeZhuyin extends Component {
    constructor() {
        super();
        this.state = {gameMode: 0, score: 0, keyboardOn: 1, bpmf: new KeyMappings(), index: 0, guess: false};
        this._handleKeyDown = this._handleKeyDown.bind(this)
        this.state.bpmf.generateQuery()

    }

    /**
     * Handles key down events and progresses the typing 'test'.
     * @param e     event object
     * @private
     */
    _handleKeyDown(e){
        let element = document.getElementById(e.code)
        if(typeof(element) != 'undefined' && element != null && typeof(this.state) != 'undefined') {

            element.style.backgroundColor = '#CACACA'
        }
        if (this.state.index >= 10) {
            this.resetCharacters()
        }
        else {
            {
                this.checkAnswer(e.code)
            }
        }
    }

    /**
     * Checks player input, if it's incorrect, show hint and flag for the character to be colored red to indicate
     * previous wrong guess. If user gets it right the first time, color it black.
     * @param code player input
     */
    checkAnswer(code){
        let query = this.state.bpmf.query
        if (code === query[this.state.index]['code']) {
            if(this.state.guess === true){
                this.state.guess = false;
                document.getElementById((this.state.index).toString().concat(code)).style.color = 'red'
                this.setState({index: this.state.index + 1})
            }
            else{
                document.getElementById((this.state.index).toString().concat(code)).style.color = 'black'
                this.setState({index: this.state.index + 1})
            }
        }
        else {
            this.state.guess = true;
            document.getElementById(query[this.state.index]['code']).style.backgroundColor = 'red';
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

    triggerHint(){
        // If answer is wrong, turn key into that color, make letter turn pink and then red to indicate wrong answer

    }

    /**
     * Resets the characters on screen and generates new characters to replace them.
     */
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

    settingScreen(){
        if(true){
            return(
                <div id={'settings'}>
                    <rect width="100" height="100"/>
                    <h1>Welcome to the setting screen</h1>
                    <p>Type Zhuyin is a web application to help people familiar with Zhuyin learn to type with the
                    QWERTY keyboard and to improve typing speed.</p>
                    <label> Hint<input type={"checkbox"}></input></label>
                    <button>Confirm</button>
                </div>
            )
        }
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
                    {/*{this.settingScreen()}*/}
                    <div id={"container"}>
                        <p>{this.memorizationPractice()}</p>
                        <Keyboard/>
                    </div>
                    <div id={"moreInfo"}>
                        <button id={"githubButton"} onClick={this.viewGithub}> <img id={"githubLogo"} src={process.env.PUBLIC_URL + '/github-mark.svg'}/> Github Repository</button>
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