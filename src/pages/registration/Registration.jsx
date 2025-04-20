import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { server } from '../../bff/index';
import { Input, Button, H2 } from '../../components/index';
import { useResetForm } from '../../hooks/index';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароль не совпадает.')
		.required('Введите пароль.'),
});

const ErrorMessage = styled.div`
	background-color: #fcadad;
	font-size: 16px;
	margin: 10px 0px;
	padding: 5px 10px;
	border-radius: 5px;
`;

export const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	//Получаем роль пользователя, если автозировался переносим его на главную
	const roleId = useSelector(selectUserRole);

	//Сброс формы после нажатия кнопки авторизоваться, сделал в кастомном хуке потому что в авторизации и регистрации одинаковый способ
	useResetForm(reset);

	//Обращаемся к bff, наш локальный сервер)
	const onSubmit = ({ login, password }) => {
		server.registration(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка сервера: ${error}`);
				return;
			}

			dispatch(setUser(res));
		});
	};
	//Сообщение ошибки
	const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message; //Разделил ошибки чтобы не блокировать кнопку в случае ошибки на сервере а не в форме
	const errorMessage = formError || serverError;

	//Если роль не гость а любая другая, то переносим пользователя с авторизации на главную
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
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
				<Input
					type="password"
					placeholder="Повторите пароль"
					{...register('passcheck', { onchange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
