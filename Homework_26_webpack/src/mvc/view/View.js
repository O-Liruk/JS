import $ from 'jquery';

export default class View {
    constructor(options = {}) {
        this._options = options;

        this._initView();
    }

    _initView() {
        if (!this.config) {
            return console.error('view should implement config getter');
        }

        this._renderTemplate();
        this._bindEvents();
        this._getSelectors();
    }

    _renderTemplate() {
        if (!this.config.template) {
            console.error('template is required configuration option');
            this._$el = $();
            return;
        }

        this._$el = $(this.config.template);
    }

    _bindEvents() {
        if (!this.config.events) {
            return;
        }

        this.config.events.forEach(({ selector, event, callback }) =>
            this._$el.on(event, selector, callback)
        );
    }

    _getSelectors() {
        this._selectors = {};
        if (!this.config.selectors) {
            return;
        }

        for (let selectorName in this.config.selectors) {
            this._selectors[selectorName] = this._$el.find(
                this.config.selectors[selectorName]
            );
        }
    }

    _interpolate(template, data) {
        return Object.keys(data).reduce(
            (str, key) => str.replace(new RegExp(`{{${key}}}`, 'g'), data[key]),
            template
        );
    }
}
