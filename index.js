
let model = document.getElementsByClassName("add_emp_model")[0]
let data = JSON.parse(localStorage.getItem("data") || "[]");


showList(data)
window.addEventListener("click", closeModel)

document.getElementById('add_emp').addEventListener('click', openModel)
function openModel() {
    document.getElementsByClassName("add_emp_model")[0].style.display = "block";
}

function closeModel(e) {
    if (model && !model.contains(e.target) && e.target.id != 'add_emp') {
        model.style.display = "none";
    }

}

let empDiv = document.getElementsByClassName("emp_name")


let empName = ''
let dob = ''

document.getElementById('name').addEventListener('input', function (e) {
    empName = e.target.value
})

document.getElementById('dob').addEventListener('input', function (e) {
    dob = e.target.value
})


document.getElementById("submit").addEventListener("click", addNewEmp)
function addNewEmp() {
    if(!empName || !dob){
        alert("filled required data")
        return
    }
    let data = localStorage.getItem("data") ?? '[]'
    data = JSON.parse(data)
    data.push({ empName, dob })
    localStorage.setItem("data", JSON.stringify(data));
    document.getElementById('name').value = ''
    document.getElementById('dob').value = ''
    empName = ''
    dob = ''

    model.style.display = "none";


    showList(data)
}

function showList(data) {

    let mainDiv = document.getElementsByClassName("emp_name")[0]
    mainDiv.innerHTML = ''

    data.map(item => {
        let name = document.createElement("h3")
        let button = document.createElement("button")
        name.innerText = item.empName
        button.innerText = 'delete'
        button.addEventListener("click", () => {
            deleteItem(item.empName)
        })
        name.addEventListener('click', () => {
            showDetails(item.empName)
        })
        mainDiv.appendChild(name)
        mainDiv.appendChild(button)

    })

}

function deleteItem(name) {
    let data = JSON.parse(localStorage.getItem("data"));

    data = data.filter(item => item.empName != name);

    localStorage.setItem("data", JSON.stringify(data));

    // Refresh the list after deletion
    showList(data);
}
function showDetails(name) {
    console.log("🚀 ~ showDetails ~ name:", name)
    let data = JSON.parse(localStorage.getItem("data"));

    data = data.filter(item => item.empName == name)[0];
    console.log("🚀 ~ showDetails ~ data:", data)
    let mainDiv = document.getElementsByClassName("emp_details")[0]
    mainDiv.innerHTML = ''

    let empName = document.createElement("h3")
    let button = document.createElement("p")
    empName.innerText = data.empName
    button.innerText = data.dob


    mainDiv.appendChild(empName)
    mainDiv.appendChild(button)





}




