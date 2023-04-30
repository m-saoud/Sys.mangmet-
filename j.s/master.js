let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

//make mood between craet and update
let mood = "creat"
let temp;


//get total
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = "green"
    } else {
        total.innerHTML = " "
        total.style.background = "red"

    }
}

//creat product and //save localstorge


let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []

};

submit.onclick = function()
{
    let newPro = {
      title: title.value,
      price: price.value ,
      taxes: taxes.value ,
      ads: ads.value ,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value ,
      category: category.value,
    }
//count and add new product
    if (mood==="creat") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro)
            
        }
      
  }else {
            dataPro.push(newPro)
            
        }  
    } else {
        dataPro[temp] = newPro
        mood = "creat"
        submit.innerHTML = "create"
        count.style.display = "block"
        
        
    }
    
   


    localStorage.setItem("product",JSON.stringify(dataPro))
    console.log(dataPro)
    clearData()
    showData()
    
}

//clear inputs
function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""

}

//read (showData)
function showData() {
    getTotal();
    let table = " "
    for (let i = 0; i < dataPro.length; i++) {
        table += ` 
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})"  id="update">Update</button></td>
        <td><button onclick="deletData(${i})" id="delete">Delete</button></td>
    </tr>`
        
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDeletall = document.getElementById("deletall")
    if (dataPro.length > 0) {
        btnDeletall.innerHTML = `
      <button onclick = "deleall()" >Delete All(${dataPro.length})</button>

        `
        
        
    } else {
        btnDeletall.innerHTML =" "
    }
}
showData()





//delete
function deletData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleall() {
    localStorage.clear() 
    dataPro.splice(0)
    showData()
}


//update
function updateData(e) {
   title.value = dataPro[e].title
   price.value = dataPro[e].price
   taxes.value = dataPro[e].taxes
   ads.value = dataPro[e].ads
   count.value = dataPro[e].count
    category.value = dataPro[e].category
    getTotal()
    count.style.display = "none"
    submit.innerHTML = "Update"
    mood = "Update"
    temp = e
    scroll({
        top: 0,
        behavior:"smooth"
        
    })
   
} 






//search
let seMood = "title"

function getSerMood(id) {
    let search = document.getElementById ("search")
    if (id ==="serchTitle") {

        seMood = "title"
        
        search.placeholder="Serach by title "
    
    } else {
        seMood = "serachcategory"
        search.placeholder="Serach by category "

    }
    search.focus()
    search.value = ""
    showData()
}
}

function serchDta(value) {
    let table = ""
    if (seMood == "title") {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                table += ` 
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})"id="update">Update</button></td>
        <td><button onclick="deletData(${i})" id="delete">Delete</button></td>
    </tr>`
            }
        
        }
    
    } else {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += ` 
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})"  id="update">Update</button></td>
    <td><button onclick="deletData(${i})" id="delete">Delete</button></td>
</tr>`
    
            }
        }
    }
document.getElementById("tbody").innerHTML = table;

}



//clean data
//validation
