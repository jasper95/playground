import React, { PureComponent } from 'react'
export const TodoContext = React.createContext()
export default Component => (
  class extends PureComponent {
    render() {
      return (
        <TodoContext.Consumer>
          {(context) => (
            <Component
              {...this.props}
              context={context}
            />
          )}
        </TodoContext.Consumer>
      )
    }
  }
)
