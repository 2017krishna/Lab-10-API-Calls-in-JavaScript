document.getElementById('fetchButton').addEventListener('click', () => { // Fetch data from an API
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => { // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { // Parse the JSON data and display it
            document.getElementById('dataDisplay').innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.body}</p>
            `;
        })
        .catch(error => { // Handle errors (network issues, 404, etc.)
            document.getElementById('dataDisplay').innerHTML = `
                <p style="color: red;">Error: ${error.message}</p>
            `;
        });
});

document.getElementById('xhrButton').addEventListener('click', () => { // Fetch data using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onload = function () { // Check if the request was successful (status 200)
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('dataDisplay').innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.body}</p>
            `;
        } else { // Handle errors (non-200 status codes)
            document.getElementById('dataDisplay').innerHTML = `
                <p style="color: red;">Error: ${xhr.statusText}</p>
            `;
        }
    };

    xhr.onerror = function () { // Handle network errors
        document.getElementById('dataDisplay').innerHTML = `
            <p style="color: red;">Network Error</p>
        `;
    };

    xhr.send();
});

document.getElementById('postButton').addEventListener('click', () => { // Create a new post using fetch
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    if (!title || !body) { // Validate input fields
        document.getElementById('dataDisplay').innerHTML = `
            <p style="color: red;">Error: Title and body are required!</p>
        `;
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', { // Send a POST request to create a new post
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    })
        .then(response => { // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => { // Parse the JSON data and display it
            document.getElementById('dataDisplay').innerHTML = `
                <p style="color: green;">Post created successfully!</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        })
        .catch(error => { // Handle errors (network issues, 404, etc.)
            document.getElementById('dataDisplay').innerHTML = `
                <p style="color: red;">${handleFetchError(error)}</p>
            `;
        });
});

document.getElementById('putButton').addEventListener('click', () => { // Update an existing post using XMLHttpRequest
    const id = document.getElementById('putId').value;
    const title = document.getElementById('putTitle').value;
    const body = document.getElementById('putBody').value;

    if (!id || !title || !body) { // Validate input fields
        document.getElementById('dataDisplay').innerHTML = `
            <p style="color: red;">Error: ID, title, and body are required!</p>
        `;
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () { // Check if the request was successful (status 200)
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('dataDisplay').innerHTML = `
                <p style="color: green;">Post updated successfully!</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        } else { // Handle errors (non-200 status codes)
            document.getElementById('dataDisplay').innerHTML = `
                <p style="color: red;">Error: ${xhr.statusText}</p>
            `;
        }
    };

    xhr.onerror = function () { // Handle network errors
        document.getElementById('dataDisplay').innerHTML = `
            <p style="color: red;">Network Error</p>
        `;
    };

    xhr.send(JSON.stringify({ title, body }));
});

document.getElementById('deleteButton').addEventListener('click', () => { // Delete a post using fetch
    const id = document.getElementById('deleteId').value;

    if (!id) { // Validate input field
        document.getElementById('dataDisplay').innerHTML = `
            <p style="color: red;">Error: Post ID is required!</p>
        `;
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { // Send a DELETE request to delete a post
        method: 'DELETE'
    })
        .then(response => { // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            document.getElementById('dataDisplay').innerHTML = `
            <p style="color: green;">Post with ID ${id} deleted successfully!</p>`;
        })
        .catch(error => { // Handle errors (network issues, 404, etc.)
            document.getElementById('dataDisplay').innerHTML = `
                <p style="color: red;">Error: ${error.message}</p>
            `;
        });
});

function handleFetchError(error) { // Function to handle fetch errors and provide user-friendly messages
    if (error.message.includes('NetworkError')) { // Check for network errors
        return 'Network error: Please check your internet connection.';
    } else if (error.message.includes('404')) { // Check for 404 errors
        return 'Error 404: Resource not found.';
    } else if (error.message.includes('500')) { // Check for server errors
        return 'Error 500: Server error. Please try again later.';
    } else {
        return `Unexpected error: ${error.message}`;
    }
}