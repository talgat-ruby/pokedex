import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './pokemons.css';

import {pageSizes} from './constants';

import {GraphqlContainer} from '>/src/components/lib';
import PokemonsFilter from './pokemons-filter/';
import PokemonsList from './pokemons-list/';

class Pokemons extends Component {
	state = {
		types: [],
		name: ''
	};

	nameChangeHandler = ({target: {value}}) => this.setState({name: value});

	pageSizeChangeHandler = ({target: {value}}) =>
		this.props.history.push(`/pokemons/${value}/1`);

	typesChangeHandler = types => this.setState({types});

	render() {
		const {
			data: {loading, error, types: typesList},
			match: {params}
		} = this.props;
		const {types, name} = this.state;

		const pageSize = Number.parseInt(params.pageSize, 10);
		const page = Number.parseInt(params.page, 10);

		console.log(
			'%c Pokemons this.props ->',
			'background-color:#222; color:gold;',
			' ',
			this.props
		);

		return (
			<GraphqlContainer loading={loading} error={error}>
				{typesList && (
					<div className="pokemons">
						<PokemonsFilter
							pageSizes={pageSizes}
							typesList={typesList}
							pageSize={pageSize}
							types={types}
							name={name}
							typesChangeHandler={this.typesChangeHandler}
							nameChangeHandler={this.nameChangeHandler}
							pageSizeChangeHandler={this.pageSizeChangeHandler}
						/>
						<PokemonsList pageSize={pageSize} page={page} />
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
