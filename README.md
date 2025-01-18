# API Hub

API Hub is an open-source project offering a centralized platform for free-to-use APIs. It provides developers with an efficient way to interact with APIs and databases, supporting all the essential HTTP request methods (GET, POST, PUT, DELETE, etc.) to seamlessly read, write, and manage data.

## APIs:

- **Authentication API**
  - `/add-client`: POST request to add a new client, payload will be name & email.
  - `/generate-token`: POST request to generate a token, payload will be email.
  - `/get-metadata`: GET request to retrieve metadata about the user, payload will be token.
- **Todo API**
  - `/create`: Creates a new todo.
  - `/get-all`: Retrieves all todos.

**Database**: MongoDB

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/onedotproducts/api-hub.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:

```bash
JWT_SECRET=your-secret-key
DATABASE_URL=mongodb+srv://your-mongodb-url
```

4. Run the application:

```bash
npm run dev
```

5. Make a POST request to `http://localhost:3000/api/v1/auth/generate-token` with the user's email as the payload to generate a token.

6. Use the generated token in the `Authorization` header of your API requests.

7. You can now use the API endpoints to interact with the APIs and databases.

---

## Usage

### Authentication API

The Authentication API provides endpoints for generating tokens and retrieving metadata about the user.

#### Generating Token

To generate a token, you need to send a POST request to the `/generate-token` endpoint with the user's email as the payload. The API will then generate a unique token and return it in the response.

Example using **fetch**:

```javascript
fetch("http://localhost:3000/api/v1/auth/generate-token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Token generated:", data))
  .catch((error) => console.error("Error generating token:", error));
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODI5NDk5OTksImlhdCI6MTY4Mjk0OTk5OSwiaXNzIjoibWFpbmVyIiwic3ViIjoiYWRtaW4iLCJyb2xlcyI6WyJhcGlfcmVhZCJdfQ.4-8-4-8-4-8-4-8-4-8-4"
}
```

#### Getting Metadata

To retrieve metadata about the user, you need to send a POST request to the `/get-metadata` endpoint with the token as the payload. The API will then return the user's information, including their name, email, and any todos they have created.

Example using **fetch**:

```javascript
fetch("http://localhost:3000/api/v1/auth/get-metadata", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_GENERATED_TOKEN", // Replace with your token
  },
})
  .then((response) => response.json())
  .then((data) => console.log("User metadata:", data))
  .catch((error) => console.error("Error fetching metadata:", error));
```

Response:

```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "todos": [
      {
        "id": "61e8c9e0c4b0b3c6c0e9",
        "title": "Task 1",
        "description": "This is a task description.",
        "completed": false,
        "userId": "61e8c9e0c4b0b3c6c0e9",
        "createdAt": "2023-03-01T12:00:00.000Z"
      },
      {
        "id": "61e8c9e0c4b0b3c6c0ea",
        "title": "Task 2",
        "description": "This is another task description.",
        "completed": false,
        "userId": "61e8c9e0c4b0b3c6c0e9",
        "createdAt": "2023-03-01T12:00:00.000Z"
      }
    ]
  }
}
```

---

### Todo API

The Todo API provides endpoints for creating and retrieving todos.

#### Creating Todo

To create a todo, you need to send a POST request to the `/create` endpoint with the following payload:

```json
{
  "title": "Task 1",
  "description": "This is a task description.",
  "completed": false
}
```

The API will then create a new todo and return it in the response.

Example using **fetch**:

```javascript
fetch("http://localhost:3000/api/v1/todo/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_GENERATED_TOKEN", // Replace with your token
  },
  body: JSON.stringify({
    title: "Task 1",
    description: "This is a task description.",
    completed: false,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Todo created:", data))
  .catch((error) => console.error("Error creating todo:", error));
```

Response:

```json
{
  "id": "61e8c9e0c4b0b3c6c0eb",
  "title": "Task 1",
  "description": "This is a task description.",
  "completed": false,
  "userId": "61e8c9e0c4b0b3c6c0e9",
  "createdAt": "2023-03-01T12:00:00.000Z"
}
```

#### Getting All Todos

To retrieve all todos, you need to send a GET request to the `/get-all` endpoint with the token as the payload. The API will then return all the user's todos.

Example using **fetch**:

```javascript
fetch("http://localhost:3000/api/v1/todo/get-all", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_GENERATED_TOKEN", // Replace with your token
  },
})
  .then((response) => response.json())
  .then((data) => console.log("All todos:", data))
  .catch((error) => console.error("Error fetching todos:", error));
```

Response:

```json
[
  {
    "id": "61e8c9e0c4b0b3c6c0eb",
    "title": "Task 1",
    "description": "This is a task description.",
    "completed": false,
    "userId": "61e8c9e0c4b0b3c6c0e9",
    "createdAt": "2023-03-01T12:00:00.000Z"
  },
  {
    "id": "61e8c9e0c4b0b3c6c0ec",
    "title": "Task 2",
    "description": "This is another task description.",
    "completed": false,
    "userId": "61e8c9e0c4b0b3c6c0e9",
    "createdAt": "2023-03-01T12:00:00.000Z"
  }
]
```

---

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
