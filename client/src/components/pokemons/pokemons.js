import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import './pokemons.css';

import {pageSizes} from './constants';

import {GraphqlContainer} from '>/src/components/lib';
import PokemonsFilter from './pokemons-filter/';
import PokemonsList from './pokemons-list/';

class Pokemons extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: ''
		};

		this.setPage(props.match.params.page);
		this.setPageSize(props.match.params.pageSize);
		this.setType(props.location.search);
	}

	componentWillReceiveProps({match: {params: {page, pageSize}}, location}) {
		if (this.props.match.params.page !== page) {
			this.setPage(page);
		}

		if (this.props.match.params.pageSize !== pageSize) {
			this.setPageSize(pageSize);
		}

		if (this.props.location.search !== location.search) {
			this.setType(location.search);
		}
	}

	setPage(page) {
		this.page = Number.parseInt(page, 10);
	}

	setPageSize(pageSize) {
		this.pageSize = Number.parseInt(pageSize, 10);
	}

	setType(search) {
		const searchParams = new URLSearchParams(search);
		this.type = searchParams.get('type') || '';
	}

	nameChangeHandler = ({target: {value}}) => this.setState({name: value});

	pageSizeChangeHandler = ({target: {value}}) =>
		this.props.history.push(`/pokemons/${value}/1`);

	typeChangeHandler = type => {
		const {history, location: {pathname}} = this.props;
		if (type) {
			history.push({pathname, search: `?type=${type}`});
		} else {
			history.push(pathname);
		}
	};

	pageChangeHandler = (page, pageSize) => {
		const {history, location: {search}} = this.props;
		history.push({pathname: `/pokemons/${pageSize}/${page}`, search});
	};

	render() {
		const {loading, error, types: typesList} = this.props.data;
		const {name} = this.state;

		console.log(
			'%c Pokemons this.props ->',
			'background-color:#222; color:gold;',
			' ',
			this.props
		);

		return (
			<GraphqlContainer loading={loading} error={error}>
				{typesList && (
					<div className="pokemons">
						<PokemonsFilter
							pageSizes={pageSizes}
							typesList={typesList}
							pageSize={this.pageSize}
							type={this.type}
							name={name}
							typeChangeHandler={this.typeChangeHandler}
							nameChangeHandler={this.nameChangeHandler}
							pageSizeChangeHandler={this.pageSizeChangeHandler}
						/>
						<PokemonsList
							pageSize={this.pageSize}
							page={this.page}
							type={this.type}
							pageChangeHandler={this.pageChangeHandler}
						/>
					</div>
				)}
			</GraphqlContainer>
		);
	}
}

const QUERY = gql`
	query Types {
		types
	}
`;

export default graphql(QUERY)(Pokemons);
