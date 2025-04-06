import React, { useState } from "react";
import { getTicketContract } from "../utils/contract";
import TokenInput from "../components/TokenInput";
import { ethers } from "ethers";

const MintTicket = () => {
  const [minting, setMinting] = useState(false);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("1"); // default 1 ETH

  const handleMint = async () => {
    setMinting(true);
    setStatus("⏳ Connecting to wallet...");

    try {
      const contract = await getTicketContract();
      if (!contract) {
        setStatus("❌ Could not connect to contract.");
        return;
      }

      const tx = await contract.buyWithToken({
        value: ethers.parseEther(amount),
      });

      setStatus("⛏️ Minting in progress...");
      await tx.wait();
      setStatus("✅ Ticket Minted Successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Transaction failed!");
    }

    setMinting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">
        Mint Your Ticket 🎟️
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <TokenInput amount={amount} setAmount={setAmount} />

        <button
          onClick={handleMint}
          disabled={minting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
        >
          {minting ? "Minting..." : `Mint with ${amount} ETH`}
        </button>

        {status && <p className="mt-4 text-gray-700">{status}</p>}
      </div>
    </div>
  );
};

export default MintTicket;
