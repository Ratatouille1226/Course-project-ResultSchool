import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../../index';

const LargeText = styled.div`
	font-size: 40px;
	font-weight: 600;
	color: white;
`;
const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
	color: white;
`;

const LogoContainer = ({ className }) => {
	return (
		<Link className={className} to="/">
			<Icon id={'fa-laptop-code'} size={'70px'} margin={'0 15px 0 0'} />
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>веб-разработчика</SmallText>
			</div>
		</Link>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
	text-decoration: none;
`;
