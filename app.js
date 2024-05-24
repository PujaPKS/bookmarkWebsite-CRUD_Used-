//endpoint
const url = "https://crudcrud.com/api/c9a464875c1445998dc45b82c1cf8495";

console.log(axios);


function handleFormSubmition(event){
    event.preventDefault();


//Part-A--->storing all values in database of endpoint
    //pushing references of id in a variable
    const name = document.getElementById('title');
    const link = document.getElementById('url');
    
    //storing values of these in object
    const webDetails = {
        name : name.value,
        url : link.value
    };

    //moving all the values from object to crud-crud endpoint
    
    //posting all items in database using "POST Request"
    axios.post(`${url}/bookmarks` , webDetails)
    .then((res) => { 
        console.log(res.data);
        window.location.reload(); //page reloader

        //after successful post of data in database now we need to fetch the data from database
        fetchData();
    })
    .catch((err) => { 
        console.log(err);
    });
}


function fetchData(){
    
    //"GET Request" used to fetch data from endpoint database
    axios.get(`${url}/bookmarks`)
    .then((res) => {
        const info = res.data;
        console.log(info);

        //displaying fetched data from database in table a function called where data is passed
        displayInTable(info);
    })
    .catch((err) => {
        console.log(err);
    })
}

//function made for displaying data fetched inside table
function displayInTable(info){
    const tableBody = document.getElementById("BookmarksList");


    info.forEach((webDetails, index) => {
        
        const row = document.createElement('tr');
            
            //cells for eachDB created
            const serialNumberCell = document.createElement('td');
            const titleCell = document.createElement('td');
            const urlCell = document.createElement('td');
            const actionCell = document.createElement('td');

            //Part-B(1)--->Added content to table data cells whch will be pushed on adding item
            serialNumberCell.textContent = index+1;
            titleCell.textContent = webDetails.name;
            

            // Creating an anchor element for the URL url should be with http//:
            const link = document.createElement('a');
            link.href = webDetails.url;
            link.textContent = webDetails.url;
            link.target = '_blank'; // Opens the link in a new tab
            urlCell.appendChild(link);


            //Delete button creation and function calling
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = () => {
                deleteBooking(webDetails._id);
            };

            //Edit button creation and function calling
            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.classList.add('btn' , 'btn-primary');
            editButton.onclick = () => {
                editBooking(webDetails , row);
            };

            // Appending buttons to action cell
            actionCell.appendChild(deleteButton);
            actionCell.appendChild(document.createTextNode('\u00A0')); // Add space
            actionCell.appendChild(editButton);

            // Appending all cells to row
            row.appendChild(serialNumberCell);
            row.appendChild(titleCell);
            row.appendChild(urlCell);
            row.appendChild(actionCell);

            // Appended row to table body finally
            tableBody.appendChild(row);
        });   
}

//Function for deleting booking
function deleteBooking(id){
    axios.delete(`${url}/bookmarks/${id}`)
        .then((result) => {
            console.log(result);
            window.location.reload(); //page reloader
        })
        .catch((err) => {
            console.log(err);
        })
}

//Function for editing booking details
function editBooking(webDetails , row){
    
    const name = document.getElementById('title');
    const url = document.getElementById('url');

    //pushing all the data from webDetails object in database inside the boxes of form
    name.value = webDetails.name;
    url.value = webDetails.url;

    //remove row from list
    row.remove();

    //want to update data inside the busDetails
    //object made which has updated data values
    const updatedData = {
        name : name.value,
        url : url.value,
    }
    // console.log(updatedData);
   

    // using "DELETE Request" to removed the old user ID after filling all blanks
    axios.delete(`${url}/bookmarks/${webDetails._id}`)
        .then(() => {
            // row removed from list
            row.remove();

            // updating all items in database using "PUT Request"
            axios.put(`${url}/bookmarks/${webDetails._id}`, updatedData)
                .then((res) => {
                    console.log(res.data);
                    window.location.reload();//page reloader
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}


// Fetching data when the page loads
window.onload = function () {
    fetchData();
};