const modulesProduction = {};
const modulesDevelopment = {};

require('dotenv').config();

// libs
const Koa = require('koa');
const Route = require('koa-router');
const koaGraphQL = require('koa-graphql');
const	cors = require('kcors');
if (process.env.NODE_ENV === 'production') {
	// Set up nginx
	modulesProduction.serve = require('koa-static');
	modulesProduction.send = require('koa-send');
}
const Pokedex = require('pokedex-promise-v2');

// constants
const {PORT, CLIENT_PATH} = require('./constants/app-constants');

// methods, functions, utilities;
const schema = require('./graphql/');

const app = new Koa();
const router = new Route();
const P = new Pokedex();

app.use(cors());

router.all(
	'/graphql',
	koaGraphQL(
		request =>
			process.env.NODE_ENV === 'production'
				? {
						schema,
						context: {request, P}
					}
				: {
						schema,
						graphiql: true,
						context: {request, P}
					}
	)
);

app.use(router.routes()).use(router.allowedMethods());

if (process.env.NODE_ENV === 'production') {
	app.use(modulesProduction.serve(CLIENT_PATH));
	app.use(async ctx => {
		await modulesProduction.send(ctx, './index.html', {root: CLIENT_PATH});
	});
}

app.listen(process.env.PORT || PORT);
