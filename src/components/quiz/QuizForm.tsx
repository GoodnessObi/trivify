import styled from 'styled-components';
import { useQuiz } from '../../context/Quiz/QuizProvider';
import Modal from '../shared/Modal';
import FinalScore from './FinalScore';
import ShowAnswer from './ShowAnswer';
import { useQuestion } from '../../context/Question/QuestionProvider';
import { MilitaryTech, MilitaryTechOutlined } from '@mui/icons-material';
import Button from '../shared/Button';
import { Stack, TextField } from '@mui/material';

const PlayQuizForm = () => {
	const { categories } = useQuestion();
	const { quizState, quizDispatch } = useQuiz();

	const { currentQuestion, guess, showAnswer, quizCategory } = quizState;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		quizDispatch({
			type: 'MAKE_GUESS',
			payload: { guess: event.target.value },
		});
	};

	const submitGuess = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		quizDispatch({ type: 'SUBMIT_GUESS' });
	};

	return (
		<>
			{Object.keys(currentQuestion).length > 0 && (
				<PageWrapper>
					<h2>Current Category: {quizCategory.type.toUpperCase()}</h2>
					<QuestionCard
						category={`${categories[currentQuestion.category].toLowerCase()}`}
					>
						<Stack spacing={2}>
							<QuestionHeader>
								<div>
									<span style={{ color: '#BB0000' }}>
										{new Array(currentQuestion.difficulty)
											.fill('')
											.map((_, index) => (
												<MilitaryTech key={index} fontSize='small' />
											))}
									</span>

									<span style={{ color: '#C8C8C8' }}>
										{new Array(5 - currentQuestion.difficulty)
											.fill('')
											.map((_, index) => (
												<MilitaryTechOutlined key={index} fontSize='small' />
											))}
									</span>
								</div>

								<ImgWrapper>
									<img
										className='category'
										alt={`${categories[
											currentQuestion.category
										].toLowerCase()}`}
										src={`${categories[
											currentQuestion.category
										].toLowerCase()}.svg`}
									/>
								</ImgWrapper>
							</QuestionHeader>

							<div className='quiz-question'>{currentQuestion.question}</div>

							<TextField
								fullWidth
								label=''
								id='guess'
								value={guess}
								onChange={handleChange}
								placeholder='Type in your guess'
							/>

							<button
								className='submit-guess button'
								type='submit'
								onClick={submitGuess}
							>
								Submit Answer
							</button>
						</Stack>
					</QuestionCard>

					{showAnswer && (
						<Modal>
							<ShowAnswer />
						</Modal>
					)}
				</PageWrapper>
			)}
		</>
	);
};

interface ILi {
	category: string;
}

const catBg: { [id: string]: string } = {
	science: '#E3EEFF',
	art: '#FFF7EC',
	history: '#bef8f5',
	geography: '#E9F8F1',
	entertainment: '#F4DCD3',
	sports: '#E0E3EF',
	all: '#fff',
};

const PageWrapper = styled.div`
	padding: 36px;

	h2 {
		text-align: center;
	}
`;

const FormDiv = styled.div`
	margin: 18px 0;
	input,
	select {
		display: block;
		// width: 100%;
		padding: 12px 16px;
	}
	label {
		margin-bottom: 8px;
	}
`;

const QuestionCard = styled.div<ILi>`
	position: relative;
	text-align: center;
	background: ${(props) => catBg[props.category]};
	padding 16px;
	margin:10vh auto;
	cursor: pointer;
	border-radius: 16px;
	padding: 36px;
	width: 80%;
`;

const QuestionHeader = styled.div``;

const ImgWrapper = styled.div`
	position: absolute;
	right: -10px;
	top: -15px;
	background: #fef9ff;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 35px;
	}
`;

export default PlayQuizForm;
