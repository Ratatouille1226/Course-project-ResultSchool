import { useForm } from 'react-hook-form';
import { useDispatch, useStore, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { server } from '../../bff/index';
import { Input, Button, H2 } from '../../components/index';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин.')
		.matches(/^\w+$/, 'Неверно заполнен логин, допускаются eng буквы, цифры и _.')
		.min(3, 'Неверно заполнен логин, минимум 3 символа.')
		.max(20, 'Неверно заполнен логин, максимум 20 символов.'),
	password: yup
		.string()
		.required('Введите пароль.')
		.matches(/[\w_-]+$/, 'Неверно заполнен пароль, допускаются буквы, цифры и знаки: _ -')
		.min(6, 'Пароль должен содержать минимум 6 символов.')
		.max(20, 'Пароль должен содержать максимум 20 символов.'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: none;
	color: blue;
	margin: 20px 0px;
	font-size: 18px;
`;
const ErrorMessage = styled.div`
	background-color: #fcadad;
	font-size: 16px;
	margin: 10px 0px;
	padding: 5px 10px;
	border-radius: 5px;
`;

export const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const store = useStore();
	//Получаем роль пользователя, если автозировался переносим его на главную
	const roleId = useSelector(selectUserRole);

	//Сброс формы после нажатия кнопки авторизоваться
	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		//Отписываемся
		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	//Обращаемся к bff, наш локальный сервер)
	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка сервера: ${error}`);
				return;
			}

			dispatch(setUser(res));
		});
	};
	//Сообщение ошибки
	const formError = errors?.login?.message || errors?.password?.message; //Разделил ошибки чтобы не блокировать кнопку в случае ошибки на сервере а не в форме
	const errorMessage = formError || serverError;

	//Если роль не гость а любая другая, то переносим пользователя с авторизации на главную
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Введите логин"
					{...register('login', { onchange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Введите пароль"
					{...register('password', { onchange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Зарегистрироваться</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
