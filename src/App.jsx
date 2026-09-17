import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { CountryDetails } from './pages/CountryDetails';
import { Favorites } from './pages/Favorites';
import { Navbar } from './components/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.container}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pais/:code" element={<CountryDetails />} />
          <Route path="/favoritos" element={<Favorites />} />
          </Routes>
         </div>
        </Router>

  );
}

export default App; 