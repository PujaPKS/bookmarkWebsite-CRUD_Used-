//endpoint
const url = "https://crudcrud.com/api/ab997ed413ea4b229e2825af98c84526";

console.log(axios);


async function handleFormSubmition(event){
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
    const res = await axios.post(`${url}/bookmarks` , webDetails)
    try{ 
        console.log(res.data);
        window.location.reload(); //page reloader

        //after successful post of data in database now we need to fetch the data from database
        fetchData();
    }
    catch(err) { 
        console.log(err);
    };
}


async function fetchData(){
    
    //"GET Request" used to fetch data from endpoint database
    const res = await axios.get(`${url}/bookmarks`)
    try {
        const info = res.data;
        console.log(info);

        //displaying fetched data from database in table a function called where data is passed
        displayInTable(info);
    }
    catch(err) {
        console.log(err);
    };
}

//function made for displaying data fetched inside table
function displayInTable(info){
    const tableBody = document.getElementById("BookmarksList");

    let index = 0;
    info.forEach((webDetails) => {
        
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
            deleteButton.onclick = async() => {
                await deleteBooking(webDetails._id);
            };

            //Edit button creation and function calling
            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.classList.add('btn' , 'btn-primary');
            editButton.onclick = async() => {
                await editBooking(webDetails , row);
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
            index++;
        });   
}

//Function for deleting booking
async function deleteBooking(id){
    const result = await axios.delete(`${url}/bookmarks/${id}`);
        try {
            console.log(result);
            window.location.reload(); //page reloader
        }
        catch(err) {
            console.log(err);
        };
}

//Function for editing booking details
async function editBooking(webDetails , row){
    
    const name = document.getElementById('title');
    const urlInput = document.getElementById('url');

    //pushing all the data from webDetails object in database inside the boxes of form
    name.value = webDetails.name;
    urlInput.value = webDetails.url;

    //remove row from list
    row.remove();

    //want to update data inside the busDetails
    //object made which has updated data values
    const updatedData = {
        name : name.value,
        url : urlInput.value,
    }
    // console.log(updatedData);
   

    // using "DELETE Request" to removed the old user ID after filling all blanks
    await axios.delete(`${url}/bookmarks/${webDetails._id}`)
        try {
            // console.log(`${url}/bookmarks/${webDetails._id}`);
            // row removed from list
            row.remove();

            // updating all items in database using "PUT Request"
            await axios.put(`${url}/bookmarks/${webDetails._id}`, updatedData)
                console.log(res.data);
                window.location.reload();//page reloader
        }
        catch(err) {
            console.log(err);
        }
}


// Fetching data when the page loads
window.onload = function () {
    fetchData();
};