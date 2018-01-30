import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './pokemons-list.css';

import {Card, List, Avatar, Tag} from 'antd';
import {GraphqlContainer} from '>/src/components/lib';

class PokemonsList extends Component {
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
		const {data: {loading, error, pokemons}} = this.props;

		console.log(
			'%c PokemonsList this.props ->',
			'background-color:#222; color:gold;',
			' ',
			this.props
		);

		return (
			<GraphqlContainer loading={loading} error={error}>
				<div className="pokemons-list">
					{pokemons && pokemons.map(this.renderPokemon)}
				</div>
			</GraphqlContainer>
		);
	}
}

const QUERY = gql`
	query Pokemons($limit: Int!, $offset: Int!) {
		pokemons(limit: $limit, offset: $offset) {
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
`;

const calcOffset = (page, pageSize) => (page - 1) * pageSize + 1;

export default graphql(QUERY, {
	options: ({page, pageSize}) => ({
		variables: {limit: pageSize - 1, offset: calcOffset(page, pageSize)}
	})
})(PokemonsList);
