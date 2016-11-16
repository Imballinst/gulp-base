import { connect } from 'react-redux';
import * as Actions from '../redux/Actions';
import SlideNumber from '../component/SlideNumber';

const mapStateToProps = (state) => {
  return {
  	num: state.changeSlideState.num
  }
};

const mapDispatchToProps = (dispatch) => {
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

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideNumber);

export default App;
