import React, {Component, useLayoutEffect} from 'react';
import './Home.css'

class Home extends Component{
    render(){
        return(
            <div>
                <h1>Hello! I am</h1>
                    <h1 className={"line-1 anim-typewriter"}>Helen Shi</h1>
            <br/>
                <button className="button-6">View Resume</button>
            </div>
        )
    }
}

export default Home;