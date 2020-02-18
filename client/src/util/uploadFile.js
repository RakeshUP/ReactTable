const SERVER_URL = 'http://localhost:80';

const uploadFile = formData => fetch(`${SERVER_URL}`, {
  method: 'POST',
  body: formData
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .catch(error => {
    console.error('Error:', error);
  });

export default uploadFile;