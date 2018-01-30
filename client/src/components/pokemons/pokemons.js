import React, {Component} from 'react';
import './pokemons.css';

import PokemonsFilter from './pokemons-filter/';
import PokemonsList from './pokemons-list/';

class Pokemons extends Component {
	render() {
		return (
			<div className="pokemons">
				<PokemonsFilter />
				<PokemonsList />
			</div>
		);
	}
}

export default Pokemons;
