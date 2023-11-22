import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';


const ElementIDs = {
    TodList: '.todo-list',
    NewTodoInput: '#new-todo-input'
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodList, todos )
    }

    (() => {

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    const newDescriptiontInput = document.querySelector( ElementIDs.NewTodoInput);


    newDescriptiontInput.addEventListener('keyup', ( event )=> {
        if( event.keyCode !== 13) return;
        if(  event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );

        displayTodos();

        event.target.value = '';

    })

}