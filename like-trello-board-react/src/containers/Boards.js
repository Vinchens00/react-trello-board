import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../styles/components/Boards.css';
import { range } from 'lodash';
import BoardPreview from './BoardPreview';
import AddForm from './AddForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import makeRequest from '../utils/request';
import * as BoardAction from '../actions/BoardActions';

const BOARD_LABEL = 'Create new board...';

class Boards extends React.Component {
  componentWillMount() {
    makeRequest('boards')
      .then(response => {
        const { addBoards } = this.props.boardActions;
        addBoards(response.boards);
      })
  }

  render() {
    const { boards } = this.props;

    const boardList = boards.map(board => {
      return (
        <BoardPreview key={board.id} board={board}/>
      );
    });

    return (
      <div className={styles.boards}>
        {boardList}
        <AddForm className={styles['boards__add-form']} label={BOARD_LABEL}/>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    boards: state.boards
  }
}

function mapDispatchToProps(dispatch) {
  return {
    boardActions: bindActionCreators(BoardAction, dispatch)
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(Boards);