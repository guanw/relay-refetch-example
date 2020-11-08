import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';

class TodoItemContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            changed: false,
        };
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    render() {
        const todoItem = this.props.todoItem;
        if (todoItem === null) {
            return (
                <div>
                    not found
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <button onClick={this._refetch}>refresh</button>
                </div>
                
            );
        }
        return (
            <div>
              {todoItem.name}
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            <button onClick={this._refetch}>refresh</button> 
            </div>
        )
    }
    _refetch = () => {
        this.setState({
            changed: false,
        })
        this.props.relay.refetch(
            {id: this.state.value},
            null,
            () => {
                // This refetch doesn't seem to update props.todoItem!!
                console.log("refetched!");
                this.setState({
                    changed: true,
                })
            },
            {force: true}
        )
    }
}

export default createRefetchContainer(
    TodoItemContainer,
    {
        todoItem: graphql`
            fragment TodoItemContainer_todoItem on TodoItem
            @argumentDefinitions(id: {type: "String"}) {
                name
            }
        `
    },
    graphql`
        query TodoItemContainerRefetchQuery($id: String!) {
            todoItem (id: $id) {
                ...TodoItemContainer_todoItem @arguments(id: $id)
            }
        }
    `,
);
