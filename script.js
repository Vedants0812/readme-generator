async function generate() {
  const name = document.getElementById("name").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const tech = document.getElementById("tech").value.trim();
  const output = document.getElementById("output");

  // Validation
  if (!name || !desc || !tech) {
    alert("Please fill all fields");
    return;
  }

  // Show loader
  output.innerText = "⚡ Generating README... Please wait...";

  try {
    const res = await fetch("https://readme-generator-9apg.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description: desc,
        tech
      })
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    // Show result
    output.innerText = data.result;

  } catch (error) {
    console.error(error);
    output.innerText = "❌ Error generating README. Please try again.";
  }
}


// COPY FUNCTION
function copyText() {
  const text = document.getElementById("output").innerText;

  if (!text || text.includes("Generating")) {
    alert("Nothing to copy yet!");
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => {
      alert("✅ Copied to clipboard!");
    })
    .catch(() => {
      alert("❌ Failed to copy");
    });
}
function downloadReadme() {
  const text = document.getElementById("output").innerText;

  if (!text || text.includes("Generating")) {
    alert("Nothing to download!");
    return;
  }

  const blob = new Blob([text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "README.md";
  a.click();

  URL.revokeObjectURL(url);
}