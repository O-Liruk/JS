class NewTodoFormView {
    static ADD_BTN_SELECTOR = '.todo-btn';
    static TODO_INPUT_SELECTOR = '#todo-input';

    constructor(options){
        this._$form = this.initForm();
        this._options = options;
    }
    initForm(){
        return $(`<div id="form">
                    <div class="todo-form">
                            <input type="text" id="todo-input"/>
                        <div class="todo-form-btn">
                            <button class="todo-btn">Add</button>
                        </div>
                    </div>
                 </div>`).on('click', NewTodoFormView.ADD_BTN_SELECTOR, this.onAddBtnClick.bind(this));

    }

    appendTo($container){
        $container.append(this._$form);
    }

    onAddBtnClick(e){
        const task = {
            title: $(NewTodoFormView.TODO_INPUT_SELECTOR).val()
        }
        this._options.onSaveNewTodo(task);  
        this.clearInput();
    }

    clearInput(){
        $(NewTodoFormView.TODO_INPUT_SELECTOR).val('');
    }

}