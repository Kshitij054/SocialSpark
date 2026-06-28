"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

export async function processInstagramData(username: string) {
  console.log("Processing data for:", username);
  const response = await fetch(`${API_BASE_URL}/process_data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instagram_id: username,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export async function getChatResponse(message: string, instagramId?: string) {
  const body = {
    query: message,
    instagram_id: instagramId,
  };

  // Send a POST request
  const response = await fetch(`${API_BASE_URL}/process_query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // Check if the response is OK
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse the response as JSON
  const data = await response.json();

  // Return the response
  return {
    response: data.message || "No response received",
    data: data,
  };
}
