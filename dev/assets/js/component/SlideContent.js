import React, { PropTypes } from 'react'

class SlideContent extends React.Component {
	componentDidMount() {
		console.log("Component SlideContent did mount!");
	}

	slideContentRender(slideNumber) {
		switch(slideNumber) {
			case 1:
				return "abc";
			case 2:
				return "def";
			default:
				return "ghi";
		}
	}

	render() {
		content = this.slideContentRender(this.props.num);
		return (
			<div>
				{ content }
			</div>
		);
	}
}

SlideContent.propTypes = {
	num: PropTypes.number.isRequired
}

export default SlideContent