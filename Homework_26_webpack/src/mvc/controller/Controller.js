import Collection from '../model/Collection';
import MainView from '../view/main/MainView';
export default class Controller {
    constructor($container) {
        this._view = new MainView($container, {
            onAdd: (data) => this._onStudentAdd(data),
            onDelete: (sid) => this._onStudentDelete(sid),
            onMarkChange: (sid, mid, mark) =>
                this._onStudentMarkChange(sid, mid, mark),
        });
        this._collection = new Collection();

        this._collection.fetch().then(this._renderList);
    }

    _renderList = () => {
        this._view.renderList(this._collection.getList());
    };

    _onStudentAdd(data) {
        this._collection.addNew(data).then(this._renderList);
    }

    _onStudentMarkChange(sid, mid, mark) {
        this._collection.changeStudentMark(sid, mid, mark);
    }

    _onStudentDelete(sid) {
        this._collection.deleteStudent(sid).then(this._renderList);
    }
}
