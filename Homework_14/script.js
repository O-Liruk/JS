'use strict';

class Group { 
    constructor(){
        this._students = [];
    } 

    get students() {
        return this._students;
    }
     
    addStudents(velue){
        this._students.push(velue);
    }

    getAverageMark(){
        let groupMark = this._students.flatMap(({marks}) => marks);
        return `AverageMark: ${groupMark.reduce((sum, nam) => sum + nam) / groupMark.length}`;
    }  
}

class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }
};

const feGroup = new Group();
const firstStudent = new Student('Alex1 Smit', [10,9,2,10,6]);

feGroup.addStudents(firstStudent);
feGroup.addStudents( new Student('John  Doe', [10, 10, 3, 10]));
feGroup.addStudents(new Student('Alex Smith', [10, 9, 8, 8]));
feGroup.addStudents(new Student('Bob Johnson', [9, 7, 10, 8]));

console.log(feGroup.students);
console.log(feGroup.getAverageMark());

