import React, {Component, useLayoutEffect} from 'react';
import {Keyboard} from './Keyboard'
import {KeyMappings} from "./Keyboard";
import './TypeZhuyin.css';

let zhuyinDictionary = {  '你': 'ㄋㄧˇ',
    '跟': 'ㄍㄣ',
    '我': 'ㄨㄛˇ',
    '一': 'ㄧ',
    '起': 'ㄑㄧˇ',
    '去': 'ㄑㄩˋ',
    '吗': 'ㄇㄚ˙'}

const Mode = {
    Character: 'Character',
    Word: 'Word'
}

/**
 * Different types of assist modes, guide will show you where the keys are for every character, hint will show you the keys
 * only if you get it wrong once
 * @type {{Guide: string, Hint: string, None: string}}
 */
const Assist = {
    None: 'None',
    Guide: 'Guide',
    Hint: 'Hint'
}
class TypeZhuyin extends Component {
    /**
     * @param gameMode type of typing practice
     * @param index index of current 'cursor'/character to be typed
     * @param totalLen total length of query
     * @param queryList list of keys to be pressed
     */

    constructor() {
        super();
        this.state = {gameMode: Mode.Character, score: 0, keyboardOn: 1, bpmf: new KeyMappings(), index: 0, totalLen: 0, guess: false,
        queryList: [], subIndex: 0, assist: Assist.Hint};
        this._handleKeyDown = this._handleKeyDown.bind(this)
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
        if (this.state.index == this.state.queryList.length) {
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
        let query = this.state.queryList
        console.log(query[this.state.index]['character'])
        if (code === query[this.state.index]['code']) {
            // Turn character another color
            document.getElementById((this.state.index).toString().concat("_queryList")).style.color = 'black'
            console.log(this.state.index)
            this.setState((state) => ({index: state.index + 1}))
            // If we are in the typing word game mode
            if (this.state.gameMode === Mode.Word){
                this.setState((state) => ({subIndex: state.subIndex + 1}))
            }
            if (typeof(query[this.state.index + 1]) == "string"){
                // Set next index to black, indicating the word has completed
                document.getElementById((this.state.index + 1).toString().concat("_queryList")).style.color = 'black'
                this.setState((state) => ({index: state.index + 1}))
                this.setState(() => ({subIndex: 0}))
            }
        }
        else {
            // This section is for the word mode
            for (let i = 1; i <= this.state.subIndex; i++){
                document.getElementById((this.state.index - i).toString().concat("_queryList")).style.color = 'gray'
                this.setState((state) => ({index: state.index - 1}))
                console.log("Resetting state index")
                console.log(this.state.index)
            }
            this.setState({subIndex: 0})
            // This section is for the character mode
            if (this.state.gameMode === Mode.Character && this.state.assist === Assist.Hint){
                document.getElementById(query[this.state.index]['code']).style.backgroundColor = "#F23869";
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
        this.generateQuery()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown, false)
        document.removeEventListener("keyup", this._handleKeyRelease, false)

    }

    handleModeSelection(mode) {
        this.setState({gameMode: mode})
    }

    memorizationPractice(){
        return(
            <div>
                <div id={"practiceText"}>{this.wordPractice()}</div>
            </div>
        );
    }

    wordPractice(){
        let queryList = this.state.queryList
        let display = []
        if (this.state.gameMode === Mode.Word) {
            let sub = []
            // let char of sentence
            for (let i = 0; i < queryList.length; i++) {
                if (typeof (queryList[i]) === "string") {
                    let char = queryList[i]
                    display.push(<div class={"char_guide"}>
                        <div class={"char_char"} id={i.toString().concat("_queryList")}>{char}</div>
                        <div class={"char_zhuyin"}>{sub}</div>
                    </div>)
                    sub = []
                } else {
                    sub.push(<span id={i.toString().concat("_queryList")}>{queryList[i]['character']}</span>)
                }
            }
        }
        else if(this.state.gameMode === Mode.Character){
            for (let i = 0; i < queryList.length; i++) {
                let char = queryList[i]['character']
                display.push(<div class={"char_guide"} id={i.toString().concat("_queryList")}>{char}</div>)
            }
        }
        return(
            <span>{display}</span>
        )

    }

    generateQuery() {
        let query = []
        if (this.state.gameMode === Mode.Word) {
            let sentence = "你跟我一起去吗"
            for (let i = 0; i < sentence.length; i++) {
                let char = sentence[i]
                let sub = zhuyinDictionary[char]
                for (let subChar of sub) {
                    query.push(this.state.bpmf.getMapping(subChar))
                }
                query.push(sentence[i])
            }
        }
        else if(this.state.gameMode === Mode.Character) {
            let genCount = 10
            for (let i = 0; i < genCount; i++){
                let rand = Math.floor(Math.random() * 41);
                query.push(this.state.bpmf.mapping[rand])
            }
        }
        this.setState({queryList: query, subIndex: 0, index: 0})
    }

    triggerAssist(){
        // If answer is wrong, turn key into that color, make letter turn pink and then red to indicate wrong answer
        this.setState({assist: true})
    }

    /**
     * Resets the characters on screen and generates new characters to replace them.
     */
    resetCharacters(){
        this.generateQuery()
        for (let i = 0; i < this.state.queryList.length; i++){
            document.getElementById((i).toString().concat('_queryList')).style.color = 'grey'
        }
        this.setState({index: 0})
    }

    changeModes(){
        const gameMode = this.state.gameMode
        let newGameMode = Mode.Character
        if (gameMode === Mode.Word){
            newGameMode = Mode.Character
        }
        else{
            document.getElementById(this.state.queryList[this.state.index]['code']).style.backgroundColor = 'white';
            newGameMode = Mode.Word
        }

        this.setState({gameMode: newGameMode}, () => {
            this.generateQuery()
        })
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
                        <button className={"modeButton"} onClick={() => this.changeModes()}>Change Modes</button>
                        <button className={"modeButton"} onClick={() => null}>Change Language (tba)</button>
                        <p>{this.memorizationPractice()}</p>
                        <Keyboard/>
                    </div>
                    <div id={"moreInfo"}>
                        {/*<button id={"githubButton"} onClick={this.viewGithub}> <img id={"githubLogo"} src={process.env.PUBLIC_URL + '/github-mark.svg'}/> Github Repository</button>*/}
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
        return(
            <div class={"content"}>
                {this.gameScreen()}
            </div>);
    }
}

export default TypeZhuyin;
