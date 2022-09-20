
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Project from "./components/pages/Project";
import ListaProject from "./components/pages/ListaProject";

function App() {
  return (
      <Router>
        <Navbar/>

         
        <Container costumClass="min-height">
          <Routes>
              <Route path="/" element={<Home/>} /> 
              <Route path="/projects" element={<Project/>}></Route>
              <Route path="/company" element={<Company/>}></Route>
              <Route path="/contact" element={<Contact/>}></Route>
              <Route path="/listaProjects" element={<ListaProject/>}></Route>
          </Routes>
        </Container>
         <Footer/>
      </Router>
  );
}

export default App;
