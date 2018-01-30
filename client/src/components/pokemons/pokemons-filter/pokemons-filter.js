import React from 'react';
import './pokemons-filter.css';

import {TreeSelect, Radio, Input} from 'antd';

const PokemonsFilter = ({
	typesList,
	pageSize,
	types,
	name,
	typesChangeHandler,
	changeHandler
}) => (
	<div className="pokemons-filter">
		<Radio.Group value={pageSize} name="pageSize" onChange={changeHandler}>
			<Radio.Button value={12}>12</Radio.Button>
			<Radio.Button value={24}>24</Radio.Button>
			<Radio.Button value={36}>36</Radio.Button>
		</Radio.Group>
		<TreeSelect
			showSearch
			style={{width: 300}}
			value={types}
			dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
			placeholder="fire"
			allowClear
			multiple
			treeDefaultExpandAll
			onChange={typesChangeHandler}
		>
			{typesList.map(t => <TreeSelect.TreeNode value={t} title={t} key={t} />)}
		</TreeSelect>
		<Input
			placeholder="Pikachu"
			value={name}
			name="name"
			onChange={changeHandler}
		/>
	</div>
);

export default PokemonsFilter;
