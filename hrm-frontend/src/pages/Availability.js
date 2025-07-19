import React, { useState } from "react";
import API from "../api";

export default function Availability() {
  const [availability, setAvailability] = useState(["", "", "", ""]);

  const submitAvailability = async () => {
    try {
      await API.post(
        "/availability",
        { days: availability },
        {
          headers: { Authorization:`Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("✅ Availability submitted!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit availability");
    }
  };

  return (
    <div className="container">
      <h2>Submit Weekly Availability</h2>
      {availability.map((day, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Day ${i + 1} hours`}
          value={day}
          onChange={(e) => {
            const updated = [...availability];
            updated[i] = e.target.value;
            setAvailability(updated);
          }}
        />
      ))}
      <button onClick={submitAvailability}>Submit</button>
    </div>
  );
}