import React from "react";

const TicketCard = ({ name, tokenId, date, location, image, hasAccess }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm border hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt="Ticket"
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
      <p className="text-gray-600 text-sm">🎫 Token ID: {tokenId}</p>
      <p className="text-gray-600 text-sm">📍 Location: {location}</p>
      <p className="text-gray-600 text-sm">📅 Date: {date}</p>

      {hasAccess !== undefined && (
        <p className={`mt-2 font-semibold ${hasAccess ? "text-green-600" : "text-red-600"}`}>
          {hasAccess ? "Access Granted ✅" : "Access Denied ❌"}
        </p>
      )}
    </div>
  );
};

export default TicketCard;
