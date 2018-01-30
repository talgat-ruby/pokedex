import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './pokemons-list.css';

import {Card, List, Avatar, Tag, Pagination} from 'antd';
import {GraphqlContainer} from '>/src/components/lib';

const PokemonsList = ({
	page,
	pageSize,
	data: {loading, error, pokemonsList},
	pageChangeHandler
}) => {
	const renderPokemon = pokemon => (
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

	return (
		<GraphqlContainer loading={loading} error={error}>
			{pokemonsList && (
				<div className="pokemons-list">
					<div className="pokemons-grid">
						{pokemonsList.pokemons.map(renderPokemon)}
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
};

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
