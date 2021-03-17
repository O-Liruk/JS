import './form.css';

import View from '../View';
import template from './formTemplate.html';

export default class FormView extends View {
    static FORM_VISIBLE_CLASS = 'show-form';

    get config() {
        return {
            template,
            events: [
                {
                    selector: '.show-form-btn',
                    event: 'click',
                    callback: () => this._showForm(),
                },
                {
                    selector: 'form',
                    event: 'submit',
                    callback: (e) => this._onFormSubmit(e),
                },
            ],
        };
    }

    _showForm() {
        this._$el.addClass(FormView.FORM_VISIBLE_CLASS);
    }

    _hideForm() {
        this._$el.removeClass(FormView.FORM_VISIBLE_CLASS);
    }

    _onFormSubmit(e) {
        e.preventDefault();

        this._options.onSave({
            name: e.target.elements.name.value,
        });

        e.target.reset();

        this._hideForm();
    }
}
