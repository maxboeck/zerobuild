import { render, Component, html } from 'preact/htm'

class App extends Component {
    addTodo() {
        const { todos = [] } = this.state
        this.setState({ todos: todos.concat(`Item ${todos.length + 1}`) })
    }
    render({ page }, { todos = [] }) {
        return html`
            <div class="app">
                <ul>
                    ${todos.map((todo) => html` <li key=${todo}>${todo}</li> `)}
                </ul>
                <button onClick=${() => this.addTodo()}>Add Todo</button>
            </div>
        `
    }
}

render(html`<${App} />`, document.getElementById('app'))
