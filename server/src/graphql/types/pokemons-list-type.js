const {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt
} = require('graphql');

const PokemonType = require('./pokemon-type');

const PokemonsListType = new GraphQLObjectType({
	name: 'PokemonsList',
	fields: () => ({
		count: {type: new GraphQLNonNull(GraphQLInt)},
		pokemons: {type: new GraphQLList(PokemonType)}
	})
});
module.exports = PokemonsListType;
