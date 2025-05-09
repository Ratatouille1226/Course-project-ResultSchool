import { H2, Icon } from '../../../../components';
import styled from 'styled-components';

const PostContentContainer = ({ className, post: { title, imageUrl, content, publishedAt } }) => {
	return (
		<div className={className}>
			<img src={imageUrl || null} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id={'fa-calendar'} color={'#fff'} margin="0 10px 0 0" size={'18px'} />
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon id={'fa-trash'} color={'red'} margin="0 10px 0 0" size={'18px'} />
					<Icon id={'fa-pen-to-square'} color={'blue'} margin="0 10px" size={'18px'} />
				</div>
			</div>
			<div>{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 20px 0;
	}
	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 20px;
		font-size: 18px;
	}
	& .published-at {
		display: flex;
		align-items: center;
		font-size: 1px;
	}
	& .buttons {
		display: flex;
		font-size: 11px;
	}
`;
