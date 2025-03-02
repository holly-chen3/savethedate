import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { RSVP } from './pages/rsvp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={< Home />} />
          <Route path="/rsvp" exact element={< RSVP />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
