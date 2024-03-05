import React, {Component, useLayoutEffect} from 'react';
import './Home.css'
import TypeZhuyin from "./TypeZhuyin";
class Home extends Component{
    constructor() {
        super();
        this.state = {view: 0}
    }
    render(){
        return(

            <div id ={"home"}>
                <div id={"profile"}>
                    <h1>Hello, my name is Helen Shi and I am a Software Developer.
                    <br/>This website is under constant construction! (So forgive how bad it looks.)</h1>
                </div>
                <div id={"aboutme"}>
                    <p>Under my 'Projects' tab, you can find my Zhuyin Keyboard project.

                    <br/><br/>
                    Zhuyin, commonly known as 'bopomofo', is sound-based writing system that is commonly used in Taiwan.<br/>
                    I created this project because despite being a fast typer in English, I could not type quickly in Chinese.<br/>
                    I could not find a resource to help me learn how to type faster
                    with Zhuyin while I was studying in Taiwan. So I decided to create one.<br/>
                    Now instead of spending hours memorizing the Zhuyin keyboard, I spent hours programming something that would help me
                    (and more importantly, other people) learn the Zhuyin keyboard!<br/>
                    Right now, I have removed the feature which will show you the correct key to develop the feature for sentence typing.
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;