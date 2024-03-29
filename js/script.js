//div containing profile info
const overview = document.querySelector(".overview");
//unordered list to display the repos
const repoList = document.querySelector(".repo-list");
//class where all repo info appears
const repos = document.querySelector(".repos");
//class where the individual data will appear
const repoData = document.querySelector(".repo-data");
//back to Repo Gallery button
const backToGalleryButton = document.querySelector(".view-repos");
//input with the “Search by name” placeholder
const filterInput = document.querySelector(".filter-repos");

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
const displayUser = function (data) {
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
    displayRepos(username);
};

//fetch repos
const displayRepos = async function(username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const dataRepos = await fetchRepos.json();
    //console.log(dataRepos); 
    displayRepoInfo(dataRepos);
};
//displayRepos();

//display info about repos
const displayRepoInfo = function(repos) {
    filterInput.classList.remove("hide");
    for  (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    //console.log(repoInfo);
    
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displaySpecificRepoInfo(repoInfo,languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    backToGalleryButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    const selectedRepoInfo = document.createElement("div");
    selectedRepoInfo.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(selectedRepoInfo);
};

//Click Event to the Back Button
backToGalleryButton.addEventListener("click", function() {
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    backToGalleryButton.classList.add("hide");
});

//Input Event to the Search Box
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const reposAll = document.querySelectorAll(".repo");
    const lowerCase = searchText.toLowerCase();

    for (const repo of reposAll) {
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (lowerCaseRepo.includes(lowerCase)) {
            repo.classList.remove("hide");    
        } else {
            repo.classList.add("hide");  
        }
    }
});

