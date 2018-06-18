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
    let foundItem = this.items.find(item => item.id === id);
    foundItem.checked = !foundItem.checked;
  }
    
  function findAndUpdateName (id, newName){
    try{
      console.log('`findAndUpdateName` ran');
      //console.log (newName);
      Item.validateName(newName);
      //console.log(this.items.find(item => item.id ===id));
      //   this.items.findById(id).name = item.name;

      let item = this.items.find(item => item.id ===id);
      //console.log(item);
      item.name = newName;
      console.log(item.name);
      
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
  
  function toggleCheckedFilter (){
    this.hideCheckedItems = !this.hideCheckedItems;
  }

  function setSearchTerm (val){
    this.searchTerm = val;
  }

  return{ 
    items: items, addItem, findAndToggleChecked, findAndUpdateName, findAndDelete,toggleCheckedFilter, setSearchTerm
  };
}());


