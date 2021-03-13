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
    //localStorage.removeItem('list)

}   

////set back to default
const setBackToDefault=()=>{
    grocery.value=''
    editFlag=false
    editID=''
    submitBtn.textContent='submit'

}

//addToLocalStorage

const addToLocalStorage=(id,value)=>{
    console.log('added to local storage')
}


///form sybmition
form.addEventListener('submit',addItem)

///clear items
clearBtn.addEventListener('click',clearItems)


function addItem(e){
    e.preventDefault();
    const value= grocery.value

       ///to get unique id 
    const id =new Date().getTime().toString()

    if(value && !editFlag){

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
        ///appendchild
        list.appendChild(element)
        ////displayAlert
        displayAlert(`${value} addded to the list`,'success');

        // show container
        container.classList.add('show-container')

        ///addtoLocalStorage
        addToLocalStorage(id,value)
        //set back to default
        setBackToDefault()
    }else if(value&& editFlag){
        
    }else{
       displayAlert('please enter value','danger')
    }
}