import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/availability", {
          headers: { Authorization:`Bearer ${localStorage.getItem("token")}`},
        });
        setData(res.data);
      } catch (error) {
        console.error(error);
        alert("❌ Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Team Availability</h2>
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            <strong>{item.user}</strong>: {item.days.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}