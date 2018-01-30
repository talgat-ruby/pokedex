const {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString
} = require('graphql');

const {PokemonType} = require('./types/');

const query = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		pokemons: {
			type: new GraphQLList(PokemonType),
			args: {
				limit: {type: new GraphQLNonNull(GraphQLInt)},
				offset: {type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve: async (_, {limit, offset}, {P}) => {
				try {
					const promises = [];
					for (let i = 0; i < limit + 1; i++) {
						promises.push(P.getPokemonByName(offset + i));
					}
					const pokemons = await Promise.all(promises);
					return pokemons.map(
						({id, name, sprites: {front_default}, types, stats}) => ({
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
				} catch (e) {
					return Promise.reject(e);
				}
			}
		},
		types: {
			type: new GraphQLList(GraphQLString),
			resolve: async (_, __, {P}) => {
				try {
					return (await P.getTypesList()).results
						.slice(0, -1)
						.map(({name}) => name);
				} catch (e) {
					return Promise.reject(e);
				}
			}
		}
	}
});
module.exports = query;
