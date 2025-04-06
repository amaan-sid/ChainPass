import React from "react";

const events = [
  {
    id: 1,
    title: "Arijit Singh Live Concert",
    date: "April 25, 2025",
    location: "Delhi, India",
    image: "https://pixabay.com/photos/man-singer-singing-voice-vocal-5431169/",
  },
  {
    id: 2,
    title: "Sunburn Festival",
    date: "May 10, 2025",
    location: "Goa, India",
    image: "https://i.imgur.com/ubMxlQk.jpg",
  },
  {
    id: 3,
    title: "Techno Nights",
    date: "May 18, 2025",
    location: "Bangalore, India",
    image: "https://i.imgur.com/lb4QvM1.jpg",
  },
  {
    id: 4,
    title: "Stand-up by Zakir Khan",
    date: "June 2, 2025",
    location: "Mumbai, India",
    image: "https://i.imgur.com/AB7FQ1K.jpg",
  },
];

export default function Upcoming() {
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
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-full">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}