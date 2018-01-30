import React, {Component} from 'react';
import './pokemons-filter.css';

import {TreeSelect, Radio, Input} from 'antd';

class PokemonsFilter extends Component {
	state = {
		types: [],
		pageSize: 12,
		name: ''
	};

	changeHandler = ({target: {name, value}}) => this.setState({[name]: value});

	typesChangeHandler = types => this.setState({types});

	render() {
		const {pageSize, types, name} = this.state;

		return (
			<div className="pokemons-filter">
				<Radio.Group
					value={pageSize}
					name="pageSize"
					onChange={this.changeHandler}
				>
					<Radio.Button value={12}>12</Radio.Button>
					<Radio.Button value={24}>24</Radio.Button>
					<Radio.Button value={36}>36</Radio.Button>
				</Radio.Group>
				<TreeSelect
					showSearch
					style={{width: 300}}
					value={types}
					dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
					placeholder="Please select type"
					allowClear
					multiple
					treeDefaultExpandAll
					onChange={this.typesChangeHandler}
				>
					<TreeSelect.TreeNode value="parent 1" title="parent 1" key="0-1" />
				</TreeSelect>
				<Input
					placeholder="Pikachu"
					value={name}
					name="name"
					onChange={this.changeHandler}
				/>
			</div>
		);
	}
}

export default PokemonsFilter;
