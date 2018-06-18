'use strict';

/* global Item, cuid*/

const store = (function () {
  //const foo = 'bar';
  const items = [];

  let hideCheckedItems = false;
  let searchTerm = '';
  function findById(id){
    return store.items.find(id);
  }
  
  function addItem(name){
    try {
      Item.validateName(name);
      Item.create(name);
      this.items.push({ id: cuid(), name: name, checked: false });
    }
    catch (e){
      console.log ('ERROR! Item not added to list! {error.message}');
    }
  }
   
  function findAndToggleChecked (id) {
    this.findById(id);
    this.checked = !this.checked;
  }
    
  function findAndUpdateName (id, newName){
    try{
      Item.validateName(newName);
      this.findById(id).name =newName;
    }
    catch (e) {
      console.log('Cannot update name: {error.message}');
    }
  }
  
  function findAndDelete (selectedId){
    console.log(selectedId);

    let filteredArray = this.items.filter(function (items) {
      return items.id !== selectedId;
    });

    console.log(filteredArray);
    this.items = filteredArray;

    // return this.items;
  }
  
  return{ 
    items: items, addItem, findAndToggleChecked, findAndUpdateName, findAndDelete,
  };
}());


