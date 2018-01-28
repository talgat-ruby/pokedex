const {
	GraphQLNonNull,
	GraphQLID,
	GraphQLString,
	GraphQLObjectType,
	GraphQLList
} = require('graphql');

const StatType = require('./stat-type');

const PokemonType = new GraphQLObjectType({
	name: 'Pokemon',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLID)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		avatar: {type: new GraphQLNonNull(GraphQLString)},
		types: {type: new GraphQLList(GraphQLString)},
		stats: {type: new GraphQLList(StatType)}
	})
});
module.exports = PokemonType;
