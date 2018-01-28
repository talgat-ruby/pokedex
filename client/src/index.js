import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import App from './components/';

const linkConfig =
	process.env.NODE_ENV === 'production'
		? {}
		: {uri: 'http://localhost:4000/graphql'};

const client = new ApolloClient({
	link: new HttpLink(linkConfig),
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
