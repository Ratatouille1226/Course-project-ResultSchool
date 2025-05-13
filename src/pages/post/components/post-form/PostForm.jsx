import { useRef } from 'react';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';

const PostFormContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	//Сохранение новых данных в статье
	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = contentRef.current.innerHTML;

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => {
			navigate(`/post/${id}`);
		});
	};

	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} />
			<Input ref={titleRef} defaultValue={title} />
			<div className="special-panel">
				<div className="published-at">
					<Icon id={'fa-calendar'} color={'#fff'} margin="0 10px 0 0" size={'18px'} />
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon id={'fa-trash'} color={'red'} margin="0 10px 0 0" size={'18px'} />
					<Icon
						id={'fa-floppy-disk'}
						color={'blue'}
						margin="0 10px"
						size={'18px'}
						onClick={onSave}
					/>
				</div>
			</div>
			<div
				ref={contentRef}
				className="post-text"
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 20px 0;
	}
	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: 20px 0 20px;
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
	& .post-text {
		color: white;
	}
`;
