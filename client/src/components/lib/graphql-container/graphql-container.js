import React from 'react';

const GraphqlContainer = ({children, loading, error}) => {
	if (loading) {
		return <div>loading...</div>;
	} else if (error) {
		return <div>error</div>;
	} else {
		return children;
	}
};

export default GraphqlContainer;
