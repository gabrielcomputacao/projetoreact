
import {BrowserRouter as Router , Routes , Route , Link} from "react-router-dom"
import Container from "./components/layout/Container";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Project from "./components/pages/Project";

function App() {
  return (
      <Router>
          <ul>
            <li>Home</li>
            <li>Company</li>
            <li>Project</li>
          <Link to="/contact"> Contato</Link>
          </ul>
        <Container costumClass="min-height">
          <Routes>
              <Route path="/" element={<Home/>} /> 
              <Route path="/contact" element={<Contact/>}></Route>
              <Route path="/project" element={<Project/>}></Route>
              <Route path="/company" element={<Company/>}></Route>
         
          </Routes>
        </Container>
         <p>Footer</p>
      </Router>
  );
}

export default App;
