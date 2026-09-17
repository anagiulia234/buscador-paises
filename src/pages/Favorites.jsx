import { CountryCard } from '../components/CountryCard';
import { useFavorites } from '../hooks/useFavorites';
import styles from './Favorites.module.css';

export function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Destinos Favoritos</h1>
      
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>Você ainda não adicionou nenhum país à sua lista.</h2>
          <p className={styles.emptyStateText}>Clique na estrela (★) nos países da página inicial para salvá-los aqui.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map(country => (
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