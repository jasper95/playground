import { findDOMNode } from 'react-dom'
import pick from 'lodash/pick'

export const sourceSpec = {
  beginDrag(props) {
    return pick(props, ['id', 'index', 'listId'])
  },
  canDrag({ isPlaceholder }) {
    return !isPlaceholder
  },
  isDragging({ id }, monitor) {
    return monitor.getItem().id === id
  }
}

export const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export const targetSpec = {
  hover(props, monitor, component) {
    const monitorItem = monitor.getItem()
    const { index: hoverIndex } = props
    const { index: dragIndex } = monitorItem
    if (monitorItem.id === props.id)
      return

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    const hoverClientX = clientOffset.x = hoverBoundingRect.left

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (monitorItem.listId && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (monitorItem.listId && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Only perform the move when the mouse has crossed half of the items width
    // When dragging right, only move when the cursor is below 50%
    // When dragging left, only move when the cursor is above 50%

    // Dragging to right
    if (!monitorItem.listId && dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    // Dragging to left
    if (!monitorItem.listId && dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    props.onOrder(monitorItem, pick(props, ['id', 'index', 'listId']))
    monitorItem.index = dragIndex
    if (monitorItem.listId)
      monitorItem.listId = props.listId
  }
}

export const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
})