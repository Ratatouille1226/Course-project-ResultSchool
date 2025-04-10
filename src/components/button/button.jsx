import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	height: 32px;
	font-size: 16px;
	cursor: pointer;
	border-radius: 5px;
	border: none;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	color: black;

	&:hover {
		cursor: pointer;
	}
`;
