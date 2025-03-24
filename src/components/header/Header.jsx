import styled from 'styled-components';

import { Logo, ControlPanel } from './components/index';

const Description = styled.div`
	color: #fff;
	margin-top: 15px;
`;

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Description>
				Веб-технологии
				<br />
				Написание кода
				<br />
				Разбор ошибок
			</Description>
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	height: 120px;
	background-color: #240090;
	padding: 20px 40px;
	box-shadow: 0px 0px 20px #0c0032;
	position: fixed;
	width: 1000px;
	top: 0;
`;
