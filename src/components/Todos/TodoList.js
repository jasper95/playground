import React, { PureComponent, Fragment } from 'react';
import Card from './Card'
import {
  targetSpec,
  targetCollect,
  sourceSpec,
  sourceCollect
} from './ListDndParams'
import { DropTarget, DragSource } from 'react-dnd';
import flow from 'lodash/flow'
import WithTodoContext from './TodoContext'

// const TodoContext = React.createContext

class TodoList extends PureComponent {
  state={
    isEditing: false
  }

  fields = ['title', 'description']

  getFormFields = () => {
    return this.fields.reduce((accum, field) => {
      accum[field] = this.formRef[field].value
      return accum
    }, {})
  }

  onClick = (e) => {
    const { target: { id }} = e
    const { isEditing } = this.state
    if (isEditing && id === 'submit') {
      const { id: listId } = this.props
      const formFields = this.getFormFields()
      this.setState({ isEditing: false }, () => {
        this.props.context.onAddCard({
          ...formFields,
          listId
        })
      })
    } else if (id === 'submit') {
      this.setState({ isEditing: true })
    } else {
      this.setState({ isEditing: false })
    }
  }

  render() {
    const {
      cards,
      onOrderCard: onOrder, id,
      connectDropTarget,
      connectDragSource,
      isDragging
    } = this.props
    const {
      isEditing
    } = this.state
    const { onClick } = this
    const submitLabel = isEditing ? 'Submit' : 'Add Card'
    const opacity = isDragging ? 0 : 1
    return connectDragSource(connectDropTarget(
      <div style={{ width: '200px', padding: '3px 3px', border: '2px solid red', margin: '10px 10px', opacity }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {cards.map((card, index) => (
            <Card listId={id} key={card.id} {...card } type='Card' onOrder={onOrder} index={index}/>
          ))}
            <Card listId={id} isPlaceholder key='placeholder' index={cards.length} onOrder={onOrder}/>
            <div>
              {isEditing && (
                <Fragment>
                  <form ref={ref => this.formRef = ref}>
                    <input name='title' placeholder='Title'/>
                    <input name='description' placeholder='Description'/>
                  </form>
                  <button id='cancel' onClick={onClick}>Cancel</button>
                </Fragment>
              )}
              <button id='submit' onClick={onClick}>{submitLabel}</button>
            </div>
        </div>
      </div>
    ));
  }
}

export default flow(
  DragSource('LIST', sourceSpec, sourceCollect),
  DropTarget('LIST', targetSpec, targetCollect),
  WithTodoContext
)(TodoList);