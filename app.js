const alert =document.querySelector('.alert')
const form= document.querySelector('.grocery-form')
const grocery=document.querySelector('#grocery')
const submitBtn=document.querySelector('.submit-btn')
const container=document.querySelector('.grocery-container')
const list =document.querySelector('.grocery-list')
const clearBtn=document.querySelector('.clear-btn')

let editElement;
let editFlag=false;
let editID=''



//display alert
const displayAlert=(text,action)=>{
    alert.textContent=text
    alert.classList.add(`alert-${action}`)
    ///remove alert
    setTimeout(()=>{
        alert.textContent=''
        alert.classList.remove(`alert-${action}`)
    },2000)
}
const clearItems=()=>{
   const items= document.querySelectorAll('.grocery-item')
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    displayAlert('empty list','danger')
    setBackToDefault()
    localStorage.removeItem('list')

}
//deleteFucntion
function deleteItem(e){
const element=e.currentTarget.parentElement.parentElement;
const id=element.dataset.id
list.removeChild(element)
if(list.children.length==0){
    container.classList.remove('show-container')
}
displayAlert('Item removed','danger')
setBackToDefault()
//removefromlocal storage
removefromlocalStorage(id)
    
}
///edit

function editItem(e){
const element=e.currentTarget.parentElement.parentElement;
editElement=e.currentTarget.parentElement.previousElementSibling
grocery.value=editElement.innerHTML
editFlag=true;
editID=element.dataset.id
submitBtn.textContent='Edit'

}

////set back to default
function setBackToDefault(){
    grocery.value=''
    editFlag=false
    editID=''
    submitBtn.textContent='submit'

}

//addToLocalStorage




///form sybmition
form.addEventListener('submit',addItem)

///clear items
clearBtn.addEventListener('click',clearItems)

////loadItems
window.addEventListener('DOMContentLoaded',setupItems)

function addItem(e){
    e.preventDefault();
    const value= grocery.value

       ///to get unique id 
    const id =new Date().getTime().toString()

    if(value && !editFlag){

       createListItem(id,value)
        ////displayAlert
        displayAlert(`${value} addded to the list`,'success');

        // show container
        container.classList.add('show-container')

        ///addtoLocalStorage
        addToLocalStorage(id,value)
        //set back to default
        setBackToDefault()
    }else if(value&& editFlag){
        editElement.innerHTML=value
        displayAlert('value changed','success')
        ////editLocalStorage
        editLocalStorage(editID,value)
        setBackToDefault()
    }else{
       displayAlert('please enter value','danger')
    }
}
function addToLocalStorage (id,value){
    const grocery={id,value}; /// is equal to {id:id, value:value } ES6 
    let items=getLocalStorage();
    items.push(grocery)
    localStorage.setItem('list',JSON.stringify(items))
   

}


function removefromlocalStorage(id){
    let items=getLocalStorage()
     items=items.filter(item=>item['id']!=id)
     localStorage.setItem('list',JSON.stringify(items))

    
}
function editLocalStorage(id,value){
    let items=getLocalStorage()
    items=items.map((item)=>
    {

    if(item['id']==id){
        item.value=value
    }
    return item
    })
    localStorage.setItem('list',JSON.stringify(items))
}


function getLocalStorage(){
    return JSON.parse(localStorage.getItem('list'))||[]
}

function setupItems(){
    let items=getLocalStorage()
    if(items.length>0){
        items.forEach(item=>
            {
                createListItem(item['id'],item['value'])

            })
            container.classList.add('show-container')
    }
}
function createListItem(id,value){
    const element=document.createElement('article')
    //add class
    element.classList.add('grocery-item')
    ///let id cunku id ekleymrm bu yuzden data-id ekliom
    const attr=document.createAttribute('data-id')
    attr.value=id
    element.setAttributeNode(attr)
    element.innerHTML=` <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn"> <i class="fas fa-edit"></i></button>
      <button type="button" class="delete-btn"> <i class="fas fa-trash"></i></button>
    </div>`;

    const deleteBtn=element.querySelector('.delete-btn')
    const editBtn=element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click',deleteItem)
    editBtn.addEventListener('click',editItem)

    ///appendchild
    list.appendChild(element)

}