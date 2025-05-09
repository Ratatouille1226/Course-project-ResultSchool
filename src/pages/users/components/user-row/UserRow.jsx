import { useDispatch } from 'react-redux';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/TableRow';
import styled from 'styled-components';

const DivBack = styled.div`
	cursor: pointer;
`;

const UserRowContainer = ({ className, login, registed_at, roleId: userroleId, roles }) => {
	const dispatch = useDispatch();

	const onRoleChange = () => {};

	return (
		<div className={className}>
			<TableRow>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registed_at}</div>
				<div className="role-id-column">
					<select value={userroleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option value={roleId}>{roleName}</option>
						))}
					</select>
					<DivBack onClick={() => dispatch()}>
						<Icon id={'fa-trash'} color={'#ff4f4f'} />
					</DivBack>
				</div>
			</TableRow>
			<DivBack onClick={() => dispatch()}>
				<Icon id={'fa-trash'} color={'#ff4f4f'} />
			</DivBack>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)``;
