import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components/index';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 15px;
	margin-top: 7px;
`;

const StyledLink = styled(Link)`
	width: 100px;
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
`;
const DivBack = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to="/login">Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<DivBack onClick={() => navigate(-1)}>
					<Icon id={'fa-backward'} />
				</DivBack>
				<Link to="/post">
					<Icon id={'fa-newspaper'} />
				</Link>
				<Link to="/users">
					<Icon id={'fa-users'} />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
