import TypeZhuyin from "./TypeZhuyin";
import React, {Component} from "react";
import './Projects.css';
import {Outlet, Link} from "react-router-dom";

class Project {
    constructor(title, summary, link) {
        title = title
        summary = summary
        link = link
    }
}

class Projects extends Component {
    constructor() {
        super()
    }

    projectCard(title, caption, summary, link) {
        return (
            <div className={"projectCard"}>
                <h2>{title}</h2>
                <h4>{caption}</h4>
                <p>{summary}</p>
                <Link class={"test"} to={link}>View</Link>
            </div>
        )
    }

    render() {
        return(
            <div>
                {this.projectCard("KeyPG",
                "Android Application",
                "Written with Kotlin and Jetpack Compose, KeyPG is an android application written to help people type " +
                "faster in different languages (currently supports Korean JAMO and Chinese Zhuyin). KeyPG features a " +
                "in-app keyboard to support features like a hint system and different game modes.",
                "/keyPG")}
                {this.projectCard("Type Zhuyin",
                "Web Application",
                "Written with React, Type Zhuyin displays an on-screen keyboard which corresponds to the users' " +
                "physical keyboard to help people learn to type faster in other languages. Currently supports only Zhuyin " +
                "but it is written to be easily expandable to other languages. ",
                "/zhuyin")}
            </div>
        )
    }
}

export default Projects;
