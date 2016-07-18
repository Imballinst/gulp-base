import React, { PropTypes } from 'react'
import SlideContent from './SlideContent'

class SlideNumber extends React.Component {
	componentDidMount() {
		console.log("Component SlideNumber did mount!");
	}

	render() {
		const num = this.props.num;
		const onSlideClick = this.props.onSlideClick;
		return (
			<div>
				<div className="slide-container">
					<h1>
						{num}
					</h1>
					<SlideContent num={num} />
				</div>
				<div className="btn-group" role="group">
				  <button type="button" className="btn btn-default" onClick={() => onSlideClick("prev")}>Prev</button>
				  <button type="button" className="btn btn-default" onClick={() => onSlideClick("next")}>Next</button>
				</div>
			</div>
		);
	}
}

SlideNumber.propTypes = {
	num: PropTypes.number.isRequired,
	onSlideClick: PropTypes.func.isRequired
}

export default SlideNumber