import {Route, BrowserRouter as Router, Routes} from  'react-router-dom'
import Navbar from './components/Navbar';
import { About, Projects, Contact} from './pages'
import Home from './pages/Home'
function App() {

  return (
    <main className="bg-slate-100">
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
