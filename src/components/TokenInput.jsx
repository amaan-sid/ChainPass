import React from "react";

const TokenInput = ({ amount, setAmount }) => {
  return (
    <div className="flex flex-col items-start w-full mb-4">
      <label className="text-lg font-medium mb-1 text-gray-700">
        Enter Token Amount 💰
      </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Eg: 1"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        min="0"
        step="0.01"
      />
    </div>
  );
};

export default TokenInput;
