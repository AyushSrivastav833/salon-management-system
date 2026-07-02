import { useState } from "react";

export default function HairstyleRecommendation() {
  const [form, setForm] = useState({
    faceShape: "",
    hairType: "",
    hairLength: "",
    lifestyle: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generate = async () => {
  console.log("BUTTON CLICKED");

  setLoading(true);

  try {
    const res = await fetch("http://localhost:4000/api/ai/hairstyle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log(data);

    setResult(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>AI Hairstyle Advisor</h1>

      <input
        name="faceShape"
        placeholder="Face Shape"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="hairType"
        placeholder="Hair Type"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="hairLength"
        placeholder="Hair Length"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="lifestyle"
        placeholder="Lifestyle"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={generate}>
        {loading ? "Thinking..." : "Get Recommendation"}
      </button>

      <br /><br />

      <pre>{result}</pre>
    </div>
  );
}