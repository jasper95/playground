import React, { PureComponent } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TodoList from './TodoList';

class TodoBoard extends PureComponent {
  render(){
    const { lists, onOrderList: onOrder, onOrderCard } = this.props
    return (
      <div>
        <div style={{ display: 'flex' }}>
          {lists.map((list, index) => (
            <TodoList
              key={list.id}
              {...list}
              onOrder={onOrder}
              onOrderCard={onOrderCard}
              index={index}
              />
          ))}
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(TodoBoard);