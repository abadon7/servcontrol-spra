import React, { useState, useEffect } from 'react';

const App = () => {
	const [click, setClick] = useState(0);

	const addClick = () => {
		setClick(click + 1);
	};
	useEffect(() => {


	});

	return (
		<div>
			<span>You have clicked {click} times</span>
			<input type="submit" value="Click" onClick={addClick} />
		</div>
	);
};



export default App
