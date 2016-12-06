import React, { PropTypes } from 'react';

class SlideContent extends React.Component {
	slideContentRender(slideNumber) {
		switch(slideNumber) {
			case 1: {
				return "This slide doesn't give anything valuable.";
      }
			case 2: {
				return "This slide doesn't give anything valuable.";
      }
			default:  {
        sessionStorage.treasure = "xD";
				return "You found something valuable, 'xD'! The browser will save it in sessionStorage.";
      }
		}
	}

	render() {
		content = this.slideContentRender(this.props.num);
		return (
			<div>
				{ content }
        <br />
        { sessionStorage.treasure }
			</div>
		);
	}
}

SlideContent.propTypes = {
	num: PropTypes.number
};

export default SlideContent;
