import './list.css';

import View from '../View';
import template from './listTemplate.html';
import listItemTemplate from './listItemTemplate.html';
import listItemMarkTemplate from './listItemMarkTemplate.html';

export default class ListView extends View {
    static STUDENT_ROW_SELECTOR = '.list-item';
    get config() {
        return {
            template,
            selectors: {
                listContainer: '.list-body',
            },
            events: [
                {
                    selector: 'input',
                    event: 'change',
                    callback: (e) => this._onMarkChange(e),
                },
                {
                    selector: '.delete-btn',
                    event: 'click',
                    callback: (e) => this._onDeleteBtnClick(e),
                },
            ],
        };
    }

    renderList(list) {
        this._selectors.listContainer.html(
            list.map(this._renderListItem).join('')
        );
    }

    _renderListItem = (item) => {
        return this._interpolate(listItemTemplate, {
            id: item.id,
            name: item.name,
            marks: item.marks.map(this._renderListItemMark).join(''),
        });
    };

    _renderListItemMark = (mark, id) => {
        return this._interpolate(listItemMarkTemplate, {
            mark,
            id,
        });
    };

    _getStudentId(el) {
        return el.closest(ListView.STUDENT_ROW_SELECTOR).dataset.studentId;
    }

    _onMarkChange(e) {
        const studentId = this._getStudentId(e.target);
        const markId = e.target.dataset.markId;
        const mark = e.target.value;

        this._options.onMarkChange(studentId, markId, mark);
    }

    _onDeleteBtnClick(e) {
        e.preventDefault();
        console.log('delete', e);

        const studentId = this._getStudentId(e.target);

        this._options.onDelete(studentId);
    }
}
