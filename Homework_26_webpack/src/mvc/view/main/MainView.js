import View from '../View';
import ListView from '../list/ListView';
import template from './mainTemplate.html';
import FormView from '../form/FormView';

export default class MainView extends View {
    get config() {
        return { template };
    }
    constructor($container, options) {
        super(options);
        this._$el.appendTo($container);
        console.log('main view ', this);

        this._list = new ListView({
            onMarkChange: options.onMarkChange,
            onDelete: options.onDelete,
        });
        this._form = new FormView({
            onSave: options.onAdd,
        });
        this._$el.append(this._list._$el);
        this._$el.append(this._form._$el);
    }

    renderList(list) {
        this._list.renderList(list);
    }
}
