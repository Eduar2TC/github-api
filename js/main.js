
let button = document.getElementById('getData').addEventListener('click', getProfile, false);

function getProfile(e){
    e.preventDefault();
    console.log('hello');
    let userName = document.getElementById('id-profile').value;
    let xhttp = new XMLHttpRequest();

    if( !userName || userName == '' ){
        userName = 'Eduar2tc';
    }
    xhttp.onreadystatechange = function(){
        
        if(  xhttp.readyState == 4 && xhttp.status == 200 ){

            let userData = JSON.parse( xhttp.responseText );
            userData.bio = userData.bio != null ? userData.bio : userData.bio = 'Without biography'  ;
            document.getElementById('user-result').innerHTML = 
            `
            <div class="card mb-3">
                <div class="row g-0 g-md-1">
                    <div class="col-md-4">
                    <img src="${userData.avatar_url}" class="rounded-start" alt="profile">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"> ${userData.name} </h5>
                        <p class="card-text">${userData.bio} </p>
                        <p class="card-text mb-0"><small class="text-muted">Creation ${userData.created_at}</small></p>
                        <p class="card-text mb-o"><small class="text-muted">Last updated ${userData.updated_at}</small></p>
                    </div>
                      <div class="card-footer text-muted">
                        <p>Public repos <span class="badge text-bg-primary">${userData.public_repos} </span>
                            <span class="badge text-bg-secondary"></span>
                            Followers <span class="badge text-bg-success">${userData.followers}</span>
                            Location <span class="badge text-bg-success">${userData.location}</span>
                        </p>
                      </div>
                    </div>
                </div>
             </div>
            `;
            
        }
        else if(xhttp.status == 404){
            document.getElementById('user-result').innerHTML = 'No found';
        }
    }
    xhttp.open('GET', 'https://api.github.com/users/' +userName, true);
    xhttp.send();

}