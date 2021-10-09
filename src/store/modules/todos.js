import axios from "axios";


const state = {
    todos:[]
};

const getters = {
    allTodos : (state) => state.todos
};


const mutations = { 
    setTodos: (state, payload) => (state.todos = payload),
    newTodo: (state, payload) => state.todos.unshift(payload),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id != id),
    updateTodo: (state, upTodo) =>{
        const index = state.todos.findIndex(todo => todo.id === upTodo.id);
        if( index !== -1 ){
            state.todos.splice(index, 1, upTodo);
        }
    }
};

const actions = {
    async fetchTodos({ commit})
    {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        commit('setTodos',response.data);
    },

    async addTodo({commit}, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        });
        commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id){
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id);
    },

    async filterTodos({ commit }, e){

        // get seelcted number
        const limit  = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos',response.data);
    },

    async updateTodo({ commit }, upTodo){
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${upTodo.id}`);
        commit('updateTodo', upTodo);

    }
};


export default {
    state,
    getters,
    actions,
    mutations
}
