$(function() {
  $('#search').submit(event => {
    event.preventDefault();
    console.log('form being submitted');

    const query = $('#query').val();
    console.log(query);

    $('#results-table tbody').html('');
    $('#query').val('');

    search(query);
  });

  function displayResults(gifs) {
    console.log(gifs);
    gifs.forEach(gif => {
      $('#results-table tbody').append(
        `<tr>
          <td>${gif.title}</td>
          <td><img src="${gif.images.fixed_height.url}"></td>
          <td>${gif.rating}</td>
          <td><a href="${gif.url}"> link </a></td>
        </tr>`
      );
    });
  }

  async function search(searchTerm) {
    // ** making API using async/await **
    try {
      const url = 'https://api.giphy.com/v1/gifs/search';
      const apiKey = 'y2PJn7GqyQ8Y0xtWSRFNRyv8RBWv0GgL';

      const response = await axios.get(url, {
        params: {
          q: searchTerm,
          api_key: apiKey,
          limit: 50
        }
      });

      console.log(response);
      displayResults(response.data.data);
    } catch (error) {
      console.log(error);
      alert('an error occurred with your request');
    }
  }
});
