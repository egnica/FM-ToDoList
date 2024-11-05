// import axios from "axios";

// export async function GET() {
//   try {
//     console.log("Starting FileMaker Data API login process...");

//     // FileMaker Data API Login
//     const authResponse = await axios.post(
//       "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList/sessions",
//       {},
//       {
//         auth: {
//           username: "DataAPI",
//           password: "*Spam162315",
//         },
//       }
//     );

//     console.log(
//       "Login successful. Token received:",
//       authResponse.data.response.token
//     );

//     const token = authResponse.data.response.token;
//     // Fetch Data from FileMaker
//     const dataResponse = await axios.get(
//       "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList/layouts/ToDoList/records",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Fetching data from FileMaker...");

//     console.log("Data fetched successfully:", dataResponse.data.response.data);

//     //This first one is key... It contains the whole object from the layout 'EricTesting'
//     const thisObject = dataResponse.data.response.data;
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//     console.error("Full error object:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
import axios from "axios";

export async function GET(req, res) {
  const baseURL =
    "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList/layouts/ToDoList/records";

  try {
    console.log("Starting FileMaker Data API login process...");

    // FileMaker Data API Login
    const authResponse = await axios.post(
      "https://FMS-Live01.barlowresearch.com/fmi/data/vLatest/databases/ToDoList/sessions",
      {},
      {
        auth: {
          username: "DataAPI",
          password: "*Spam162315",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to connect to FileMaker" });
  }
}
