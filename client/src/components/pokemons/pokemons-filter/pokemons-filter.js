import React from 'react';
import './pokemons-filter.css';

import {TreeSelect, Radio, Input} from 'antd';

const PokemonsFilter = ({
	pageSizes,
	typesList,
	pageSize,
	type,
	name,
	typeChangeHandler,
	nameChangeHandler,
	pageSizeChangeHandler
}) => (
	<div className="pokemons-filter">
		<Radio.Group
			value={pageSize}
			name="pageSize"
			onChange={pageSizeChangeHandler}
		>
			{pageSizes.map(p => (
				<Radio.Button key={p} value={p}>
					{p}
				</Radio.Button>
			))}
		</Radio.Group>
		<TreeSelect
			showSearch
			style={{width: 300}}
			value={type}
			dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
			placeholder="fire"
			allowClear
			treeDefaultExpandAll
			onChange={typeChangeHandler}
		>
			{typesList.map(t => <TreeSelect.TreeNode value={t} title={t} key={t} />)}
		</TreeSelect>
		<Input
			placeholder="Pikachu"
			value={name}
			name="name"
			onChange={nameChangeHandler}
		/>
	</div>
);

export default PokemonsFilter;
