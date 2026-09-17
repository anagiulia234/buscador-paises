import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export function Navbar() {
    const location = useLocation();

    return (
        <nav  className="menu-nav">
            <div className="logo"> 
                <Link to="/" className={styles['titulo-principal']}>
                    GeoFlagger 🌍
                    </Link>
               </div>
               <ul className="nav-links">
                <li>
                      <Link to="/" style={{
                    color: location.pathname === '/' ? '#fff' : '#aaa',
                    textDecoration: 'none', 
                    fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                    transition: 'color 0.2s'
                }}>
                    Explorar
                </Link>
                </li>
                <li>
                 <Link to="/favoritos" style={{
                    color: location.pathname === '/' ? '#fff' : '#aaa',
                    textDecoration: 'none', 
                    fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                    transition: 'color 0.2s'
                }}>
                    Meus Destinos
                </Link>
                </li>
               </ul>
               </nav>
            );
        }