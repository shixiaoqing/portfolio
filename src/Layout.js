import {Outlet, Link} from "react-router-dom";
import './Home.css'
import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const Layout = () => {
    return (
        <div class={"page"}>
            <div class={"header"}>
                <Link id={"name"} to={"/"}>Helen Shi</Link>
                <ul id = {"links"}>
                    <Link class={"navi"} to={"/zhuyin"}>Projects</Link>
                    <Link class={"navi"} to={"https://github.com/shixiaoqing/"}>Github</Link>
                    <Link class={"navi"} to={"https://www.linkedin.com/in/helen-shi-834b2014a/"}>LinkedIn</Link>
                </ul>
            </div>
            <Outlet/>
        </div>
    )
}

export default Layout;