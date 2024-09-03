// async function to save the diary entry
async function saveDiary(userId, date, bestPlayer, pitcher, location, result, title, content) {
    try {
      const response = await fetch('http://localhost:3000/diaries/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if using separate authentication system
          // Authorization: 'Bearer yourToken'
        },
        body: JSON.stringify({
          userId,
          date,
          bestPlayer,
          pitcher,
          location,
          result,
          title,
          content
        })
      });
  
      if (!response.ok) {
        throw new Error(`Save failed: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Handle different response formats or error messages based on your server's implementation
      if (data.message === 'Diary saved successfully') {
        return data; // Or handle success differently
      } else {
        throw new Error('Error saving diary: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save diary. Please try again.');
    }
  }
  
  // function to handle form submission
  async function submit(event) {
    event.preventDefault();
  
    const userId = 'jieun0996'; // Replace with actual user ID or authentication logic
    const date = document.getElementById('date').value;
    const bestPlayer = document.getElementById('best-player-text').value;
    const pitcher = document.getElementById('pitcher').value;
    const location = document.getElementById('stadium').value;
    const result = document.getElementById('win-lose').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    // Add more data validation checks if needed
    if (!date || !bestPlayer || !pitcher || !location || !result || !title || !content) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const resultData = await saveDiary(userId, date, bestPlayer, pitcher, location, result, title, content);
  
    // Handle success or failure based on the response
    if (resultData && resultData.message === 'Diary saved successfully') {
      alert('Diary saved successfully!');
      // Redirect to a success page or perform other actions
    } else {
      alert('Failed to save diary. Please try again.');
    }
  }
  
  // Attach event listener to the submit button
  document.getElementById('submitButton').addEventListener('click', submit);