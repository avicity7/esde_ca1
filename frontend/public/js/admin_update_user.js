const $updateUserFormContainer = $('#updateUserFormContainer');
if ($updateUserFormContainer.length != 0) {
  console.log('Update User form is detected. Binding event handling logic to form elements.');
  // If the jQuery object which represents the form element exists,
  // the following code will create a method to submit user role data
  // to server-side api when the #submitButton element fires the click event.
  $('#submitButton').on('click', function(event) {
    event.preventDefault();
    const baseUrl = 'http://localhost:5000';
    // Collect role id value from the input element, roleIdInput
    const roleId = $('#roleIdInput').val();
    // Obtain user id from local storage
    const userId = localStorage.getItem('user_id');
    // There is a hidden textbox input, userRecordIdInput
    const recordId = $('#userRecordIdInput').val();
    const webFormData = new FormData();
    webFormData.append('roleId', roleId);
    webFormData.append('recordId', recordId);
    // const token = localStorage.getItem('token');
    axios.put(baseUrl + '/api/user/', webFormData, {
      headers: {'Content-Type': 'multipart/form-data', 'user': userId},
      withCredentials: true,
    })
        .then(function(response) {
          new Noty({
            type: 'success',
            layout: 'topCenter',
            theme: 'sunset',
            timeout: '5000',
            text: 'User role has changed.',
          }).show();
        })
        .catch(function(response) {
          // Handle error
          console.dir(response);
          new Noty({
            type: 'error',
            layout: 'topCenter',
            theme: 'sunset',
            timeout: '6000',
            text: 'Unable to update.',
          }).show();
        });
  });
  $('#backButton').on('click', function(e) {
    e.preventDefault();
    window.history.back();
  });

  function getOneUser() {
    const baseUrl = 'http://localhost:5000';
    const query = window.location.search.substring(1);
    const arrayData = query.split('=');
    const recordIdToSearchUserRecord = arrayData[1];
    const userId = localStorage.getItem('user_id');
    axios.get(baseUrl + '/api/user/' + recordIdToSearchUserRecord, {
      headers: {
        'user': userId,
      },
      withCredentials: true,
    })
        .then(function(response) {
          // Using the following to inspect the response.data data structure
          // before deciding the code which dynamically populate the elements with data.
          console.dir(response.data);
          const record = response.data.userdata;
          $('#fullNameOutput').append(record.fullname); // text(record.fullname);
          $('#emailOutput').append(record.email); // text(record.email);
          $('#userRecordIdInput').val(record.user_id);
          $('#roleIdInput').val(record.role_id);
        })
        .catch(function(response) {
          // Handle error
          console.dir(response);
          new Noty({
            type: 'error',
            timeout: '6000',
            layout: 'topCenter',
            theme: 'sunset',
            text: 'Unable retrieve user data',
          }).show();
        });
  } // End of getOneUser
  // Call getOneUser function to do a GET HTTP request on an API to retrieve one user record
  getOneUser();
} // End of checking for $updateUserFormContainer jQuery object
