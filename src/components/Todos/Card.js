import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import {
  sourceSpec,
  sourceCollect,
  targetSpec,
  targetCollect
} from './ListDndParams'

const Card = (props) => {
  const {
    title,
    description,
    connectDragSource,
    isDragging,
    connectDropTarget,
    isPlaceholder
  } = props
  const opacity = isDragging || isPlaceholder ? 0 : 1;
  return connectDragSource(connectDropTarget(
    <div style={{ background: '#00FF7F', margin: '3px 3px', padding: '2px 2px', opacity, minHeight: '40px' }}>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  ));
};

export default flow(
  DragSource('CARD', sourceSpec, sourceCollect),
  DropTarget('CARD', targetSpec, targetCollect)
)(Card);