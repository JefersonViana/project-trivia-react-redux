import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const FIX = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        { assertions < FIX && <h1 data-testid="feedback-text">Could be better...</h1>}
        { assertions >= FIX && <h1 data-testid="feedback-text">Well Done!</h1>}
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
