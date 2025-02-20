const url = "http://localhost:3000/medication"

function addMedication() {
    var med = {
        MedicationsID: document.getElementById("MedicationsID").value,
        patient: document.getElementById("patient").value,
        doctorid: document.getElementById("doctorid").value,
        medicationname: document.getElementById("medicationname").value,
        dosage: document.getElementById("dosage").value,
        prescribedate: document.getElementById("prescribedate").value

    }
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(med)

    })
    getAllMedication();

}

function deletemed(id) {
    console.log(id);
    fetch(url + "/" + id, {
        method: "DELETE"
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
        getAllMedication();
    })
        .catch((error) => {
            console.log(error)
        })

}

function getAllMedication() {

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        displayMedication(data);
    })
        .catch((error) => {
            console.log(error)
        })

}

function getmed(id) {
    fetch(url + "/" + id).then((response) => {
        if(!response.ok){
            throw new eror(":Error! status:$(response.status")
        }
        return response.json()
    })
    .then((data) => {
        console.log(data);
        med = data;
        document.getElementById("id").value = data.id;
        document.getElementById("MedicationsID").value = data.MedicationsID;
        document.getElementById("patient").value = data.patient;
        document.getElementById("doctorid").value = data.doctorid;
        document.getElementById("medicationname").value = data.medicationname;
        document.getElementById("dosage").value = data.dosage;
        document.getElementById("prescribedate").value = data.prescribedate;
        document.getElementById("btnSubmit").disabled = true;
        document.getElementById("btnupdate").disabled = false;
    })

}

function updateMed() {
    var med = {
        id: document.getElementById("id").value,
        MedicationsID: document.getElementById("MedicationsID").value,
        patient: document.getElementById("patient").value,
        doctorid: document.getElementById("doctorid").value,
        medicationname: document.getElementById("medicationname").value,
        dosage: document.getElementById("dosage").value,
        prescribedate: document.getElementById("prescribedate").value
    }
    fetch(url + "/" + med.id , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(med)
    })
    console.log("Medication updated: " + med);
    alert("success");

    getAllMedication();
    document.getElementById("btnSubmit").disabled = false;
    document.getElementById("btnupdate").disabled = true;
}

function displayMedication(medication) {
    console.log(medication);
    var table = document.getElementById("medicationTable");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    medication.forEach((medication) => {
        var row = tbody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        cell1.innerHTML = medication.MedicationsID;
        cell2.innerHTML = medication.patient;
        cell3.innerHTML = medication.doctorid;
        cell4.innerHTML = medication.medicationname;
        cell5.innerHTML = medication.dosage;
        cell6.innerHTML = medication.prescribedate;

        
        cell7.innerHTML = `<button >Delete</button>`
        cell7.addEventListener("click", function () {
            deletemed(medication.id);
        })
        cell8.innerHTML = `<button>Edit</button>`
        cell8.addEventListener("click", function () {
            getmed(medication.id);
        })
    })
}

getAllMedication();
