import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './pokemons.css';

import {GraphqlContainer} from '>/src/components/lib';
import PokemonsFilter from './pokemons-filter/';
import PokemonsList from './pokemons-list/';

class Pokemons extends Component {
	state = {
		types: [],
		pageSize: 12,
		name: ''
	};

	changeHandler = ({target: {name, value}}) => this.setState({[name]: value});

	typesChangeHandler = types => this.setState({types});

	render() {
		const {loading, error, types: typesList} = this.props.data;
		const {pageSize, types, name} = this.state;

		return (
			<GraphqlContainer loading={loading} error={error}>
				{typesList && (
					<div className="pokemons">
						<PokemonsFilter
							typesList={typesList}
							pageSize={pageSize}
							types={types}
							name={name}
							typesChangeHandler={this.typesChangeHandler}
							changeHandler={this.changeHandler}
						/>
						<PokemonsList />
					</div>
				)}
			</GraphqlContainer>
		);
	}
}

const QUERY = gql`
	query Types {
		types
	}
`;

export default graphql(QUERY)(Pokemons);
