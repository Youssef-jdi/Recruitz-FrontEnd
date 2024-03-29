export const AdminNavigation = {
	items: [
		{
			name: 'Register',
			url: '/dashboard/register',
			icon: 'icon-pencil'
		},
		{
			name: 'Quiz',
			url: '/dashboard/Quiz',
			icon: 'icon-speedometer',

			children: [
				{
					name: 'Create Quiz',
					url: '/dashboard/Quiz/Create',
					icon: 'icon-puzzle'
				},
				{
					name: 'My Quizes',
					url: '/dashboard/Quiz/listQuizes',
					icon: 'icon-star'
				},
			
			]
		},
		{
			name: 'Candidates',
			url: '/dashboard/Candidates',
			icon: 'icon-cursor'
		}
	]
};

export const CandidateNavigation = {
	items: [
		{
			name: 'Quiz',
			url: '/dashboard/Quiz',
			icon: 'icon-speedometer',

			children: [
				{
					name: 'Pass Quiz',
					url: '/dashboard/Quiz/QuizPass',
					icon: 'icon-calculator'
				}
			]
		}
	]
};
