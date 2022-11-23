window.addEventListener('load', ()=> {

    const resultContainer = document.querySelector('#result')
    const viewAcceptedBtn = document.querySelector('.view-accept')
    const viewRejectedBtn = document.querySelector('.view-reject')
    const viewPendingBtn = document.querySelector('.view-pending')
    const viewAllBtn = document.querySelector('.view-all')
    const sortAscend = document.querySelector('.ascend')
    const sortDescend = document.querySelector('.descend')
    const sortOption = document.querySelector('.sort .dropdown input')
    const searchBar = document.querySelector('#searchBar')
    const user = document.querySelector('#user')
    const logout = document.querySelector("#logout")

    let dropDowns

    console.log(`DROPDOWNS: ${dropDowns}`)
    
    //SORT FUNCTIONS
    sortShow = (text) => {
        document.querySelector(".sort .dropdown .textBox").value = text
    }

    statusShow = (text, id) => {
        alert(`SELECTED: ${text}, For ID: ${id}`)

        let element = document.querySelector(`#result .dropdown input[name="${id}"]`)

        element.value = text
        element.classList.remove("Accepted", "Rejected", "Pending")
        element.classList.add(text)
        console.log(text)

        //UPDATE STATUS IN DB
        fetch(`../php/applicationProcess.php?status=${element.value}&id=${id}`)
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(`ERROR: ${error}`)
            alert('Failed to Sort')
        })

    }

    //CHECK IF LOGGED IN
    fetch(`../php/applicationProcess.php?user=''`)
    .then(response => {
        if(response.ok){return response.text()}
        else{return Promise.reject('Something was wrong with fetch request!')}
    })
    .then(data => {
        if(data == "kill"){
            window.location.replace("../html/loggedOut.html");
        }
        else{
            user.innerHTML = data
        }
    })
    .catch(error => {
        console.log(`ERROR: ${error}`)
        window.location.replace("../html/ConnectionError.html");
        alert('Failed to load Applications')
    })

    //INITIAL DATABASE TABLE FETCH
    fetch('../php/applicationProcess.php', {
        method: 'POST',
    })
    .then(response => {
        if(response.ok){return response.text()}
        else{return Promise.reject('Something was wrong with fetch request!')}
    })
    .then(data => {
        resultContainer.innerHTML = data
        dropDowns = document.querySelectorAll('.dropdown')

        dropDowns.forEach(dropDown => {
            dropDown.addEventListener('click', ()=>{
                dropDown.classList.toggle('active');
            })
        });
    })
    .catch(error => {
        console.log(`ERROR HAS OCCURRED WITH LOADING APPLICATIONS`)
        console.log(`ERROR: ${error}`)
        alert('Failed to load Applications')
    })
    

    logout.addEventListener('click', ()=>{
        fetch('../php/applicationProcess.php?kill=')
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            console.log(data)
            window.location.replace("../html/loggedOut.html")

        })
        .catch(error => {
            console.log(`ERROR: ${error}`)
            alert('Failed')
            
        })
    })
    
    //SORT APPLICATIONS IN ASCENDING
    sortAscend.addEventListener('click', ()=>{
        alert(`Sorting ${sortOption.value} by Ascending`)

        fetch(`../php/applicationProcess.php?sort=${sortOption.value}&order=Ascending`)
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            resultContainer.innerHTML = data
        })
        .catch(error => {
            console.log(`ERROR HAS OCCURRED WITH SORTING APPLICATIONS`)
            console.log(`ERROR: ${error}`)
            alert('Failed to Sort Applications')
        })
    })
    
    sortDescend.addEventListener('click', ()=>{
        alert(`Sorting ${sortOption.value} by Ascending`)

        fetch(`../php/applicationProcess.php?sort=${sortOption.value}&order=Descending`)
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            resultContainer.innerHTML = data
        })
        .catch(error => {
            console.log(`ERROR HAS OCCURRED WITH SORTING APPLICATIONS`)
            console.log(`ERROR: ${error}`)
            alert('Failed to Sort Applications')
        })
    })



    //DISPLAYING DIFFERENT TABLE TYPES
    //DISPLAY THE TABLE OF ACCEPTED APPLICATIONS
    viewAcceptedBtn.addEventListener('click', ()=>{
        alert('Clicked View Accepted')
        fetch('../php/applicationProcess.php?view=accepted')
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            resultContainer.innerHTML = data
            dropDowns = document.querySelectorAll('.dropdown')

            dropDowns.forEach(dropDown => {
                dropDown.addEventListener('click', ()=>{
                    dropDown.classList.toggle('active');
                })
            });
        })
        .catch(error => {
            console.log(`ERROR HAS OCCURRED WITH LOADING APPLICATIONS`)
            console.log(`ERROR: ${error}`)
            alert('Failed to load Applications')
        })
    })

    //DISPLAY THE TABLE OF REJECTED APPLICATIONS
    viewRejectedBtn.addEventListener('click', ()=>{
        alert('Clicked View REJECTED')
        fetch('../php/applicationProcess.php?view=rejected')
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            resultContainer.innerHTML = data
            dropDowns = document.querySelectorAll('.dropdown')

            dropDowns.forEach(dropDown => {
                dropDown.addEventListener('click', ()=>{
                    dropDown.classList.toggle('active');
                })
            });
        })
        .catch(error => {
            console.log(`ERROR HAS OCCURRED WITH LOADING APPLICATIONS`)
            console.log(`ERROR: ${error}`)
            alert('Failed to load Applications')
        })
    })

    //DISPLAY THE TABLE OF PENDING APPLICATIONS
    viewPendingBtn.addEventListener('click', ()=>{
        alert('Clicked View PENDING')
        fetch('../php/applicationProcess.php?view=pending')
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            console.log(data)
            resultContainer.innerHTML = data
            dropDowns = document.querySelectorAll('.dropdown')

            dropDowns.forEach(dropDown => {
                dropDown.addEventListener('click', ()=>{
                    dropDown.classList.toggle('active');
                })
            });
        })
        .catch(error => {
            console.log(`ERROR HAS OCCURRED WITH LOADING APPLICATIONS`)
            console.log(`ERROR: ${error}`)
            alert('Failed to load Applications')
        })
    })

    //DISPLAY THE TABLE OF ALL APPLICATIONS
    viewAllBtn.addEventListener('click', ()=>{
        alert('Clicked View ALL')
        fetch('../php/applicationProcess.php?view=all')
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            resultContainer.innerHTML = data
            dropDowns = document.querySelectorAll('.dropdown')

            dropDowns.forEach(dropDown => {
                dropDown.addEventListener('click', ()=>{
                    dropDown.classList.toggle('active');
                })
            });
        })
        .catch(error => {
            console.log(`ERROR HAS OCCURRED WITH LOADING APPLICATIONS`)
            console.log(`ERROR: ${error}`)
            alert('Failed to load Applications')
        })
    })


    //SEARCH FOR SPECIFIC APPLICATION
    searchBar.addEventListener('keypress', (e)=>{
        if(e.key === "Enter"){
            alert("Pressed Enter Key to Search")
            searchData = searchBar.value

            fetch(`../php/applicationProcess.php?search=${searchData}`)
            .then(response => {
                if(response.ok){return response.text()}
                else{return Promise.reject('Something was wrong with fetch request!')}
            })
            .then(data => {
                resultContainer.innerHTML = data
            })
            .catch(error => {
                console.log(`ERROR HAS OCCURRED WITH LOADING APPLICATIONS`)
                console.log(`ERROR: ${error}`)
                alert('Failed to load Applications')
            })
        }
    })

    detailShow = (id) => {
        alert(`Show details for application ${id}`)

        fetch(`../php/applicationProcess.php?details=${id}`)
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            alert(data)
        })
        .catch(error => {
            console.log(`ERROR HAS OCCURRED WITH LOADING APPLICATIONS`)
            console.log(`ERROR: ${error}`)
            alert('Failed to load data')
        })

    }

})