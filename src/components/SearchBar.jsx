import React, { useState, useEffect } from 'react';

function SearchBar({ onSelectPokemon }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setIsLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        .then(response => response.json())
        .then(data => {
          const filteredPokemon = data.results.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSuggestions(filteredPokemon.slice(0, 5));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching Pokemon list:', error);
          setIsLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSelectPokemon = (pokemonName) => {
    setSearchTerm('');
    setSuggestions([]);
    onSelectPokemon(pokemonName);
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokémon"
        className="w-full p-2 border rounded"
      />
      {isLoading && (
        <div className="absolute right-2 top-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded absolute w-full bg-white z-10">
          {suggestions.map(pokemon => (
            <li
              key={pokemon.name}
              onClick={() => handleSelectPokemon(pokemon.name)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

