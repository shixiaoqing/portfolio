import {Outlet, Link} from "react-router-dom";
import './Home.css'
import React from "react";

const Layout = () => {
    return (
        <div class={"page"}>
            <div class={"header"}>
                <Link id={"name"} to={"/"}>@helen_shi</Link>
                <ul id = {"links"}>
                    <Link class={"navi"} to={"/projects"}>Projects</Link>
                    <Link class={"navi"} to={"https://github.com/shixiaoqing/"}>Github</Link>
                    <Link class={"navi"} to={"https://www.linkedin.com/in/helen-shi-834b2014a/"}>LinkedIn</Link>
                </ul>
            </div>
            <Outlet/>
        </div>
    )
}

export default Layout;