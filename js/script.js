//div containing profile info
const overview = document.querySelector(".overview");
//unordered list to display the repos
const repoList = document.querySelector(".repo-list");

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
   displayRepos();
};

//fetch repos

const displayRepos = async function(){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const dataRepos = await fetchRepos.json();
    console.log(dataRepos); 
    displayRepoInfo(dataRepos);
};
//displayRepos();

//display info about repos

const displayRepoInfo = function (repos) {
    for  (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add(".repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
    }
};