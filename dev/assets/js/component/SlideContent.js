import React, { PropTypes } from 'react';

class SlideContent extends React.Component {
	slideContentRender(slideNumber) {
		switch(slideNumber) {
			case 1:
				return "abcdefggxde";
			case 2:
				return "desf";
			default:
				return "ghix";
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
};

export default SlideContent;
