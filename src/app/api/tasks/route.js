import axios from "axios";
import { NextResponse } from "next/server";

const baseURL =
  "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList";

//*****Obtain a Session Token************
async function authenticateWithFileMaker() {
  try {
    const authResponse = await axios.post(
      `${baseURL}/sessions`,
      {},
      {
        auth: {
          username: "DataAPI",
          password: "*Spam162315",
        },
      }
    );
    return authResponse.data.response.token;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw new Error("Authentication failed");
  }
}

// Updated GET function to use the helper function
export async function GET() {
  try {
    // Use the helper function to get a session token
    const token = await authenticateWithFileMaker();

    // Fetch records from FileMaker using the session token
    const dataResponse = await axios.get(
      `${baseURL}/layouts/ToDoList/records`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(dataResponse.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to connect to FileMaker" },
      { status: 500 }
    );
  }
}

//Add POST function to create a new task
export async function POST(req) {
  try {
    console.log("Step 1: Received POST request");

    // Step 2: Authenticate and get the session token
    const token = await authenticateWithFileMaker();
    console.log("Step 2: Received session token:", token);

    // Step 3: Parse the request body to get the JSON data
    const { description } = await req.json();
    console.log("Step 3: Parsed request body:", { description });

    // Step 4: Send the request to create a new task in FileMaker
    const createResponse = await axios.post(
      `${baseURL}/layouts/ToDoList/records`,
      {
        fieldData: {
          Description: description,
          Completed: 0, // Default to not completed
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Step 5: Log and return the response from FileMaker
    console.log("Step 5: FileMaker create response:", createResponse.data);
    return NextResponse.json({
      message: "Task created successfully",
      data: createResponse.data,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    console.log("Step 1: Received PUT request");

    // Step 2: Authenticate and get the session token
    const token = await authenticateWithFileMaker();
    console.log("Step 2: Received session token:", token);

    // Step 3: Parse the request body to get recordId and new description
    const { recordId, description } = await req.json();
    console.log("Step 3: Parsed request body:", { recordId, description });

    // Step 4: Send the update request to FileMaker
    const updateResponse = await axios.patch(
      `${baseURL}/layouts/ToDoList/records/${recordId}`,
      {
        fieldData: {
          Description: description,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Step 5: Log and return the response from FileMaker
    console.log("Step 5: FileMaker update response:", updateResponse.data);
    return NextResponse.json({
      message: "Task updated successfully",
      data: updateResponse.data,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
