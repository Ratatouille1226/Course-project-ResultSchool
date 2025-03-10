import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

export const App = () => {
	return (
		<Div>
			<h1>CDN FontAwesome</h1>
			<i className="fa-solid fa-coffee"></i>
		</Div>
	);
};
