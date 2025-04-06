import { useState } from "react";
import axios from "axios";

const NFTUploader = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToIPFS = async () => {
    if (!file) return alert("Please select a file");

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer YOUR_PINATA_JWT`, // use Pinata JWT here
        },
      });

      const hash = res.data.IpfsHash;
      setIpfsHash(`https://gateway.pinata.cloud/ipfs/${hash}`);
    } catch (error) {
      console.error("Error uploading to IPFS", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded shadow-md w-full max-w-lg mx-auto mt-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Upload Your NFT</h2>

      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={uploadToIPFS}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload to IPFS"}
      </button>

      {ipfsHash && (
        <div className="mt-4 text-center">
          <p>Uploaded successfully:</p>
          <a href={ipfsHash} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {ipfsHash}
          </a>
          <img src={ipfsHash} alt="NFT Preview" className="mt-4 max-h-60 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default NFTUploader;
