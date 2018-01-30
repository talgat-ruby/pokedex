const {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString
} = require('graphql');

const {PokemonsListType} = require('./types/');

const query = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		pokemonsList: {
			type: PokemonsListType,
			args: {
				limit: {type: new GraphQLNonNull(GraphQLInt)},
				offset: {type: new GraphQLNonNull(GraphQLInt)},
				type: {type: GraphQLString}
			},
			resolve: async (_, {limit, offset, type}, {P}) => {
				try {
					let count, promises;

					if (type) {
						const {pokemon} = await P.getTypeByName(type);
						count = pokemon.length;
						promises = pokemon
							.slice(offset - 1, offset + limit)
							.map(({pokemon: {name}}) => P.getPokemonByName(name));
					} else {
						const response = await P.getPokemonsList({
							limit,
							offset
						});
						count = response.count;
						promises = response.results.map(({name}) =>
							P.getPokemonByName(name)
						);
					}

					const data = await Promise.all(promises);
					const pokemons = data.map(
						({id, name, sprites: {front_default}, types, stats, ...rest}) => ({
							id,
							name: `${name.charAt(0).toUpperCase()}${name.substring(1)}`,
							avatar: front_default,
							types: types.map(({type: {name}}) => name),
							stats: stats.map(({stat: {name}, base_stat}) => ({
								name,
								baseStat: base_stat
							}))
						})
					);

					return {count, pokemons};
				} catch (e) {
					return Promise.reject(e);
				}
			}
		},
		test: {
			type: GraphQLString,
			args: {
				type: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve: async (_, {type}, {P}) => {
				try {
					const result = await P.getTypeByName(type);
					console.log('\x1b[33m result -> \x1b[0m', result.pokemon);
					return 'Hello';
				} catch (e) {
					console.log(e);
				}
			}
		},
		types: {
			type: new GraphQLList(GraphQLString),
			resolve: async (_, __, {P}) => {
				try {
					return (await P.getTypesList()).results.map(({name}) => name);
				} catch (e) {
					return Promise.reject(e);
				}
			}
		}
	}
});
module.exports = query;
