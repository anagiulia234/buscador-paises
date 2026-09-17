import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import restCountriesApi from '../api/restcountries';
import styles from './CountryDetails.module.css';

export function CountryDetails() {
  const { code } = useParams(); 
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await restCountriesApi.get(`/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error("Erro ao buscar detalhes do país", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [code]);

  if (loading) return <p className={styles.loadingText}>Carregando dados do país...</p>;
  if (!country) return <p className={styles.loadingText}>País não encontrado.</p>;

  const flagUrl = country.flags?.svg || country.flags?.png;
  const coatOfArms = country.coatOfArms?.svg || country.coatOfArms?.png;
  const name = country.name?.common;
  const officialName = country.name?.official;
  
  // Formatadores extraídos da API
  const currencies = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const population = new Intl.NumberFormat('pt-BR').format(country.population);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          &larr; Voltar para Explorar
        </Link>
        
        <div className={styles.content}>
          
          <div className={styles.imagesContainer}>
            <img src={flagUrl} alt={`Bandeira de ${name}`} className={styles.flag} />
            
            {coatOfArms && (
              <div>
                <h4 className={styles.coatTitle}>Brasão de Armas</h4>
                <img src={coatOfArms} alt={`Brasão de ${name}`} className={styles.coatImage} />
              </div>
            )}
          </div>
          
          <div className={styles.infoContainer}>
            <h1 className={styles.countryName}>
              {name}
            </h1>
            <p className={styles.officialName}>
              {officialName}
            </p>
            
            <div className={styles.badges}>
              <span className={styles.regionBadge}>
                📍 {country.region} ({country.subregion})
              </span>
              <span className={styles.capitalBadge}>
                🏢 Cap: {country.capital?.[0] || 'N/A'}
              </span>
            </div>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <strong className={styles.detailLabel}>👥 População:</strong> <span className={styles.detailValue}>{population} habitantes</span>
              </div>
              <div className={styles.detailItem}>
                <strong className={styles.detailLabel}>🗣️ Idiomas:</strong> <span className={styles.detailValue}>{languages}</span>
              </div>
              <div className={styles.detailItem}>
                <strong className={styles.detailLabel}>💰 Moeda:</strong> <span className={styles.detailValue}>{currencies}</span>
              </div>
              <div className={styles.detailItem}>
                <strong className={styles.detailLabel}>🕒 Fuso Horário:</strong> <span className={styles.detailValue}>{country.timezones?.[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}