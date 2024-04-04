document.addEventListener("DOMContentLoaded", function() {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    githubForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm === '') {
            return;
        }
        searchUsers(searchTerm);
    });

    function searchUsers(searchTerm) {
        const url = `https://api.github.com/search/users?q=${searchTerm}`;
        fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => {
            console.error('Error searching users:', error);
        });
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" alt="Avatar">
                <a href="${user.html_url}" target="_blank">Profile</a>
            `;
            userItem.addEventListener('click', function() {
                getRepos(user.login);
            });
            userList.appendChild(userItem);
        });
    }

    function getRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;
        fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayRepos(data);
        })
        .catch(error => {
            console.error('Error fetching repos:', error);
        });
    }

    function displayRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
                <h4>${repo.name}</h4>
                <p>${repo.description}</p>
                <a href="${repo.html_url}" target="_blank">Link</a>
            `;
            reposList.appendChild(repoItem);
        });
    }
});
