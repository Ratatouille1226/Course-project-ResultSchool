import styled from 'styled-components';

//Выносим icon в отдельный компонент чтобы сохранился "class" и постоянно не прописывать по новой там где нужно использовать иконку
const IconContainer = ({ className, id, onClick }) => {
	return (
		<div className={className}>
			<i onClick={onClick} className={`fa-solid ${id}`}></i>
		</div>
	);
};
//Передаем параметры как функцию, чтобы задавать для каждой иконки свой стиль
export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin }) => margin};
	color: ${({ color = '#fff' }) => color};
	cursor: pointer;
`;
