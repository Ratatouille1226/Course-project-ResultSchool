import styled from 'styled-components';

const CommentContainer = ({ className, author, publishedAt, content }) => {
	return (
		<div className={className}>
			<div className="information-panel">
				<div className="author">{author}</div>
				<div className="published-at">{publishedAt}</div>
			</div>
			<div className="comment-text">{content}</div>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	justify-content: center;
	flex-direction: column;
	gap: 15px;
	border: 1px solid white;
	padding: 10px;
	border-radius: 7px;
	width: 580px;

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
		font-weight: 700;
		font-size: 22px;
	}

	& .published-at {
		display: flex;
	}
`;
