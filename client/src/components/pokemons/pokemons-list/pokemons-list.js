import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './pokemons-list.css';

import {Card, List, Avatar, Tag, Pagination} from 'antd';
import {GraphqlContainer} from '>/src/components/lib';

class PokemonsList extends Component {
	log = (...args) =>
		console.log('%c args ->', 'background-color:#222; color:gold;', ' ', args);

	renderPokemon(pokemon) {
		return (
			<Card
				key={pokemon.id}
				className="pokemon"
				title={
					<div className="title">
						<span>{pokemon.name}</span>{' '}
						<Avatar src={pokemon.avatar} className="avatar" />
					</div>
				}
			>
				<List
					className="stats"
					dataSource={pokemon.stats}
					renderItem={({name, baseStat}) => (
						<List.Item>
							<div className="stat">
								<span>{name}</span>
								<span>{baseStat}</span>
							</div>
						</List.Item>
					)}
				/>
				<div className="types">
					{pokemon.types.map(type => (
						<Tag key={type} color="#108ee9">
							{type}
						</Tag>
					))}
				</div>
			</Card>
		);
	}

	render() {
		const {
			page,
			pageSize,
			data: {loading, error, pokemonsList},
			pageChangeHandler
		} = this.props;

		console.log(
			'%c PokemonsList this.props ->',
			'background-color:#222; color:gold;',
			' ',
			this.props
		);

		return (
			<GraphqlContainer loading={loading} error={error}>
				{pokemonsList && (
					<div className="pokemons-list">
						<div className="pokemons-grid">
							{pokemonsList.pokemons.map(this.renderPokemon)}
						</div>
						<nav className="pagination-container">
							<Pagination
								className="pagination"
								current={page}
								onChange={pageChangeHandler}
								total={pokemonsList.count}
								pageSize={pageSize}
							/>
						</nav>
					</div>
				)}
			</GraphqlContainer>
		);
	}
}

const QUERY = gql`
	query PokemonsList($limit: Int!, $offset: Int!) {
		pokemonsList(limit: $limit, offset: $offset) {
			count
			pokemons {
				id
				name
				avatar
				types
				stats {
					name
					baseStat
				}
			}
		}
	}
`;

const calcOffset = (page, pageSize) => (page - 1) * pageSize + 1;

export default graphql(QUERY, {
	options: ({page, pageSize}) => ({
		variables: {limit: pageSize - 1, offset: calcOffset(page, pageSize)}
	})
})(PokemonsList);
