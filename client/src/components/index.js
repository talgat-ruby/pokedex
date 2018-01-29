import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './index.css';

import PokemonList from './pokemon-list/';

class App extends Component {
	render() {
		return (
			<div className="app">
				<main>
					<Switch>
						<Redirect exact from="/" to="/pokemon-list" />
						<Route exact path="/pokemon-list" component={PokemonList} />
						<Route render={() => <div>404</div>} />
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;
