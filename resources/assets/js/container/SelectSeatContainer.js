import { connect } from 'react-redux';
import * as Actions from '../redux/Actions';
import SelectSeat from '../component/SelectSeat';

const mapStateToProps = (state, ownProps) => {
  return {
    seat: state.changeSeatState
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeSeat: (id) => {
      dispatch(Actions.changeSeat(id));
    }
  }
};

const SelectSeatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSeat);

export default SelectSeatContainer;
