import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';

class Feedback extends React.Component {
  render() {
    const { correctPoint } = this.props;
    const FIX = 3;
    return (
      <div>
        {/* <h1>Feedback</h1> */}
        <Header />
        { correctPoint < FIX && <h1 data-testid="feedback-text">Could be better...</h1>}
        { correctPoint >= FIX && <h1 data-testid="feedback-text">Well Done!</h1>}
      </div>
    );
  }
}

Feedback.propTypes = {
  correctPoint: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
