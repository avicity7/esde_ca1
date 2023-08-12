$('#logoutButton').on('click', function(event) {
  event.preventDefault();
  localStorage.clear();
  axios.get('http://44.194.159.42:5000/api/user/logout', {
    withCredentials: true,
  })
      .then((response) => {
        window.location.replace('/home.html');
      });
});
