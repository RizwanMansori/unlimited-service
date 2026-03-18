// src/App.jsx
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");

  const servicesList = [
    "Electrician",
    "Plumber",
    "AC Repair",
    "Cleaning",
    "Painting",
    "Carpenter",
  ];

  // Fetch bookings from Firebase
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
  };

  useEffect(() => {
    fetchData();
    const login = localStorage.getItem("isAdminLoggedIn");
    if (login === "true") setIsAdmin(true);
  }, []);

  const saveBooking = async () => {
    if (!name || !phone || !service) {
      alert("Sab fill karo");
      return;
    }
    await addDoc(collection(db, "bookings"), { name, phone, service });
    alert("Booking Saved ✅");
    setName(""); setPhone(""); setService("");
    fetchData();
  };

  const deleteBooking = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    fetchData();
  };

  const handleLogin = () => {
    const pass = prompt("Enter Admin Password");
    if (pass === "1234") {
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsAdmin(true);
    } else {
      alert("Wrong Password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAdmin(false);
  };

  const handleServiceClick = (s) => {
    const message = `Hello, mujhe ${s} service chahiye`;
    window.open(`https://wa.me/9193626374?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen p-5">

      {/* HERO */}
      <div className="text-center py-12">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Unlimited Services 🚀
        </h1>
        <p className="mt-4 text-gray-300 text-lg md:text-xl">
          Sabhi Services Ek Jagah
        </p>
      </div>

      {/* SERVICES */}
      <div className="grid md:grid-cols-3 gap-6 mb-10 px-2 md:px-10">
        {servicesList.map((s, i) => (
          <div
            key={i}
            onClick={() => handleServiceClick(s)}
            className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl cursor-pointer hover:scale-105 transition shadow-xl"
          >
            <h2 className="text-2xl font-bold">{s}</h2>
            <p className="mt-2 text-gray-300">Click to book {s}</p>
          </div>
        ))}
      </div>

      {/* BOOKING FORM */}
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl mb-10 shadow-lg">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 text-black rounded"
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 mb-3 text-black rounded"
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-3 mb-3 text-black rounded"
        >
          <option value="">Select Service</option>
          {servicesList.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>
        <button
          onClick={saveBooking}
          className="bg-green-500 w-full p-3 rounded hover:scale-105 transition shadow-md"
        >
          Book Now
        </button>
      </div>

      {/* ADMIN PANEL */}
      <div className="text-center mb-10">
        {!isAdmin ? (
          <button
            onClick={handleLogin}
            className="bg-purple-600 px-6 py-2 rounded hover:scale-105 transition shadow-md"
          >
            Admin Login
          </button>
        ) : (
          <div className="max-w-lg mx-auto text-left">
            <h2 className="text-2xl font-bold mb-4">Admin Panel 👑</h2>

            {bookings.length === 0 && (
              <p className="text-gray-300 mb-3">No bookings yet</p>
            )}

            {bookings.map((b) => (
              <div key={b.id} className="bg-gray-800 p-4 mb-3 rounded shadow-md">
                <p><strong>Name:</strong> {b.name}</p>
                <p><strong>Phone:</strong> {b.phone}</p>
                <p><strong>Service:</strong> {b.service}</p>
                <button
                  onClick={() => deleteBooking(b.id)}
                  className="bg-red-500 px-3 py-1 mt-2 rounded hover:scale-105 transition"
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="bg-red-600 px-5 py-2 mt-3 rounded hover:scale-105 transition shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* CALL BUTTON */}
      <a
        href="tel:9193626374"
        className="fixed bottom-20 right-5 bg-blue-500 p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        📞
      </a>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/9193626374"
        className="fixed bottom-5 right-5 bg-green-500 p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        💬
      </a>

    </div>
  );
}