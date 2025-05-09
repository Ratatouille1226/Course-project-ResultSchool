import styled from 'styled-components';
import { Content, H2 } from '../../components';
// import { useDispatch } from 'react-redux';
import { UserRow, TableRow } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';

const UsersContainer = ({ className }) => {
	// const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setRoles(rolesRes.res);
				setUsers(usersRes.res);
			},
		);
	}, [requestServer]);

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-id-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registed_at, roleId }) => (
						<UserRow
							key={id}
							login={login}
							registed_at={registed_at}
							roleId={roleId}
							roles={roles}
						/>
					))}
				</div>
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 570px;
	margin: 0 auto;
`;
