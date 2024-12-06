import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PokemonDetails from './components/PokemonDetails';
import EvolutionTree from './components/EvolutionTree';
import AdditionalForms from './components/AdditionalForms';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSelectPokemon = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => setSelectedPokemon(data))
      .catch(error => console.error('Error fetching Pokemon:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Pokédex</h1>
      <SearchBar onSelectPokemon={handleSelectPokemon} />
      {selectedPokemon && (
        <>
          <PokemonDetails pokemon={selectedPokemon} />
          <EvolutionTree pokemonId={selectedPokemon.id} onSelectPokemon={handleSelectPokemon} />
          <AdditionalForms pokemonName={selectedPokemon.name} onSelectPokemon={handleSelectPokemon} />
        </>
      )}
    </div>
  );
}

export default App;

