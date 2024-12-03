import React from 'react';

function PokemonDetails({ pokemon }) {
  if (!pokemon) return null;

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">{pokemon.name}</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <img src={pokemon.sprites.front_default} alt={`${pokemon.name} default`} className="w-32 h-32" />
        <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} className="w-32 h-32" />
        {pokemon.sprites.other['official-artwork'].front_default && (
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={`${pokemon.name} official artwork`} className="w-32 h-32" />
        )}
      </div>
      <div className="mb-2">
        <strong>Types:</strong> {pokemon.types.map(type => type.type.name).join(', ')}
      </div>
      <div className="mb-2">
        <strong>Height:</strong> {pokemon.height / 10} m
      </div>
      <div className="mb-2">
        <strong>Weight:</strong> {pokemon.weight / 10} kg
      </div>
      <div className="mb-2">
        <strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
      </div>
      <div className="mb-2">
        <strong>Base Experience:</strong> {pokemon.base_experience}
      </div>
      <div className="mb-2">
        <strong>Can Dynamax:</strong> {pokemon.id <= 898 ? 'Yes' : 'No'}
      </div>
    </div>
  );
}

export default PokemonDetails;

