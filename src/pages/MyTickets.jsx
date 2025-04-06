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

      const ticketDetails = logs.map((log) => {
        const ticketId = log.args[1].toString();
        const timestamp = log.blockNumber; // fallback: use block number as fake timestamp
        const uniqueCode = ethers.keccak256(ethers.toUtf8Bytes(address + ticketId)).slice(0, 10);
        return {
          ticketId,
          address,
          blockNumber: timestamp,
          uniqueCode,
        };
      });

      setTickets(ticketDetails);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-red-500 animate-pulse drop-shadow-xl">
        🎫 My ChainPass Tickets
      </h1>

      {loading ? (
        <p className="text-gray-400 text-lg animate-pulse">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-red-400 text-xl">You don't own any tickets yet 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-7xl">
          {tickets.map((ticket, idx) => (
            <div
              key={idx}
              className="bg-zinc-800 rounded-3xl p-6 border border-red-500 shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <h2 className="text-xl font-bold text-white mb-2">
                🎟 Ticket #{Number(ticket.ticketId) + 1}
              </h2>
              <p className="text-sm text-gray-400 mb-1">
                Ticket ID: {Number(ticket.ticketId) + 1}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                Buyer: {ticket.address.slice(0, 6)}...{ticket.address.slice(-4)}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Block: #{ticket.blockNumber}
              </p>

              <div className="bg-zinc-700 p-3 rounded-lg mt-2 text-center">
                <p className="text-sm text-green-400 font-mono mb-2">
                  🎫 Entry Code:
                </p>
                <p className="text-xs text-white font-mono">{ticket.uniqueCode}</p>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(ticket.uniqueCode)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl text-sm font-semibold"
              >
                📋 Copy Entry Code
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;