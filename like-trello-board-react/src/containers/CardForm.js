import React from 'react';
import '../styles/components/CardForm.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import AddForm from './AddForm';
import * as CardAction from '../actions/CardActions';
import * as CommentAction from '../actions/CommentAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

const NEW_COMMENT_LABEL = 'Add new comment...';
const NEW_COMMENT_PLACEHOLDER = 'Type your comment here';
const DESCRIPTION_LABEL = 'Edit description...';
const DESCRIPTION_PLACEHOLDER = 'Type description here';
const DESCRIPTION_BUTTON_TEXT = 'Save';

class CardForm extends React.Component {
  componentWillMount() {
    const { cardId, boardId } = this.props.match.params;
    const { loadCard } = this.props.cardActions;
    loadCard(boardId, cardId);
  }

  _onSubmitNewComment(message) {
    const cardId = this.props.match.params.cardId;
    const { addComment } = this.props.commentActions;
    addComment(cardId, { message });
  }

  _onUpdateDescription(description) {
    const cardId = this.props.match.params.cardId;
    const { updateCard } = this.props.cardActions;
    updateCard(cardId, { description });
  }

  _getData(boardId, cardId) {
    let { cards, comments } = this.props;
    const card = cards.find(card => (card.id === cardId) && (card.boardId === boardId));
    if (!card) {
      return {
        card: {},
        comments: []
      };
    }

    comments = comments.filter(comment => comment.cardId === cardId);

    return {
      card,
      comments
    };
  }

  _renderComments(comments) {
    return comments.map(comment => {
      return (
        <div key={comment.id} className='card-form__body__comments__value'>
          {comment.message}
        </div>
      );
    });
  }

  render() {
    const { cardId, boardId } = this.props.match.params;
    const { card, comments } = this._getData(+boardId, +cardId);

    return (
      <Modal
        isOpen={true}
        overlayClassName='card-form__overlay'
        className='card-form__content'
        portalClassName='card-form'
        contentLabel='Card Form'
      >
        <div className='card-form__header'>
          <h3 className='card-form__header__card-name'>
            <i className='fa fa-id-card-o' aria-hidden='true'/>{card.name}
          </h3>
          <span className='card-form__header__close-icon'>
            <Link to={`/boards/${boardId}`}>
              <i className='fa fa-times' aria-hidden='true'/>
            </Link>
          </span>
        </div>

        <div className='card-form__body'>
          <div className='card-form__body__description'>
            <AddForm
              label={DESCRIPTION_LABEL}
              submitForm={this._onUpdateDescription.bind(this)}
              placeholder={DESCRIPTION_PLACEHOLDER}
              buttonText={DESCRIPTION_BUTTON_TEXT}
              defaultValue={card.description}
            />
            <span className='card-form__body__description__value'>
              {card.description || '-' }
            </span>
          </div>

          <div className='card-form__body__add-comment-form'>
            <h3>
              <i className='fa fa-comments' aria-hidden='true'/> Add Comment:
            </h3>
            <AddForm
              label={NEW_COMMENT_LABEL}
              submitForm={this._onSubmitNewComment.bind(this)}
              placeholder={NEW_COMMENT_PLACEHOLDER}
            />
          </div>

          <div className='card-form__body__comments'>
            <h3><i className='fa fa-list' aria-hidden='true'/> Comments ({comments.length}):</h3>
            {this._renderComments(comments)}
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProp(state) {
  return {
    cards: state.cards,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cardActions: bindActionCreators(CardAction, dispatch),
    commentActions: bindActionCreators(CommentAction, dispatch)
  }
}

CardForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cardId: PropTypes.string,
      boardId: PropTypes.string
    }),
    name: PropTypes.string
  }),
  comments: PropTypes.array,
  cards: PropTypes.array,
  cardActions: PropTypes.object,
  commentActions: PropTypes.object
};

export default connect(mapStateToProp, mapDispatchToProps)(CardForm);
