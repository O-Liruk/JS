const API_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io';
const TODOS_URL = API_URL + '/todos';


class Controller{
    constructor($container){
        this.$container = $container;

        this.todoCollection = new Collection(TODOS_URL);
        this.todoCollection.fetch().then(() => {
            this.renderList()
        });

        this.listView = new TodoListView({
            onDelete:(id) => this.deleteTodo(id), 
            onToggle:(id) => this.toggleTodo(id)

        });
        this.listView.appendTo($container); 

        this.formWiew = new NewTodoFormView({
            onSaveNewTodo:(task) => this.saveNewTodo(task)
        });

        this.formWiew.appendTo($container); 


    }
    renderList(){
        this.listView.renderList(this.todoCollection.getList());
    }
    
    deleteTodo(id){
        this.todoCollection.delete(id).then(() => this.listView.removeElement(id));
    }

    toggleTodo(id){
        this.todoCollection.toggle(id).then(() => this.listView.renderElement(this.todoCollection.get(id)));
        // console.log('clic', id)
    }
    saveNewTodo(task){
        this.todoCollection.addNewTask(task).then(() => this.renderList());

    }
}
 