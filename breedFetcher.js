const request = require("request");

// The API endpoint URL
const apiUrl = "https://api.thecatapi.com/v1/breeds/search?q=";

// Check if a breed name is provided as a command-line argument


const fetchBreedDescription = function(breedName, callback) {
  request(apiUrl + breedName, (error, response, body) => {
    if (error) {
      callback("Error:", error);
    } else if (response.statusCode !== 200) {
      callback(`HTTP Error: ${response.statusCode}`);
    } else {
      try {
        // Parse the JSON response from the API
        const data = JSON.parse(body);

        if (data.length === 0) {
          callback(`Breed "${breedName}" not found.`);
        } else {
          // Access the first entry in the data array and print out the description
          callback(data[0].description);
        }
      } catch (parseError) {
        callback("Error parsing JSON:", parseError);
      }
    }
  });
};


module.exports = { fetchBreedDescription };
