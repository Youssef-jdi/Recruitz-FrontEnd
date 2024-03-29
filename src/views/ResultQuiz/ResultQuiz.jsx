import React, { Component } from 'react';
import * as Survey from 'survey-react';
import { getResult } from '../../_actions'
import { connect } from 'react-redux';
class ResultQuiz extends Component {
	constructor(props) {
		super(props);
	}

   
    componentDidMount(){
        // console.error('user from candidate list ',this.props.location.state.candidate)
       this.props.location.state ?  this.props.getResult(this.props.location.state.candidate._id) : console.log('')
    }


	json = {
		pages: [
			{
				questions: [
					{
						type: 'matrix',
						name: 'Quality',
						title: 'Please indicate if you agree or disagree with the following statements',
						columns: [
							{
								value: 1,
								text: 'Strongly Disagree'
							},
							{
								value: 2,
								text: 'Disagree'
							},
							{
								value: 3,
								text: 'Neutral'
							},
							{
								value: 4,
								text: 'Agree'
							},
							{
								value: 5,
								text: 'Strongly Agree'
							}
						],
						rows: [
							{
								value: 'affordable',
								text: 'Product is affordable'
							},
							{
								value: 'does what it claims',
								text: 'Product does what it claims'
							},
							{
								value: 'better then others',
								text: 'Product is better than other products on the market'
							},
							{
								value: 'easy to use',
								text: 'Product is easy to use'
							}
						]
					},
					{
						type: 'rating',
						name: 'satisfaction',
						title: 'How satisfied are you with the Product?',
						isRequired: true,
						mininumRateDescription: 'Not Satisfied',
						maximumRateDescription: 'Completely satisfied'
					},
					{
						type: 'rating',
						name: 'recommend friends',
						visibleIf: '{satisfaction} > 3',
						title: 'How likely are you to recommend the Product to a friend or co-worker?',
						mininumRateDescription: 'Will not recommend',
						maximumRateDescription: 'I will recommend'
					},
					{
						type: 'comment',
						name: 'suggestions',
						title: 'What would make you more satisfied with the Product?'
					}
				]
			},
			{
				questions: [
					{
						type: 'radiogroup',
						name: 'price to competitors',
						title: 'Compared to our competitors, do you feel the Product is',
						choices: [ 'Less expensive', 'Priced about the same', 'More expensive', 'Not sure' ]
					},
					{
						type: 'radiogroup',
						name: 'price',
						title: 'Do you feel our current price is merited by our product?',
						choices: [
							'correct|Yes, the price is about right',
							'low|No, the price is too low for your product',
							'high|No, the price is too high for your product'
						]
					},
					{
						type: 'multipletext',
						name: 'pricelimit',
						title: 'What is the... ',
						items: [
							{
								name: 'mostamount',
								title: 'Most amount you would every pay for a product like ours'
							},
							{
								name: 'leastamount',
								title: 'The least amount you would feel comfortable paying'
							}
						]
					}
				]
			},
			{
				questions: [
					{
						type: 'text',
						name: 'email',
						title:
							"Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button."
					}
				]
			}
		]
	};
	data = {
		Quality: {
			affordable: '3',
			'does what it claims': '4',
			'better then others': '3',
			'easy to use': '5'
		},
		satisfaction: '4',
		'recommend friends': '4',
		suggestions: '24/7 support would help a lot.',
		'price to competitors': 'Not sure',
		price: 'correct',
		pricelimit: {
			mostamount: '450',
			leastamount: '200'
		},
		email: 'jon.snow@nightwatch.org'
	};
	render() {
        let model = new Survey.Model(this.props.quiz);
        return this.props.success ? <Survey.Survey model={model}  mode="display" data={this.props.user.resultQuiz} /> : <h1>No results</h1>
	}
}

const mapStateToProps = (state) => ({
	success: state.getResultReducer.success,
	quiz: state.getResultReducer.quiz,
	user: state.getResultReducer.user
});

const mapDispatchToProps = {
	getResult
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultQuiz);
