$('#logoutButton').on('click', function(event) {
  event.preventDefault();
  localStorage.clear();
  axios.get('http://54.147.112.114:5000/api/user/logout', {
    withCredentials: true,
  })
      .then((response) => {
        window.location.replace('/home.html');
      });
});
