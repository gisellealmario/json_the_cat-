const request = require("request");

// The API endpoint URL
const apiUrl = "https://api.thecatapi.com/v1/breeds/search?q=";

// Check if a breed name is provided as a command-line argument
const breedName = process.argv[2];

if (!breedName) {
  console.log("Please provide a breed name.");
  process.exit(1);
}

// Make an HTTP GET request to the API endpoint with the provided breed name
request(apiUrl + breedName, (error, response, body) => {
  if (error) {
    console.error("Error:", error);
  } else if (response.statusCode !== 200) {
    console.error(`HTTP Error: ${response.statusCode}`);
  } else {
    try {
      // Parse the JSON response from the API
      const data = JSON.parse(body);

      if (data.length === 0) {
        console.log(`Breed "${breedName}" not found.`);
      } else {
        // Access the first entry in the data array and print out the description
        console.log(data[0].description);
      }
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
    }
  }
});
