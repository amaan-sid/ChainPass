import React, { useEffect, useState } from "react";
import { getTicketContract } from "../utils/contract";
import { ethers } from "ethers";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTickets = async () => {
    setLoading(true);
    try {
      const contract = await getTicketContract();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const filter = contract.filters.TicketMinted(address, null);
      const logs = await contract.queryFilter(filter);

      const userTickets = logs.map((log) => log.args[1].toString());
      setTickets(userTickets);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyTickets();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-red-500 animate-pulse">
        🎫 My Tickets
      </h1>

      {loading ? (
        <p className="text-gray-300 text-lg">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-red-400 text-xl">You don't own any tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {tickets.map((ticketId, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 shadow-lg rounded-2xl p-6 border border-red-500"
            >
              <p className="text-xl font-semibold text-red-400">
                🎟️ Ticket #{Number(ticketId) + 1}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
