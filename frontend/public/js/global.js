$('#logoutButton').on('click', function(event) {
  event.preventDefault();
  localStorage.clear();
  axios.get('http://localhost:5000/api/user/logout', {
    withCredentials: true,
  })
      .then((response) => {
        window.location.replace('/home.html');
      });
});
