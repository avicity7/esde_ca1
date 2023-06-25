axios.get('http://localhost:5000/api/user/checkForPageAccess', {
  withCredentials: true,
})
    .then((response) => {
      if (response !== undefined) {
        window.location.replace(window.location.origin + '/');
      }
    });

