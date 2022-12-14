window.addEventListener('load', () => {

    const logout = document.querySelector("#logout")
    const user = document.querySelector("#user")

    const viewResidentsBtn = document.querySelector(".view-residents")
    const viewBlockLynxBtn = document.querySelector(".view-blockL")
    const viewBlockGenusBtn = document.querySelector(".view-blockG")
    const viewBlockPardusBtn = document.querySelector(".view-blockP")
    
    const filterFName = document.querySelector(".filter-fName")
    const filterMName = document.querySelector(".filter-mName")
    const filterlName = document.querySelector(".filter-lName")
    const filterPosition = document.querySelector(".filter-position")
    const filterNationality = document.querySelector(".filter-nationality")
    const filterRoom = document.querySelector(".filter-room")

    const downloadBtn = document.querySelector("#download button")

    const results = document.querySelector('#results')
    const resultContainer = document.querySelector("#results .container")

    const modal = document.querySelector('dialog')
    const closeModalBtn = document.querySelector('dialog .close')
    const confirmModalBtn = document.querySelector('dialog .confirm')
    const modalTypeText = document.querySelector('.reportType')
    const modalColumnsText = document.querySelector('.reportColumns')

    let viewType

    let spinner = '<div class="loader"></div>'

    //CHECK IF LOGGED IN
    fetch(`../php/checkLogin.php`)
    .then(response => {
        if(response.ok){return response.text()}
        else{return Promise.reject('Something was wrong with fetch request!')}
    })
    .then(data => {
        //IF session isn't set, redirect to other page
        if(data == "KILL"){

            window.location.replace("../html/loggedOut.html");
        }
        //If session is set then Add user data to page
        else{
            user.innerHTML = data
        }
    })
    .catch(error => {
        window.location.replace("../html/ConnectionError.html");
        alert('LOAD FAILED')
    })
    
    //Verifying Authentification
    fetch(`../php/reportGeneration.php?position=check`)
    .then(response => {
        if(response.ok){return response.text()}
        else{return Promise.reject('Something was wrong with fetch request!')}
    })
    .then(data => {
        //IF Not authorized user
        console.log(data)
        if(data == "Resident Advisor"){
            console.log(`User Type is: ${data}. Access Authorized`)
        }
        else{
            window.location.replace("../html/notAuthorized.html");
        }

    })
    .catch(error => {
        window.location.replace("../html/ConnectionError.html");
        alert('LOAD FAILED')
    })

    //Log out button
    logout.addEventListener('click', ()=>{
        fetch('../php/logout.php')
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            window.location.replace("../html/loggedOut.html")
        })
        .catch(error => {
            console.log(`ERROR: ${error}`)
            alert('FETCH FAILED')
            
        })
    })

    //Change filter Button Colors when clicked
    let allFilterButtons = document.querySelectorAll(".filters button")
    
    allFilterButtons.forEach(btn => {
        btn.addEventListener('click', ()=>{
            btn.classList.toggle("on")
            btn.classList.toggle("off")
        })
    });

    //Download PDF FILE
    downloadBtn.addEventListener('click', () => {
        html2pdf()
        .from(results)
        .save()
    })

    //Generate Fetch Url Filter Parameters
    function getFilterParamters(){
        //The paramaters will be sent to php to query the Database with
        let fNameS
        let mNameS
        let lNameS
        let positionS
        let nationalityS
        let roomS

        if(filterFName.classList.contains("on")){fNameS = 'First Name'}
        else{fNameS=''}

        if(filterMName.classList.contains("on")){mNameS = 'Middle Initial'}
        else{mNameS=''}

        if(filterlName.classList.contains("on")){lNameS = 'Last Name'}
        else{lNameS=''}

        if(filterPosition.classList.contains("on")){positionS = 'Position'}
        else{positionS=''}

        if(filterNationality.classList.contains("on")){nationalityS = 'Nationality'}
        else{nationalityS=''}

        if(filterRoom.classList.contains("on")){roomS = 'Room Number'}
        else{roomS=''}

        let parameters = `fname=${fNameS}&mname=${mNameS}&lname=${lNameS}&position=${positionS}&nationality=${nationalityS}&room=${roomS}`
        
        return parameters
    }

    function getSelectedColumns(){
        let columns = "Resident ID"

        if(filterFName.classList.contains("on")){columns += ', First Name'}

        if(filterMName.classList.contains("on")){columns += ', Middle Initial'}

        if(filterlName.classList.contains("on")){columns += ', Last Name'}

        if(filterPosition.classList.contains("on")){columns += ', Position'}

        if(filterNationality.classList.contains("on")){columns += ', Nationality'}

        if(filterRoom.classList.contains("on")){columns += ', Room Number'}
        
        return columns
    }

    function fetchTable(){
        resultContainer.innerHTML = `<div>${spinner}</div>`
        
        fetch(`../php/reportGeneration.php?view=${viewType}&${getFilterParamters()}`)
        .then(response => {
            if(response.ok){return response.text()}
            else{return Promise.reject('Something was wrong with fetch request!')}
        })
        .then(data => {
            resultContainer.innerHTML = `<h1>Report of ${viewType}</h1>`
            resultContainer.innerHTML += data
            console.log(data)
        })
        .catch(error => {
            console.log(`ERROR: ${error}`)
        })
    }

    //CLOSE MODAL
    closeModalBtn.addEventListener('click', () => {
        modal.close()
    })

    //Confirm generating the report
    confirmModalBtn.addEventListener('click', () => {
        fetchTable()
        modal.close()
        
    })


    //VIEW RESIDENTS REPORT
    viewResidentsBtn.addEventListener('click', ()=>{
        viewType = 'Resident'
        modalTypeText.innerHTML = "<h4>REPORT TYPE:</h4> ALL RESIDENTS"
        modalColumnsText.innerHTML = "<h4>COLUMNS:</h4> " + getSelectedColumns()
        modal.showModal()

    })

    //VIEW BLOCK G REPORTW
    viewBlockGenusBtn.addEventListener('click', ()=>{
        viewType = 'Genus'
        modalTypeText.innerHTML = "<h4>REPORT TYPE:</h4> GENUS BLOCK"
        modalColumnsText.innerHTML = "<h4>COLUMNS:</h4> " + getSelectedColumns()
        modal.showModal()
    })

    //VIEW BLOCK L REPORT
    viewBlockLynxBtn.addEventListener('click', ()=>{
        viewType = 'Lynx'
        modalTypeText.innerHTML = "<h4>REPORT TYPE:</h4> LYNX BLOCK"
        modalColumnsText.innerHTML = "<h4>COLUMNS:</h4> " + getSelectedColumns()
        modal.showModal()
    })

    //VIEW BLOCK P REPORT
    viewBlockPardusBtn.addEventListener('click', ()=>{
        viewType = 'Pardus'
        modalTypeText.innerHTML = "<h4>REPORT TYPE:</h4> PARDUS BLOCK"
        modalColumnsText.innerHTML = "<h4>COLUMNS:</h4> " + getSelectedColumns()
        modal.showModal()
    })

    
})