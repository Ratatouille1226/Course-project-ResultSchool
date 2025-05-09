import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from '../../../../components/index';
import { selectUserLogin, selectUserRole, selectUserSession } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../actions';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 15px;
	margin-top: 7px;
`;

const DivBack = styled.div`
	cursor: pointer;
`;
const UserName = styled.div`
	color: #fff;
	font-size: 22px;
	font-weight: 700;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//Получаем данные пользователя чтобы применить условный рендеринг (авторизован пользователь или нет)
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<DivBack onClick={onLogout}>
							<Icon id={'fa-sign-out'} color={'#ff4f4f'} />
						</DivBack>
					</>
				)}
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
