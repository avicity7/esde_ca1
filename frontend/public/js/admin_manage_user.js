const $searchDesignFormContainer = $('#searchUserFormContainer');
if ($searchDesignFormContainer.length != 0) {
  console.log('Search user form detected in manage user interface. Binding event handling logic to form elements.');
  // If the jQuery object which represents the form element exists,
  // the following code will create a method to submit search parameters
  // to server-side api when the #submitButton element fires the click event.
  $('#submitButton').on('click', function(event) {
    event.preventDefault();
    const baseUrl = 'http://44.194.159.42:5000';
    const searchInput = $('#searchInput').val();
    const userId = localStorage.getItem('user_id');
    axios.get(baseUrl + '/api/user/process-search-user/1/' + searchInput, {
      headers: {
        // Modify this will affect the checkUserFn.js middleware file at the backend.
        'user': userId,
        'Authorization': 'Bearer '.concat(localStorage.getItem('token')),
      },
    })
        .then(function(response) {
          // Using the following to inspect the response.data data structure
          // before deciding the code which dynamically generates cards.
          // Each card describes a design record.
          // console.dir(response.data);
          const records = response.data.userdata;
          const totalNumOfRecords = response.data.total_number_of_records;
          // Find the main container which displays page number buttons
          const $pageButtonContainer = $('#pagingButtonBlock');
          // Find the main container which has the id, dataBlock
          const $dataBlockContainer = $('#dataBlock');
          $dataBlockContainer.empty();
          $pageButtonContainer.empty();
          if (records.length == 0) {
            new Noty({
              type: 'information',
              layout: 'topCenter',
              timeout: '5000',
              theme: 'sunset',
              text: 'No submission records found.',
            }).show();
          }
          for (let index = 0; index < records.length; index++) {
            const record = records[index];
            console.log(record.cloudinary_url);
            let $container;
            if (index%2==0) {
              $container = $('<div></div>').addClass(' offset-sm-2 col-sm-4 mb-4');
            } else {
              $container = $('<div></div>').addClass(' col-sm-4 mb-4');
            }
            const $card = $('<div></div>').addClass('card').attr('style', 'width: 18rem;');
            const $cardBody = $('<div></div>').addClass('card-body');
            const $editUserButtonBlock = $('<div></div>').addClass('position-absolute bottom-0 end-0');
            $editUserButtonBlock.append($('<a>Manage</a>').addClass('btn btn-primary').attr('href', 'update_user.html?id=' + record.user_id));
            $cardBody.append($('<h5></h5>').addClass('card-title').append(record.fullname));
            $cardBody.append($('<p></p>').addClass('card-text').append(record.email));
            $cardBody.append($editUserButtonBlock);
            if (record.role_name == 'admin') {
              $cardBody.append($('<img></img>').attr({'src': '../images/admin.png', 'widthc': '50'}).addClass('text-right'));
            } else {
              $cardBody.append($('<img></img>').attr({'src': '../images/user.png', 'widthc': '50'}).addClass('text-right'));
            }
            $card.append($cardBody);
            $container.append($card);
            // After preparing all the necessary HTML elements to describe the user data,
            // I used the code below to insert the main parent element into the div element, dataBlock.
            $dataBlockContainer.append($container);
          } // End of for loop
          const totalPages = Math.ceil(totalNumOfRecords / 4);

          for (let count = 1; count <= totalPages; count++) {
            const $button = $(`<button class="btn btn-primary btn-sm mr-1" />`);
            $button.text(count);
            $button.click(clickHandlerForPageButton);

            $pageButtonContainer.append($button);
          } // End of for loop to add page buttons
        }).catch(function(response) {
          // Handle error
          console.dir(response);
          new Noty({
            type: 'error',
            layout: 'topCenter',
            timeout: '5000',
            theme: 'sunset',
            text: 'Unable to search',
          }).show();
        });
  });

  function clickHandlerForPageButton(event) {
    event.preventDefault();
    const baseUrl = 'http://44.194.159.42:5000';
    const userId = localStorage.getItem('user_id');
    const pageNumber = $(event.target).text().trim();
    const searchInput = $('#searchInput').val();
    console.log('Checking the button page number which raised the click event : ', pageNumber);
    axios.get(baseUrl + '/api/user/process-search-user/' + pageNumber + '/' + searchInput, {
      headers: {
        'user': userId,
        'Authorization': 'Bearer '.concat(localStorage.getItem('token')),
      },
      crossorigin: true,
    })
        .then(function(response) {
          // Using the following to inspect the response.data data structure
          // before deciding the code which dynamically generates cards.
          // Each card describes a design record.
          // console.dir(response.data);
          const records = response.data.userdata;
          const totalNumOfRecords = response.data.total_number_of_records;
          // Find the main container which displays page number buttons
          const $pageButtonContainer = $('#pagingButtonBlock');
          // Find the main container which has the id, dataBlock
          const $dataBlockContainer = $('#dataBlock');
          $dataBlockContainer.empty();
          $pageButtonContainer.empty();

          for (let index = 0; index < records.length; index++) {
            const record = records[index];
            console.log(record.cloudinary_url);
            if (index%2==0) {
              $container = $('<div></div>').addClass(' offset-sm-2 col-sm-4 mb-4');
            } else {
              $container = $('<div></div>').addClass(' col-sm-4 mb-4');
            }
            const $card = $('<div></div>').addClass('card').attr('style', 'width: 18rem;');
            const $cardBody = $('<div></div>').addClass('card-body');
            $editUserButtonBlock = $('<div></div>').addClass('position-absolute bottom-0 end-0');
            $editUserButtonBlock.append($('<a>Manage</a>').addClass('btn btn-primary').attr('href', 'update_user.html?id=' + record.user_id));
            $cardBody.append($('<h5></h5>').addClass('card-title').append(record.fullname));
            $cardBody.append($('<p></p>').addClass('card-text').append(record.email));
            $cardBody.append($editUserButtonBlock);
            if (record.role_name == 'admin') {
              $cardBody.append($('<img></img>').attr({'src': '../images/admin.png', 'widthc': '50'}).addClass('text-right'));
            } else {
              $cardBody.append($('<img></img>').attr({'src': '../images/user.png', 'widthc': '50'}).addClass('text-right'));
            }
            $card.append($cardBody);
            $container.append($card);
            // After preparing all the necessary HTML elements to describe the file data,
            // I used the code below to insert the main parent element into the div element, dataBlock.
            $dataBlockContainer.append($container);
          } // End of for loop
          const totalPages = Math.ceil(totalNumOfRecords / 4);
          console.log(totalPages);
          for (let count = 1; count <= totalPages; count++) {
            const $button = $(`<button class="btn btn-primary btn-sm mr-1" />`);
            $button.text(count);
            $button.click(clickHandlerForPageButton);
            $pageButtonContainer.append($button);
          }
        })
        .catch(function(response) {
          // Handle error
          console.dir(response);
          new Noty({
            type: 'error',
            layout: 'topCenter',
            theme: 'sunset',
            text: 'Unable to search',
          }).show();
        });
  } // End of clickHandlerForPageButton
} // End of checking for $searchUserFormContainer jQuery object
