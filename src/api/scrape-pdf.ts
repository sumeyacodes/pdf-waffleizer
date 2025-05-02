const baseUrl = "https://pdf-waffleizer.onrender.com";
// const baseUrl = "http://localhost:3000"; // for local dev

const ENDPOINT = `${baseUrl}/scrape/file`;
export async function scrapeFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    for (const [key, value] of formData.entries()) {
      console.log("📦 formdata entry:", key, value);
    }

    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: formData,
    });

    console.log("📬 response status:", response.status);

    if (!response.ok) throw new Error(`server ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("❌ scrapeFile failed:", error);
    throw error;
  }
}
