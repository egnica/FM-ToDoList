import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const baseURL =
    "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList";

  try {
    // Step 1: Obtain a Session Token
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
    const token = authResponse.data.response.token;

    // Step 2: Use the Token to Fetch Records
    const dataResponse = await axios.get(
      `${baseURL}/layouts/ToDoList/records`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Step 3: Return the Data to the Client using NextResponse
    return NextResponse.json(dataResponse.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to connect to FileMaker" },
      { status: 500 }
    );
  }
}

