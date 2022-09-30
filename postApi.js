
// Post Api Method
function postUser() {
    let form = document.getElementById('form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        let name = document.getElementById('name').value
        let company = document.getElementById('company').value
        let designation = document.getElementById('designation').value
        let employ_id = document.getElementById('employ_id').value
        let location = document.getElementById('location').value

        fetch('http://localhost:3002/student', {
            method: "POST",
            body: JSON.stringify({
                name,
                company,
                designation,
                employ_id,
                location
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (result) {
                // console.log(result)

                let data = document.getElementById('tbody')

                data.innerHTML =
                    `<tr>
            <td>${result.name}<td/>
            <td>${result.company}</td>
            <td>${result.designation}</td>
            <td>${result.employ_id}</td>
            <td>${result.location}</td>
            </tr>`
                alert("Created New User")
            })
    })
}
postUser()


// get api
function getUser() {
    fetch("http://localhost:3002/student")
        .then(res => {
            res.json()
                .then(result => {
                    // console.log(result)
                    let data = "";
                    result.forEach((value, index) => {
                        data += `<div class="editid" data-id=${value.id}><tr>
               <td data-id=${value.id} >${value.name}</td>
               <td>${value.company}</td>
               <td>${value.designation}</td>
               <td>${value.employ_id}</td>
               <td>${value.location}</td>
               <td><button id="btn-edit"  type="button" onclick="editTask(${value.id})" >Edit</button></td>
               <td><button id="btn-delete" type="button" onclick="deleteTask(${value.id})" >Delete</button></td>
               </tr></div>`
                    })
                    document.getElementById('tbody').innerHTML = data;
                })
        })
}
getUser()


// Clear Button
let clr = document.getElementById('btn_clr')
clr.addEventListener('click', function (e) {
    e.preventDefault()
    document.getElementById('name').value = ""
    document.getElementById('company').value = ""
    document.getElementById('designation').value = ""
    document.getElementById('employ_id').value = ""
    document.getElementById('location').value = ""
    // alert("clicked clear")
})


// Put Method
function editTask(value) {
    fetch("http://localhost:3002/student")
        .then(res => {
            res.json()
                .then(result => {
                    // console.log(result[value-1])
                    let name = document.getElementById('name')
                    let company = document.getElementById('company')
                    let designation = document.getElementById('designation')
                    let employ_id = document.getElementById('employ_id')
                    let location = document.getElementById('location')
                    name.value = result[value - 1].name
                    company.value = result[value - 1].company
                    designation.value = result[value - 1].designation
                    employ_id.value = result[value - 1].employ_id
                    location.value = result[value - 1].location
                }
                )
        }
        )

    let btnSubmit = document.getElementById('submit')
    let btnSave = document.getElementById('save')

    btnSubmit.style.display = "none"
    btnSave.style.display = "block"
    // alert("clicked" + id)

    let id = document.getElementById('save')
    id.addEventListener('click',(e)=>{
          e.preventDefault()
            
    let name = document.getElementById('name').value
    let company = document.getElementById('company').value
    let designation = document.getElementById('designation').value
    let employ_id = document.getElementById('employ_id').value
    let location = document.getElementById('location').value
    let item = { name, company, designation, employ_id, location }
    let url = `http://localhost:3002/student/${value}`;
    let option = {
        method: "PUT",
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }
    fetch(url, option)
        .then(res => {
            res.json()
                .then(result => {
                    // console.log(result)
                    alert("User Updated")
                })
        })
      
    })
    // alert("id:" + value)

}


// Delete Method
function deleteTask(value) {
    // alert(`Delete id : ${value} ?`)
    let deletePost = confirm("Do You want delete ?");
    if (deletePost) {
        let url = `http://localhost:3002/student/${value}`;
        fetch(url, {
            method: "DELETE"
        })
    }
}


