import {Route, BrowserRouter as Router, Routes} from  'react-router-dom'
import Navbar from './components/Navbar';
import { About, Projects, Contact, Home} from './pages'
import './styles/main.scss'
function App() {

  return (
    <main>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
