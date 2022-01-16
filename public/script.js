function get() {
    
    // XMLHttpRequest - 
    let req = new XMLHttpRequest();

    // XMLHttpRequest.open(method: string, url: string)
    req.open('GET', 'http://localhost:3000/hobbies');

    req.onreadystatechange = () => {
        // readyState of 4 - DONE (operation is complete).
        if(req.readyState === 4){
            // req.response - is the data that returns from the address
            // JSON.parse() - convert to array. 
            let arr = JSON.parse(req.response);

            let result = '';
            result += `<th>Name</th><th>Group</th><th>Limit age</th><th>Place</th>
            <th>Edit</th><th>Delete</th>`

            for (const hobby of arr) {
                // tr -> table row, td -> table data(cell)
                result += `
                <tr>
                <td>${hobby.name}</td>
                <td>${hobby.ifGroup}</td>
                <td>${hobby.limitAge}</td>
                <td>${hobby.address}</td>
                <td><button onclick="put('${hobby.name}')" class="btn btn-dark">Edit age</button></td>
                <td><button onclick="deleteHobby('${hobby.name}')" class="btn btn-danger">Delete</button></td>
                </tr>
                `
            }
            document.getElementById('hobbies').innerHTML = result;
        } 
    }
    req.send();
}

function post(){

    // get all the values from the user
    let hname = document.getElementById('hname').value;
    let hage = document.getElementById('hage').value;
    let hifInGruop = document.getElementById('hifInGruop').value;
    let haddress = document.getElementById('haddress').value;

    console.log(hage);
    
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/hobbies/add');

    req.onreadystatechange = () =>{
        // when we finish adding new hobby - call the hobby's list again
        if(req.readyState === 4) get();
    }

    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"name":hname, "limitAge":hage, "ifGroup":hifInGruop, 
    "address":haddress }));
}

function put(HobbyName){
    let input = prompt('Enter a new limit age'); // input from user:

    let req = new XMLHttpRequest();  // מאפשר לגשת לכתובת באינטרנט ולקבל את הנתונים שבתוכה
    req.open('PUT', `http://localhost:3000/hobbies/update/${HobbyName}`);
    

    // after update - refresh the table:
    req.onreadystatechange = () => {
        if(req.readyState === 4) get();
    }
    
    // define header of request
    req.setRequestHeader('Content-type', 'application/json');
    // send the values from user with request:
    // in req.send() - we can add the body
    req.send(JSON.stringify({"newlimitAge":input}));
}



function deleteHobby(hobbyname){
    //let param = Number(param);
    let req = new XMLHttpRequest();
    req.open('DELETE', `http://localhost:3000/hobbies/delete/${hobbyname}`);
    // show the updated table after request is sent. 
    req.onreadystatechange = () =>{
        if(req.readyState === 4) get();
    }
    req.send();
}