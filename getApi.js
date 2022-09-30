fetch("https://jsonplaceholder.typicode.com/posts").then((res)=>{
    res.json().then((result)=>{
        console.log(result)
        let tableData = "";
        result.map((value) => {
               tableData+=`<tr>
               <td>${value.userId}</td>
               <td>${value.id}</td>
               <td>${value.title}</td>
               <td>${value.body}</td>
               </tr>`
    })
    document.getElementById('tbody').innerHTML=tableData;
})
})
