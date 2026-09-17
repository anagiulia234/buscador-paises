import { useState, useEffect } from 'react';
import restCountriesApi from '../api/restcountries';
import { CountryCard } from '../components/CountryCard';
import {useFavorites} from '../hooks/useFavorites.js';
import styles from './Home.module.css';

const REGIONS = [
  { id: 'all', name: 'Todos', endpoint: '/all' },
  { id: 'americas', name: 'Américas', endpoint: '/region/americas' },
  { id: 'europe', name: 'Europa', endpoint: '/region/europe' },
  { id: 'africa', name: 'África', endpoint: '/region/africa' },
  { id: 'asia', name: 'Ásia', endpoint: '/region/asia' },
  { id: 'oceania', name: 'Oceania', endpoint: '/region/oceania' }
];

export function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(REGIONS[0]);

  const {isFavorite, toggleFavorite} = useFavorites();

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await restCountriesApi.get(activeTab.endpoint);
        setCountries(response.data);
      } catch (error) {
        console.error("Erro ao buscar países", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [activeTab]);

  return (
    <div className="home-page">
      <div className={styles.tabsContainer}>
        {REGIONS.map (region => (
            <button
            key={region.id}
            className={`${styles.tabBtn} ${activeTab.id === region.id ? styles.active : ''}`}
            onClick={() => setActiveTab(region)}>
                {region.name}
            </button>
         ))}
      </div>
 
        <h1 className={styles.title}>
            Explorando: {activeTab.name}
        </h1>

        {loading ? (
            <p className={styles.loadingText}>
                Carregando países...
            </p>
        ) : (
            <div className={styles.grid}>
                {countries.map(country => (
                    <CountryCard
                    key={country.cca3}
                    country={country}
                    isFavorite={isFavorite(country.cca3)}
                    onToggleFavorite={toggleFavorite}
                    />
                ))}
      
        </div>
        )}
    </div>
  );
}