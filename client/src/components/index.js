import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './index.css';

// import Header from './header/';
import Pokemons from './pokemons/';

class App extends Component {
	render() {
		return (
			<div className="app">
				<main>
					<Switch>
						<Redirect exact from="/" to="/pokemons" />
						<Route exact path="/pokemons" component={Pokemons} />
						<Route render={() => <div>404</div>} />
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;
