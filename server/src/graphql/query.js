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
				offset: {type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve: async (_, {limit, offset}, {P}) => {
				try {
					const {count, results: list} = await P.getPokemonsList({
						limit,
						offset
					});
					const data = await Promise.all(
						list.map(({name}) => P.getPokemonByName(name))
					);
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
