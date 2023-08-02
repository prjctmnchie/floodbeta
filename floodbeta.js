const inputGroup = document.querySelector('.input-group');
const addButton = document.querySelector('#addButton');
const listContainer = document.querySelector('#list-container');

addButton.addEventListener('click', function(e){
    e.preventDefault;
    const inputItem = document.querySelector('#inputItem');
    const inputQty = document.querySelector('#inputQty');
    const inputBudget = document.querySelector('#inputBudget');

    if(inputItem.value === '' && inputBudget.value === ''){
        alert("You must write an item name and the budget for it.");
    } else if(inputItem.value === ''){
        alert("You must write an item to add.")
    } else if(inputBudget.value === ''){
        alert("You must provide your budget for the item.");
    } else{
        let li = document.createElement("li");
        let span = document.createElement("span");

        span.textContent = `${inputQty.value} ${inputItem.value} - P ${inputBudget.value}`;
        li.appendChild(span);
        listContainer.appendChild(li);
        
        inputItem.value = '';
        inputQty.value = '1';
        inputBudget.value = '';
        saveData();

        // CREATING BUTTONS
        const buttonAction = document.createElement('div');
        buttonAction.classList.add('actions');
        // EDIT BUTTON
        const editButton = document.createElement("button");
        editButton.classList.add("edit","btn", "btn-success");
        editButton.type='button';
        editButton.innerHTML = 'Edit';
        // DELETE BUTTON
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete","btn", "btn-danger", "fa", "fa-trash");
        deleteButton.type='button';
        // deleteButton.innerHTML = 'Delete';
        
        buttonAction.appendChild(editButton);
        buttonAction.appendChild(deleteButton);
        li.appendChild(buttonAction);
        saveData()
    }
})
  
// EDIT-SAVE && DELETE FUNCTION &&&& CROSSING OUT DONE ITEMS
listContainer.addEventListener("click", (e) =>{
   
    const liItem = e.target.parentElement.parentElement;
    const liText = liItem.firstChild;
    const liValue = liText.textContent;

     // IF THE ITEM IS DONE AND NEED TO CROSS OUT
     if (e.target.tagName === 'LI' || e.target.nodeName == "SPAN"){
        e.target.classList.toggle("checked");
        saveData()
    }

    // EDIT FUNCTION
    if (e.target.textContent.toLowerCase() === "edit" && e.target.tagName === 'BUTTON'){
        e.target.innerHTML = "Save";

        let inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.value = liValue;

        liItem.appendChild(inputText);
        liItem.insertBefore(inputText, liText);
        liItem.removeChild(liText);
    } 
    // SAVE FUNCTION
    else if (e.target.textContent.toLowerCase() === "save" && e.target.tagName === 'BUTTON'){
        e.target.innerHTML = "Edit";

        let newValue = document.createElement('span');
        newValue.textContent = liText.value;

        liItem.appendChild(newValue);
        liItem.insertBefore(newValue, liText);
        liItem.removeChild(liText);
        saveData()
    } 
    // DELETE FUNCTION
    else if (e.target.classList.contains('delete') && e.target.tagName === 'BUTTON'){
        e.target.parentElement.parentElement.remove();
        saveData()
    } 
        
})

// SAVING DATA && SHOWING DATA
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

// REMOVING DATA && CLEARING DATA
function removeData(){
    localStorage.removeItem("data");
}
function clearData(){
    localStorage.clearData();
}

// removeData()
// clearData()
showData()

// showData SHOULD ALWAYS BE BELOW THE removeData AND clearData.
