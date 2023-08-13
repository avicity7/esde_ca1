axios({
  method: 'get',
  url: 'http://44.194.159.42:5000/api/user/checkForPageAccess',
  headers: {'Authorization': 'Bearer '.concat(localStorage.getItem('token'))},
})
    .then((response) => {
      if (response !== undefined) {
        window.location.replace(window.location.origin + '/');
      }
    });

