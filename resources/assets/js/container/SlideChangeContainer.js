import { connect } from 'react-redux';
import * as Actions from '../redux/Actions';
import SlideNumber from '../component/SlideNumber';

const mapStateToProps = (state, ownProps) => {
  return {
  	num: state.changeSlideState.num
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSlideClick: (text) => {
      if (text == "prev") {
        dispatch(Actions.prevSlide())
      }
      else {
        dispatch(Actions.nextSlide())
      }
    }
  }
};

const SlideChangeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideNumber);

export default SlideChangeContainer;
