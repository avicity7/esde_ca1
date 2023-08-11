const $updateDesignFormContainer = $('#updateDesignFormContainer');
const htmlEncode = (str) => {
  return str.replace(/[^\w. ]/gi, (c) => {
    return '&#'+c.charCodeAt(0)+';';
  });
};
if ($updateDesignFormContainer.length != 0) {
  console.log('Update Design form is detected. Binding event handling logic to form elements.');
  // If the jQuery object which represents the form element exists,
  // the following code will create a method to submit design details
  // to server-side api when the #submitButton element fires the click event.
  $('#submitButton').on('click', function(event) {
    event.preventDefault();
    const baseUrl = 'http://localhost:5000';
    // Collect fileId value from the input element, fileIdInput (hidden input element)
    const fileId = $('#fileIdInput').val();
    // Obtain user id from local storage
    const userId = localStorage.getItem('user_id');
    // Collect design title and description input
    const designTitle = htmlEncode($('#designTitleInput').val());
    const designDescription = htmlEncode($('#designDescriptionInput').val());
    // Create a FormData object to build key-value pairs of information before
    // making a PUT HTTP request.
    const webFormData = new FormData();
    webFormData.append('designTitle', designTitle);
    webFormData.append('designDescription', designDescription);
    webFormData.append('fileId', fileId);
    axios({
      method: 'put',
      url: baseUrl + '/api/user/design/',
      data: webFormData,
      headers: {'Content-Type': 'multipart/form-data', 'user': userId},
    })
        .then(function(response) {
          new Noty({
            type: 'success',
            layout: 'topCenter',
            theme: 'sunset',
            timeout: '5000',
            text: 'Updated design information.',
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

  function getOneData() {
    // Get the fileId information from the web browser URL textbox
    const query = window.location.search.substring(1);
    const arrayData = query.split('=');
    const fileId = arrayData[1];
    console.dir('Obtained file id from URL : ', fileId);
    console.log('here');
    axios.get('https://a2ogdqgld9.execute-api.us-east-1.amazonaws.com/prod/getonedesignfile?fid='+ fileId)
        .then(function(response) {
          // Using the following to inspect the response.data data structure
          // before deciding the code which dynamically populate the elements with data.
          console.dir(response.data);
          const record = response.data.filedata;
          $('#designTitleInput').val(record.design_title).focus();

          $('#fileIdInput').val(record.file_id);
          $('#designDescriptionInput').val(record.design_description).focus();

          $('#designImage').attr('src', record.cloudinary_url).focus();
        })
        .catch(function(response) {
          // Handle error
          console.dir(response);
          new Noty({
            type: 'error',
            timeout: '6000',
            layout: 'topCenter',
            theme: 'sunset',
            text: 'Unable retrieve file data',
          }).show();
        });
  } // End of getOneData
  // Call getOneData function to do a GET HTTP request on an API to retrieve one user record
  getOneData(); // Call getOneData to begin populating the form input controls with the existing record information.
} // End of checking for $updateDesignFormContainer jQuery object
