import { useState } from "react";

const AdminPanel = () => {
  const [address, setAddress] = useState("");
  const [minted, setMinted] = useState(false);

  const handleMintToUser = async () => {
    // Replace with contract call to mint to specific address
    setMinted(false);
    setTimeout(() => {
      setMinted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen px-4 py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Admin Panel</h2>
      <input
        type="text"
        placeholder="User Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border px-4 py-2 rounded-lg mb-4 w-full max-w-md"
      />
      <button
        onClick={handleMintToUser}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Mint Ticket
      </button>
      {minted && <p className="mt-4 text-green-600">✅ NFT Ticket Sent!</p>}
    </div>
  );
};

export default AdminPanel;
