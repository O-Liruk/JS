import api from '../../studentsApi';

export default class Collection {
    _setData = (list) => {
        this._list = list;
    };

    fetch() {
        return api.get().then(this._setData);
    }

    getList() {
        return this._list;
    }

    get(id) {
        return this.getList().find((item) => item.id === id);
    }

    addNew(data) {
        data.marks = new Array(10).fill(0);

        return api.post('', data).then((item) => this._list.push(item));
    }

    deleteStudent(id) {
        this._list = this._list.filter((item) => item.id !== id);

        return api.delete(id);
    }

    changeStudentMark(sid, mid, mark) {
        const student = this.get(sid);

        student.marks[mid] = mark;

        return api.put(sid, student);
    }
}
