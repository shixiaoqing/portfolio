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
                    <img id={"face"} src={process.env.PUBLIC_URL + '/Face.png'}/>
                    <h1> Software Developer</h1><br/>
                    <a href={"https://drive.google.com/file/d/1HeprAno77g0FTFszz6Qycsu-UgfHrHeN/view?usp=sharing"}><h3 >-> View Resume</h3></a>

                </div>
                <div id={"more"}>
                    Hi my name is Helen, I'm a Software Developer and an artist.

                    <br/><br/>
                    I created this website to serve as my portfolio and to house my project(s). Under 'Projects'
                    you can see the project I'm currently creating. At time of writing, there is only one project,
                    "Zhuyin Type". I created this project because I wanted to learn how to type in Zhuyin faster and I
                    couldn't find any resources to help me learn to memorize the keys/increase my WPM.
                    <br/><br/>
                    I plan to extend this project to other languages like Korean and I'm planning to add more features.
                    <br/><br/>
                    This website is a work in progress!
                </div>
            </div>
        )
    }
}

export default Home;