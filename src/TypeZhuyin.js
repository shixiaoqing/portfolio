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

class TypeZhuyin extends Component {
    /**
     * @param gameMode type of typing practice
     * @param index index of current 'cursor'/character to be typed
     * @param totalLen total length of query
     * @param queryList list of keys to be pressed
     */
    constructor() {
        super();
        this.state = {gameMode: 1, score: 0, keyboardOn: 1, bpmf: new KeyMappings(), index: 0, totalLen: 0, guess: false,
        queryList: [], subIndex: 0};
        this._handleKeyDown = this._handleKeyDown.bind(this)
        this.state.bpmf.generateQuery()
        this.generateQuery()

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

    gameModeFormWords(){
        if (this.state.index >= this.state.queryList.length){
            // reset
        }
        else {

        }
    }

    /**
     * Checks player input, if it's incorrect, show hint and flag for the character to be colored red to indicate
     * previous wrong guess. If user gets it right the first time, color it black.
     * @param code player input
     */
    // checkAnswer(code){
    //     let query = this.state.bpmf.query
    //     if (code === query[this.state.index]['code']) {
    //         if(this.state.guess === true){
    //             this.state.guess = false;
    //             document.getElementById((this.state.index).toString().concat(code)).style.color = 'red'
    //             this.setState({index: this.state.index + 1})
    //         }
    //         else{
    //             document.getElementById((this.state.index).toString().concat(code)).style.color = 'black'
    //             this.setState({index: this.state.index + 1})
    //         }
    //     }
    //     else {
    //         this.state.guess = true;
    //         document.getElementById(query[this.state.index]['code']).style.backgroundColor = 'red';
    //     }
    // }

    checkAnswer(code){
        let query = this.state.queryList
        console.log(query[this.state.index])
        if (code === query[this.state.index]['code']) {
            // Turn character another color
            document.getElementById((this.state.index).toString().concat("_queryList")).style.color = 'black'
            this.setState({index: this.state.index + 1})
            // If we are in the typing word game mode
            if (this.state.gameMode === 1){
                this.setState({subIndex: this.state.subIndex + 1})
            }

            if (typeof(query[this.state.index]) == "string"){
                // Set next index to black, indicating the word has completed
                this.setState({index: this.state.index + 1})
                document.getElementById((this.state.index).toString().concat("_queryList")).style.color = 'black'
                this.setState({subIndex: 0})
            }
        }
        else {
            for (let i = 0; i < this.state.subIndex; i++){
                this.setState({index: this.state.index - 1})
                document.getElementById((this.state.index).toString().concat("_queryList")).style.color = 'grey'
            }
            this.setState({subIndex: 0})
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
                <div id={"practiceText"}>{this.wordPractice()}</div>
            </div>
        );
    }

    /**
     * Returns the sub Zhuyin characters per character.
     */
    renderSubZhuyin(character){
        // pretend we turned the character into bpmf characters

        let zhuyin_display = []

        let chars = character
        for (let i = 0; i < chars.length; i++){
            zhuyin_display.push(<span>{chars[i]}</span>)
        }
        return zhuyin_display
    }

    wordPractice(){
        let queryList = this.state.queryList
        let display = []
        let sub = []
        let zhuyin_display = []
        // let char of sentence
        for (let i = 0; i < queryList.length; i++) {
            if (typeof(queryList[i]) === "string"){
                let char = queryList[i]
                display.push(<div class = {"char_guide"}><div class = {"char_char"} id = {i.toString().concat("_queryList")}>{char}</div><div class ={"char_zhuyin"}>{sub}</div></div>)
                sub = []
            }
            else{
                sub.push(<span id={i.toString().concat("_queryList")}>{queryList[i]['character']}</span>)
            }
            // let char = sentence[i]
            // let sub = zhuyinDictionary[char]
            // display.push(<div class={"char_guide"}><div class={"char_char"}>{char}</div><span class={"char_zhuyin"}>{this.renderSubZhuyin(sub)}</span></div>)
        }
        console.log(document.getElementById("0_queryList"))
        return(
            <span>{display}</span>
        )

    }

    generateQuery(){
        let sentence = "你跟我一起去吗"
        let query = []
        for (let i = 0; i< sentence.length; i++){
            let char = sentence[i]
            let sub = zhuyinDictionary[char]
            for (let subChar of sub){
                query.push(this.state.bpmf.getMapping(subChar))
            }
            query.push(sentence[i])
        }
        this.state.queryList = query
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
