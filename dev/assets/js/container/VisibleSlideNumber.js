import { connect } from 'react-redux'
import { nextSlide, prevSlide } from '../redux/actions'
import SlideNumber from '../component/SlideNumber'

const mapStateToProps = (state) => {
  return {
  	num: state.slideAction.num
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSlideClick: (text) => {
      if (text == "prev") {
        dispatch(prevSlide())
      }
      else {
        dispatch(nextSlide())
      }
    }
  }
}

const VisibleSlideNumber = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideNumber)

export default VisibleSlideNumber