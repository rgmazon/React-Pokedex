import React, { useState, useEffect } from 'react';

function EvolutionTree({ pokemonId, onSelectPokemon }) {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [megaEvolutions, setMegaEvolutions] = useState({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        fetch(data.evolution_chain.url)
          .then(response => response.json())
          .then(evolutionData => {
            setEvolutionChain(evolutionData.chain);
          })
          .catch(error => console.error('Error fetching evolution chain:', error));

        // Fetch Mega Evolutions
        data.varieties.forEach(variety => {
          if (variety.pokemon.name.includes('-mega')) {
            fetch(variety.pokemon.url)
              .then(response => response.json())
              .then(megaData => {
                setMegaEvolutions(prev => ({
                  ...prev,
                  [data.name]: [...(prev[data.name] || []), megaData]
                }));
              })
              .catch(error => console.error('Error fetching mega evolution:', error));
          }
        });
      })
      .catch(error => console.error('Error fetching Pokemon species:', error));
  }, [pokemonId]);

  const renderEvolutionChain = (chain) => {
    if (!chain) return null;

    return (
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.split('/')[6]}.png`}
            alt={chain.species.name}
            className="w-20 h-20 mx-auto cursor-pointer hover:opacity-80"
            onClick={() => onSelectPokemon(chain.species.name)}
          />
          <p>{chain.species.name}</p>
          {megaEvolutions[chain.species.name] && (
            <div className="flex mt-2">
              {megaEvolutions[chain.species.name].map((mega, index) => (
                <img
                  key={index}
                  src={mega.sprites.front_default}
                  alt={`${chain.species.name} Mega`}
                  className="w-16 h-16 cursor-pointer hover:opacity-80"
                  onClick={() => onSelectPokemon(mega.name)}
                />
              ))}
            </div>
          )}
        </div>
        {chain.evolves_to.length > 0 && (
          <>
            <div className="text-2xl">→</div>
            {chain.evolves_to.map((evolution, index) => (
              <div key={index}>{renderEvolutionChain(evolution)}</div>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Evolution Chain</h3>
      {evolutionChain && renderEvolutionChain(evolutionChain)}
    </div>
  );
}

export default EvolutionTree;

