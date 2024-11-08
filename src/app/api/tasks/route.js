import axios from "axios";
import { NextResponse } from "next/server";

const baseURL =
  "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList";

//Obtain a Session Token
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
    // Get the session token using the helper function
    const token = await authenticateWithFileMaker();

    // Placeholder response to confirm authentication works
    return NextResponse.json({ message: "Authenticated successfully", token });
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
