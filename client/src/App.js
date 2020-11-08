import React from 'react';
import { QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from './environment';
import TodoItemContainer from './TodoItemContainer';

export default class App extends React.Component {
  render() {
    return <QueryRenderer
        environment={environment}
        query={graphql`
            query AppQuery($id: String!) {
                todoItem(id: $id) {
                    ...TodoItemContainer_todoItem @arguments(id: $id)
                }
            }
        `}
        variables={{
            id: '1',
        }}
        render={({error, props}) => {
        if (error) {
            return <div>{error.message}</div>;
        } else if (props) {
        }
        return <TodoItemContainer {...props} />;
        return <div>Loading</div>;
        }}
    />
  }
}
