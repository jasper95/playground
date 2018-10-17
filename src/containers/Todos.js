import React, { PureComponent } from 'react';
import { TodoBoard, TodoContext } from '../components/Todos'
import produce from 'immer'
import omit from 'lodash/omit'
import uuid from 'uuid/v4'

class Todos extends PureComponent {
  state = {
    lists: [
      {
        id: 1231111,
        title: 'Initial List',
        description: 'Init List Description',
        cards: [
          {
            id: 123,
            title: 'Card1',
            description: 'Init Description'
          },
          {
            id: 1234,
            title: 'Card2',
            description: 'Init Description'
          }
        ]
      },
      {
        id: 124,
        title: 'Initial List',
        description: 'Init List Description',
        cards: [
          {
            id: 121,
            title: 'Card3',
            description: 'Init Description'
          },
          {
            id: 12333,
            title: 'Card4',
            description: 'Init Description'
          }
        ]
      }
    ]
  }

  onOrderList = (dragged, hover) => {
    const nextState = produce(this.state, oldState => {
      const draggedList = oldState.lists.find(e => e.id === dragged.id)
      oldState.lists = oldState.lists.filter(e => e.id !== dragged.id)
      oldState.lists.splice(hover.index, 0, draggedList)
    })
    this.setState(nextState)
  }

  onOrderCard = (dragged, hover) => {
    const nextState = produce(this.state, oldState => {
      const targetList = oldState.lists.find(e => e.id === hover.listId)
      const sourceList = oldState.lists.find(e => e.id === dragged.listId)
      const draggedItem = sourceList.cards.find(e => e.id === dragged.id)
      sourceList.cards = sourceList.cards.filter(e => e.id !== dragged.id)
      const { cards: targetCards } = targetList
      targetCards.splice(hover.index, 0, draggedItem)
      targetList.cards = targetCards.filter(e => e)
    })
    this.setState(nextState)
  }

  onAddCard = (data) => {
    const nextState = produce(this.state, oldState => {
      const targetList = oldState.lists.find(e => e.id === data.listId)
      targetList.cards.push({
        ...omit(data, 'listId'),
        id: uuid()
      })
    })
    this.setState(nextState)
  }

  onRemoveCard = (data) => {
    const nextState = produce(this.state, oldState => {
      const targetList = oldState.lists.find(e => e.id === data.listId)
      targetList.cards = targetList.cards.filter(e => e.id === data.id)
    })
    this.setState(nextState)
  }

  render() {
    const {
      onOrderList,
      onOrderCard,
      onAddCard,
      onRemoveCard
    } = this

    const { lists } = this.state
    return (
      <TodoContext.Provider value={{ onAddCard, onRemoveCard }}>
        <TodoBoard
          lists={lists}
          onOrderList={onOrderList}
          onOrderCard={onOrderCard}/>
      </TodoContext.Provider>

    );
  }
}

export default Todos;