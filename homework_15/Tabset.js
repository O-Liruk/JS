'use strict'

class Tabset {

    static BODY_CLASS = 'body'
    static TITLE_CLASS = 'title-new'
    static WRAPPER_CLASS = 'wrapper'
    static ACTIVE_CLASS = 'active';
    static TITLES_LIST_CLASS = 'title-list'
    
  
    static TITLE_LIST = [
      'Heading 1',
      'Heading 2',
      'Heading 3',
    ];
  
    currentIndex = 0;
    
    constructor(container) {

      this.container = container;
  
      this.createTitles();
  
      this.show(0);
      
    }

    createTitles() {
  
      this.listOfTitles = document.createElement('div');
      
      this.listOfTitles.className = Tabset.TITLES_LIST_CLASS;
  
  
      Tabset.TITLE_LIST.forEach((title, index) => {
  
        const titleNode = document.createElement('div');
  
        titleNode.className = Tabset.TITLE_CLASS;
        titleNode.innerText = title;
  
        titleNode.addEventListener('click', (e) => { 
          this.show(index);
        });
  
  
        this.listOfTitles.appendChild(titleNode);
      });
  
      
      document.body.insertBefore(this.listOfTitles, this.container);
    }
  
    show(index) {
      this.hide(this.currentIndex);
  
      this.currentIndex = index;
  
      this.listOfTitles.children[index].classList.add(Tabset.ACTIVE_CLASS);
  
      this.container.children[index].classList.add(Tabset.ACTIVE_CLASS);
    }
  
    hide(index) {
      this.listOfTitles.children[index].classList.remove(Tabset.ACTIVE_CLASS);
      this.container.children[index].classList.remove(Tabset.ACTIVE_CLASS);
    }

};