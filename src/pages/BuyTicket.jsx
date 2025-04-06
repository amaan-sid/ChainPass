"use client"

import { useState } from "react"
import { getContract } from "../utils/contract"
import { ethers } from "ethers"
import { motion } from "framer-motion"
import { ArrowLeft, Ticket, Wallet, Check, AlertCircle, Loader2 } from "lucide-react"
import { Link } from "lucide-react"
import { useLocation } from "react-router-dom"


const BuyTicket = ({ selectedEvent, onPurchaseComplete }) => {

  const location = useLocation();
  const eventData = location.state;
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [amount, setAmount] = useState("0.1")
  const [step, setStep] = useState(1)
  const [ticketId, setTicketId] = useState("")

  const handleBuy = async () => {
    setLoading(true)
    setStatus("Connecting to wallet...")

    try {
      const contract = await getContract()
      if (!contract) {
        setStatus("Failed to connect to wallet")
        setLoading(false)
        return
      }

      setStatus("Transaction in progress...")

      const tx = await contract.buyWithToken({
        value: ethers.parseEther(amount.toString()),
      })

      await tx.wait()

      // Generate a random ticket ID for demo purposes
      const newTicketId = `TICKET-${Math.floor(Math.random() * 1000000)}`
      setTicketId(newTicketId)

      setStatus("🎟️ Ticket successfully purchased!")
      setStep(2)

      if (onPurchaseComplete) {
        onPurchaseComplete(newTicketId)
      }
    } catch (err) {
      console.error(err)
      setStatus("❌ Transaction failed. Please try again.")
    }

    setLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link href="/" className="flex items-center text-red-500 mb-6 hover:text-red-400 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Events
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-gray-900 to-black border border-red-900/20 p-8 rounded-2xl shadow-[0_0_30px_rgba(255,0,0,0.1)]"
        >
          {step === 1 ? (
            <>
              <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full"></div>
                  <Ticket className="relative z-10 h-16 w-16 text-red-500" />
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600"
              >
                Buy ChainPass Ticket
              </motion.h1>

              {selectedEvent && (
                <motion.div variants={itemVariants} className="mb-6 bg-gray-800/50 p-4 rounded-xl">
                  <h2 className="font-semibold text-red-400 mb-1">{selectedEvent.type}</h2>
                  <h3 className="text-xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-400 text-sm">Date: {selectedEvent.date}</p>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block mb-2 font-medium text-red-400">Amount (in ETH):</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-red-900/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">ETH</div>
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuy}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Buy Ticket for {amount} ETH
                  </>
                )}
              </motion.button>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-lg text-center ${
                    status.includes("❌")
                      ? "bg-red-900/20 text-red-400"
                      : status.includes("🎟️")
                        ? "bg-green-900/20 text-green-400"
                        : "bg-gray-800/50 text-gray-300"
                  }`}
                >
                  {status.includes("❌") ? (
                    <div className="flex items-center justify-center">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      {status}
                    </div>
                  ) : status.includes("🎟️") ? (
                    <div className="flex items-center justify-center">
                      <Check className="mr-2 h-5 w-5" />
                      {status}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {status}
                    </div>
                  )}
                </motion.div>
              )}
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                  <Check className="relative z-10 h-16 w-16 text-green-500" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4 text-center">Purchase Complete!</h2>

                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl w-full mb-6 border border-green-500/20">
                  <p className="text-gray-400 mb-2">Ticket ID:</p>
                  <p className="text-xl font-mono text-white bg-gray-800 p-2 rounded">{ticketId}</p>
                </div>

                <p className="text-gray-400 text-center mb-6">
                  Your ticket has been added to your wallet. You can view it in the "My Tickets" section.
                </p>

                <div className="flex gap-4 w-full">
                  <Link
                    href="/my-tickets"
                    className="flex-1 bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all duration-300 text-center"
                  >
                    View My Tickets
                  </Link>

                  <Link
                    href="/"
                    className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 text-center"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default BuyTicket

