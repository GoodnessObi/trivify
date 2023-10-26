export interface QuestionFetchAction {
	type: 'FETCH';
	payload: {
		data: {
			questions: QuestionItem[];
			categories: { [key: number]: string };
			total_questions: number;
			current_category?: number;
		};
	};
}

export interface QuestionFetchCategoriesAction {
	type: 'FETCH_CATEGORIES';
	payload: {
		data: {
			categories: { [key: number]: string };
		};
	};
}

export interface QuestionFetchByCatgeoryAction {
	type: 'FETCH_BY_CATEGORY';
	payload: {
		data: {
			questions: QuestionItem[];
			total_questions: number;
			current_category?: string;
		};
	};
}

export interface QuestionAddAction {
	type: 'ADD_QUESTION';
	payload: {
		question: QuestionItem;
	};
}

export interface QuestionSearchAction {
	type: 'SEARCH';
	payload: {
		data: {
			questions: QuestionItem[];
		};
	};
}

export interface QuestionDeleteAction {
	type: 'DELETE';
	payload: {
		questionId: QuestionItem['id'];
	};
}

export type QuestionAction =
	| QuestionFetchAction
	| QuestionAddAction
	| QuestionDeleteAction
	| QuestionFetchByCatgeoryAction
	| QuestionFetchCategoriesAction
	| QuestionSearchAction;
