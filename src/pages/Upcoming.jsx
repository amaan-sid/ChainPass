import React from "react";
import { useNavigate } from "react-router-dom";
const events = [
  {
    id: 1,
    title: "Arijit Singh Live Concert",
    date: "April 25, 2025",
    location: "Delhi, India",
    image: "https://media.istockphoto.com/id/1137781483/photo/black-male-guitarist-singing-and-playing-acoustic-guitar-on-stage.jpg?s=2048x2048&w=is&k=20&c=nOWgV_0NrKiZClFW2FiltoPFFEi3HwAGIHZ5qUdS5Ek=",
  },
  {
    id: 2,
    title: "Sunburn Festival",
    date: "May 10, 2025",
    location: "Goa, India",
    image: "https://cdn.pixabay.com/photo/2016/11/29/04/18/hot-air-balloons-1867279_1280.jpg",
  },
  {
    id: 3,
    title: "Techno Nights",
    date: "May 18, 2025",
    location: "Bangalore, India",
    image: "https://cdn.pixabay.com/photo/2019/08/12/12/33/festival-4401107_1280.jpg",
  },
  {
    id: 4,
    title: "CryptoCon 2025",
    date: "May 25, 2025",
    location: "Hyderabad, India",
    image: "https://cdn.pixabay.com/photo/2024/12/07/18/38/celebration-9251458_1280.jpg",
  },
  {
    id: 5,
    title: "Bollywood Beats Night",
    date: "June 1, 2025",
    location: "Mumbai, India",
    image: "https://cdn.pixabay.com/photo/2016/09/22/13/51/bollywood-1687410_1280.jpg",
  },
  {
    id: 6,
    title: "Stand-up by Zakir Khan",
    date: "June 2, 2025",
    location: "Mumbai, India",
    image: "https://m.media-amazon.com/images/S/pv-target-images/41ac9018735a5e81c511f3d14f6eb342f090e1a5006db60689fc095dcc95d45a._SX1080_FMjpg_.jpg",
  },
];

export default function Upcoming() {
  const navigate = useNavigate();
  const handleBookTicket=(event)=>{
    navigate("/buy");
  }
  return (
    <div className="bg-slate-900 min-h-screen text-white px-6 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-10 text-center mb-10 shadow-xl">
        <h1 className="text-4xl font-bold mb-4">🎟 Upcoming Shows</h1>
        <p className="text-xl">Book your tickets now before they're sold out!</p>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
              <p className="text-sm text-slate-300">{event.date}</p>
              <p className="text-sm text-slate-300 mb-3">{event.location}</p>
              <button onClick={() => handleBookTicket(event)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-full">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}