const {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt
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
			resolve: async (parentValue, {limit, offset}, {P}) => {
				try {
					const promises = [];
					for (let i = 0; i < limit + 1; i++) {
						promises.push(P.getPokemonByName(offset + i));
					}
					const pokemons = await Promise.all(promises);
					return pokemons.map(
						({id, name, sprites: {front_default}, types, stats}) => ({
							id,
							name,
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
		}
	}
});
module.exports = query;
