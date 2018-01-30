import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './index.css';

import Pokemons, {pageSizes} from './pokemons/';

class App extends Component {
	render() {
		return (
			<div className="app">
				<main>
					<Switch>
						<Redirect exact from="/" to={`/pokemons/${pageSizes[0]}/1`} />
						<Redirect
							exact
							from="/pokemons"
							to={`/pokemons/${pageSizes[0]}/1`}
						/>
						<Redirect
							exact
							from="/pokemons/:pageSize"
							to={`/pokemons/${pageSizes[0]}/1`}
						/>
						<Route
							exact
							path="/pokemons/:pageSize/:page"
							component={Pokemons}
						/>
						<Route render={() => <div>404</div>} />
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;
