const $loginFormContainer = $('#loginFormContainer');
if ($loginFormContainer.length != 0) {
  console.log('Login form detected. Binding event handling logic to form elements.');
  // If the jQuery object which represents the form element exists,
  // the following code will create a method to submit registration details
  // to server-side api when the #submitButton element fires the click event.
  $('#submitButton').on('click', function(event) {
    event.preventDefault();
    const baseUrl = 'http://44.194.159.42:5000';
    const email = $('#emailInput').val();
    const password = $('#passwordInput').val();
    const webFormData = new FormData();
    webFormData.append('email', email);
    webFormData.append('password', password);
    axios.post(baseUrl + '/api/user/login', webFormData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
        .then(function(response) {
          // Inspect the object structure of the response object.
          // console.log('Inspecting the respsone object returned from the login web api');
          // console.dir(response);
          userData = response.data;
          if (userData.role_name == 'user') {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user_id', userData.user_id);
            localStorage.setItem('role_name', userData.role_name);
            window.location.replace('user/manage_submission.html');
            return;
          }
          if (response.data.role_name == 'admin') {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user_id', userData.user_id);
            localStorage.setItem('role_name', userData.role_name);
            window.location.replace('admin/manage_users.html');
            return;
          }
          console.log(response);
        })
        .catch(function(response) {
          // Handle error
          console.dir(response);
          new Noty({
            type: 'error',
            layout: 'topCenter',
            theme: 'sunset',
            timeout: '6000',
            text: 'Unable to login. Check your email and password',
          }).show();
        });
  });
} // End of checking for $loginFormContainer jQuery object
