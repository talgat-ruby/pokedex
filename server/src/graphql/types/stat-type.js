const {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString,
	GraphQLObjectType
} = require('graphql');

const StatType = new GraphQLObjectType({
	name: 'Stat',
	fields: () => ({
		name: {type: new GraphQLNonNull(GraphQLString)},
		baseStat: {type: new GraphQLNonNull(GraphQLInt)}
	})
});
module.exports = StatType;
