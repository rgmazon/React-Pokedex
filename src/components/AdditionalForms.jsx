import React, { useState, useEffect } from 'react';

function AdditionalForms({ pokemonName, onSelectPokemon }) {
  const [megaForms, setMegaForms] = useState([]);
  const [gigantamaxForm, setGigantamaxForm] = useState(null);

  useEffect(() => {
    // Fetch Mega Evolution data
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        const varieties = data.varieties.filter(v => v.pokemon.name.includes('-mega'));
        Promise.all(varieties.map(v => fetch(v.pokemon.url).then(res => res.json())))
          .then(megaData => setMegaForms(megaData))
          .catch(error => console.error('Error fetching mega forms:', error));
      })
      .catch(error => console.error('Error fetching Pokemon species:', error));

    // Fetch Gigantamax form data
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}-gmax`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('No Gigantamax form');
      })
      .then(data => setGigantamaxForm(data))
      .catch(() => setGigantamaxForm(null));
  }, [pokemonName]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Additional Forms</h3>
      
      {megaForms.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Mega Evolution</h4>
          <div className="flex flex-wrap gap-4">
            {megaForms.map(form => (
              <div key={form.name} className="text-center">
                <img 
                  src={form.sprites.front_default} 
                  alt={form.name} 
                  className="w-32 h-32 cursor-pointer hover:opacity-80"
                  onClick={() => onSelectPokemon(form.name)}
                />
                <p>{form.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {gigantamaxForm && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Gigantamax Form</h4>
          <div className="text-center">
            <img 
              src={gigantamaxForm.sprites.front_default} 
              alt={`${pokemonName} Gigantamax`} 
              className="w-32 h-32 cursor-pointer hover:opacity-80"
              onClick={() => onSelectPokemon(gigantamaxForm.name)}
            />
            <p>{gigantamaxForm.name}</p>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Dynamax</h4>
        <p>All Pokémon from generations 1-8 can Dynamax in battle.</p>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonName}.png`}
          alt={`${pokemonName} Dynamax`} 
          className="w-32 h-32 mt-2 opacity-50"
        />
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Terastallization</h4>
        <p>All Pokémon in the Paldea region can Terastallize, potentially changing their type in battle.</p>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonName}.png`}
          alt={`${pokemonName} Terastallized`} 
          className="w-32 h-32 mt-2"
          style={{ filter: 'hue-rotate(90deg) saturate(200%) brightness(150%)' }}
        />
      </div>
    </div>
  );
}

export default AdditionalForms;

