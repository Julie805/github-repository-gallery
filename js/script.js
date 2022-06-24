//div containing profile info
const overview = document.querySelector(".overview");

const username = "Julie805";
//Fetch info from Github profile
const gitHub = async function() {
    const resolve = await fetch(`https://api.github.com/users/${username}`);
    const data = await resolve.json();
    console.log(data);
    displayUser(data);
};

gitHub();

//display the fetched user info on the page

const displayUser = function(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = 
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(userInfo);
};