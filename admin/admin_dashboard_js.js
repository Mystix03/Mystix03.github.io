


const username = localStorage.getItem('username');
if (username) {
  document.getElementById('usernamePlaceholder').textContent = username;
}
