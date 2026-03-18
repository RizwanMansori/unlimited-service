import { useState, useEffect } from "react";
import { db } from "./firebase"; // Firebase import
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [services, setServices] = useState([
    "Electrician",
    "Plumber",
    "AC Repair",
    "Cleaning",
    "Painting",
    "Carpenter",
  ]);
  const [bookings, setBookings] = useState([]);

  // Admin login check
  useEffect(() => {
    const login = localStorage.getItem("isAdminLoggedIn");
    if (login === "true") setIsAdmin(true);
  }, []);

  // Fetch bookings from Firebase
  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      setBookings(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBookings();
  }, []);

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

  const handleServiceClick = async (service) => {
    const message = `Hello, mujhe ${service} service chahiye`;
    window.open(`https://wa.me/9193626374?text=${encodeURIComponent(message)}`);

    // Add booking to Firebase
    try {
      await addDoc(collection(db, "bookings"), {
        service,
        timestamp: new Date().toISOString(),
      });
      alert(`${service} booking saved!`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">

      {/* HERO */}
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Unlimited Services 🚀
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Sabhi Services Ek Jagah
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-500 rounded-full hover:scale-110 transition shadow-lg">
          Contact Now
        </button>
      </div>

      {/* SERVICES */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        {services.map((service, i) => (
          <div
            key={i}
            onClick={() => handleServiceClick(service)}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-105 transition shadow-xl cursor-pointer"
          >
            <h2 className="text-2xl font-bold">{service}</h2>
            <p className="text-gray-300 mt-2">
              Click to book {service}
            </p>
          </div>
        ))}
      </div>

      {/* ADMIN PANEL */}
      <div className="text-center pb-20">
        {!isAdmin ? (
          <button
            onClick={handleLogin}
            className="bg-purple-600 px-6 py-3 rounded-full hover:scale-110 transition"
          >
            Admin Login
          </button>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">Admin Panel 👑</h2>
            <p className="text-gray-300">Welcome Admin</p>
            {bookings.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Bookings:</h3>
                <ul className="mt-2">
                  {bookings.map(b => (
                    <li key={b.id} className="flex justify-between bg-white/10 p-2 rounded my-1">
                      {b.service} 
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="bg-red-500 px-2 rounded"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 px-5 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* CALL BUTTON */}
      <a
        href="tel:9193626374"
        className="fixed bottom-20 right-5 bg-blue-500 p-4 rounded-full shadow-lg hover:scale-110"
      >
        📞
      </a>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/9193626374"
        className="fixed bottom-5 right-5 bg-green-500 p-4 rounded-full shadow-lg hover:scale-110"
      >
        💬
      </a>
    </div>
  );
}
