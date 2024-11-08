# Notes creating ToDo List

## Breakdown of the URL structure of the Filemaker API

- baseURL = "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList";

### Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList/sessions

- /sessions: By appending /sessions to the base URL, we’re specifically targeting the session creation endpoint of the FileMaker Data API. This endpoint generates a session token, which we need to authenticate further requests.

### https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList/layouts/ToDoList/records

1. **https://FMS-Live01.barlowresearch.com**: This is the base URL—the server’s address where FileMaker is hosted.
2. **fmi/data/vLatest:** This part specifies that we’re using the FileMaker Data API (hence, fmi/data) and specifies the version (vLatest).
3. **databases/ToDoList:** We’re connecting to a specific database named ToDoList.
4. **layouts/ToDoList/records:** This part tells the API to retrieve records from a layout named ToDoList.

## Adding NextResponse as a utility

- NextResponse.json() is our way of sending structured, JSON-formatted data back to the client, along with the appropriate status code if needed. This keeps responses consistent, whether they’re for successful requests or errors.
- The app router design doesn’t use req and res - "POST(req, res)" directly. Instead, you handle the request with req and create the response with NextResponse.
