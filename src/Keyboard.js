import React, {Component} from "react";

class KeyMappings {
    constructor() {
        this.mapping = [{'character': 'ㄅ', 'key': '1', 'code': 'Digit1', 'sound': 'b'},
            {'character': 'ㄉ', 'key': '2', 'code': 'Digit2', 'sound': 'd'},
            {'character': 'ˇ', 'key': '3', 'code': 'Digit3', 'sound': ''},
            {'character': 'ˋ', 'key': '4', 'code': 'Digit4', 'sound': ''},
            {'character': 'ㄓ', 'key': '5', 'code': 'Digit5', 'sound': 'zh'},
            {'character': 'ˊ', 'key': '6', 'code': 'Digit6', 'sound': ''},
            {'character': '˙', 'key': '7', 'code': 'Digit7', 'sound': ''},
            {'character': 'ㄚ', 'key': '8', 'code': 'Digit8', 'sound': 'a'},
            {'character': 'ㄞ', 'key': '9', 'code': 'Digit9', 'sound': 'ai'},
            {'character': 'ㄢ', 'key': '0', 'code': 'Digit0', 'sound': 'an'},
            {'character': 'ㄦ', 'key': '-', 'code': 'Minus', 'sound': 'er'},
            {'character': 'ㄆ', 'key': 'q', 'code': 'KeyQ', 'sound': 'p'},
            {'character': 'ㄊ', 'key': 'w', 'code': 'KeyW', 'sound': 't'},
            {'character': 'ㄍ', 'key': 'e', 'code': 'KeyE', 'sound': 'g'},
            {'character': 'ㄐ', 'key': 'r', 'code': 'KeyR', 'sound': 'j'},
            {'character': 'ㄔ', 'key': 't', 'code': 'KeyT', 'sound': 'ch'},
            {'character': 'ㄗ', 'key': 'y', 'code': 'KeyY', 'sound': 'z'},
            {'character': 'ㄧ', 'key': 'u', 'code': 'KeyU', 'sound': 'y'},
            {'character': 'ㄛ', 'key': 'i', 'code': 'KeyI', 'sound': 'o'},
            {'character': 'ㄟ', 'key': 'o', 'code': 'KeyO', 'sound': 'ei'},
            {'character': 'ㄣ', 'key': 'p', 'code': 'KeyP', 'sound': 'en'},
            {'character': 'ㄇ', 'key': 'a', 'code': 'KeyA', 'sound': 'm'},
            {'character': 'ㄋ', 'key': 's', 'code': 'KeyS', 'sound': 'n'},
            {'character': 'ㄎ', 'key': 'd', 'code': 'KeyD', 'sound': 'k'},
            {'character': 'ㄑ', 'key': 'f', 'code': 'KeyF', 'sound': 'q'},
            {'character': 'ㄕ', 'key': 'g', 'code': 'KeyG', 'sound': 'sh'},
            {'character': 'ㄘ', 'key': 'h', 'code': 'KeyH', 'sound': 'c'},
            {'character': 'ㄨ', 'key': 'j', 'code': 'KeyJ', 'sound': 'u'},
            {'character': 'ㄜ', 'key': 'k', 'code': 'KeyK', 'sound': 'e'},
            {'character': 'ㄠ', 'key': 'l', 'code': 'KeyL', 'sound': 'au'},
            {'character': 'ㄤ', 'key': ';', 'code': 'Semicolon', 'sound': 'ang'},
            {'character': 'ㄈ', 'key': 'z', 'code': 'KeyZ', 'sound': 'f'},
            {'character': 'ㄌ', 'key': 'x', 'code': 'KeyX', 'sound': 'l'},
            {'character': 'ㄏ', 'key': 'c', 'code': 'KeyC', 'sound': 'h'},
            {'character': 'ㄒ', 'key': 'v', 'code': 'KeyV', 'sound': 'x'},
            {'character': 'ㄖ', 'key': 'b', 'code': 'KeyB', 'sound': 'b'},
            {'character': 'ㄙ', 'key': 'n', 'code': 'KeyN', 'sound': 'n'},
            {'character': 'ㄩ', 'key': 'm', 'code': 'KeyM', 'sound': 'm'},
            {'character': 'ㄝ', 'key': ',', 'code': 'Comma', 'sound': ','},
            {'character': 'ㄡ', 'key': '.', 'code': 'Period', 'sound': '.'},
            {'character': 'ㄥ', 'key': '/', 'code': 'Slash', 'sound': '/'}]
        this.miscKeys = [
            {character: '`', key: '`', code: 'Backquote', sound: null},
            {character: '=', key: '=', code: 'Equal', sound: null},
            {character: 'Backspace', key: 'Backspace', code: 'Backspace', sound: null},
            {character: 'Tab', key: 'Tab', code: 'Tab', sound: null},
            {character: '[', key: '[', code: 'BracketLeft', sound: null},
            {character: ']', key: ']', code: 'BracketRight', sound: null},
            {character: '\\', key: '\\', code: 'Backslash', sound: null},
            {character: 'Caps Lock', key: 'Caps Lock', code: 'CapsLock', sound: null},
            {character: '"', key: '\'', code: 'Quote', sound: null},
            {character: 'Enter', key: 'Enter', code: 'Enter', sound: null},
            {character: 'Shift', key: 'Shift', code: 'ShiftLeft', sound: null},
            {character: 'Shift', key: 'Shift', code: 'ShiftRight', sound: null}

        ]
        this.query = []
    }

    generateQuery(){
        this.query = []
        for (let i = 0; i < 10; i++) {
            let rand = Math.floor(Math.random() * 37);
            this.query.push(this.mapping[rand]);
        }
    }

    getQuery(){
        return this.query
    }

    getQueryString(){
        let queryString = ""
        for(let i = 0; i < this.query.length; i++){
            queryString = queryString.concat(this.query[i]['character'])
        }
        return queryString
    }



}

class Key extends Component{
    hint = true
    letter = this.props.mapping['key']
    code = this.props.mapping['code']
    character = this.props.mapping['character']

    pressKeyStyle = {
        color: "#FFC107"
    }

    render(){
        if (this.character === this.letter){
            return(
                <span id={this.code.concat('SK')} className={"SKey key"}>{this.character}<sup></sup></span>
            )
        }

        else if (this.hint){
            return(
                <span id={this.code} className={"key"}>{this.letter.toUpperCase()}<sup>{this.character}</sup></span>

            )
        }
        else{
            return(
                <span id={this.code} className={"key"}>{this.character}</span>
            )
        }
    }
}

class Keyboard extends Component{

    state = {
        hint: true,
    }
    keyMappings = new KeyMappings()
    mapping = this.keyMappings.mapping
    miscKeys = this.keyMappings.miscKeys



    render(){
        let r1 = []
        r1.push(<Key mapping={this.miscKeys[0]}/>)
        for (let i = 0; i <= 10; i++) {
            r1.push(<Key mapping={this.mapping[i]}/>);
        }
        r1.push(<Key mapping={this.miscKeys[1]}/>)
        r1.push(<Key mapping={this.miscKeys[2]}/>)
        let r2 = []
        r2.push(<Key mapping={this.miscKeys[3]}/>)
        for (let i = 11; i <= 20; i++) {
            r2.push(<Key mapping={this.mapping[i]}/>);
        }
        r2.push(<Key mapping={this.miscKeys[4]}/>)
        r2.push(<Key mapping={this.miscKeys[5]}/>)
        r2.push(<Key mapping={this.miscKeys[6]}/>)
        let r3 = []
        r3.push(<Key mapping={this.miscKeys[7]}/>)

        for (let i = 21; i <= 30; i++) {
            r3.push(<Key mapping={this.mapping[i]}/>);
        }
        r3.push(<Key mapping={this.miscKeys[8]}/>)
        r3.push(<Key mapping={this.miscKeys[9]}/>)
        let r4 = []
        r4.push(<Key mapping={this.miscKeys[10]}/>)
        for (let i = 31; i <= 40; i++) {
            r4.push(<Key mapping={this.mapping[i]}/>);
        }
        r4.push(<Key mapping={this.miscKeys[11]}/>)
        return(
            <div id={"keyboardBg"}>
                <div id={"r1"}>
                    {r1}
                </div>
                <div id={"r2"}>
                    {r2}
                </div>
                <div id={"r3"}>
                    {r3}
                </div>
                <div id={"r4"}>
                    {r4}
                </div>

            </div>
        )
    }
}

export {
    KeyMappings,
    Keyboard
}