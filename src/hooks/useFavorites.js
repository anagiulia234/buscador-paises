import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'RESTCOUNTRIES_FAVORITES_SAVE';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (country) => {
    // A API usa 'cca3' como código identificador único (ex: BRA, USA)
    const isFav = favorites.find(c => c.cca3 === country.cca3);
    if (isFav) {
      setFavorites(favorites.filter(c => c.cca3 !== country.cca3));
    } else {
      setFavorites([...favorites, country]);
    }
  };

  const isFavorite = (countryCode) => {
    return favorites.some(c => c.cca3 === countryCode);
  };

  return { favorites, toggleFavorite, isFavorite };
}