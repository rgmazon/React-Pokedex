import React from 'react';
import SearchBar from './SearchBar';
import PokemonDetails from './PokemonDetails';
import EvolutionTree from './EvolutionTree';
import AdditionalForms from './AdditionalForms';

function PokedexDevice({ selectedPokemon, onSelectPokemon }) {
  return (
    <div className="bg-red-600 w-full max-w-2xl mx-auto rounded-lg shadow-lg p-8 relative">
      {/* Top lights */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
      
      {/* Main screen */}
      <div className="bg-gray-200 rounded-lg p-4 mb-4">
        <SearchBar onSelectPokemon={onSelectPokemon} />
        {selectedPokemon && (
          <div className="mt-4 max-h-96 overflow-y-auto">
            <PokemonDetails pokemon={selectedPokemon} />
          </div>
        )}
      </div>
      
      {/* Bottom screen */}
      <div className="bg-gray-300 rounded-lg p-4">
        {selectedPokemon && (
          <>
            <EvolutionTree pokemonId={selectedPokemon.id} onSelectPokemon={onSelectPokemon} />
            <AdditionalForms pokemonName={selectedPokemon.name} onSelectPokemon={onSelectPokemon} />
          </>
        )}
      </div>
      
      {/* Control buttons */}
      <div className="mt-4 flex justify-center space-x-4">
        <button className="w-12 h-12 bg-blue-500 rounded-full"></button>
        <button className="w-16 h-8 bg-green-500 rounded-lg"></button>
        <button className="w-16 h-8 bg-yellow-500 rounded-lg"></button>
      </div>
    </div>
  );
}

export default PokedexDevice;

