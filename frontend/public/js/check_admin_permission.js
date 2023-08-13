axios.get('http://44.194.159.42:5000/api/user/checkForPageAccess')
    .then((response) => {
      if (response !== undefined) {
        window.location.replace(window.location.origin + '/');
      }
    });

