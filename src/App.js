import logo from './logo.svg';
import TypeZhuyin from "./TypeZhuyin";
import Projects from "./Projects";
import KeyPG from "./KeyPG";
import Home from "./Home";
import Layout from "./Layout"
//might need to install this later
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={"zhuyin"} element={<TypeZhuyin/>}/>
                <Route path={"projects"} element={<Projects/>}/>
                <Route path={"keyPG"} element={<KeyPG/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
