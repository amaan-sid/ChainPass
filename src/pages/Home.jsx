"use client"

import { useState, useEffect, useRef } from "react"
import {
  Ticket,
  Wallet,
  Film,
  Plane,
  Music,
  Globe,
  Gift,
  Rocket,
  Star,
  Crown,
  Users,
  Sparkles,
  Lock,
  Gem,
  Coins,
  Clock,
  Share2,
  Play,
  Heart,
  Calendar,
  Send,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "lucide-react"
import { BrowserRouter as Router} from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("movie")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [myTickets, setMyTickets] = useState([])
  const videoRef = useRef(null)
  const router = Router
  const navigate = useNavigate();
    const handleBookTicket=(event)=>{
      navigate("/buy");
    }

  const handleConnectWallet = async () => {
    setLoading(true)
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this feature.")
        return
      }
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setWalletAddress(accounts[0])
    } catch (error) {
      console.error("Wallet connection error:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBuyNow = (event) => {
    
    navigate("/buy");
    // router.push("/buy-ticket")
    // Store the selected event in localStorage for the buy-ticket page
    localStorage.setItem("selectedEvent", JSON.stringify(event))
  }

  const handlePurchaseComplete = (ticketId) => {
    const newTicket = {
      id: ticketId,
      ...selectedEvent,
      location: "Main Venue, Downtown",
      time: "19:00",
    }

    const updatedTickets = [...myTickets, newTicket]
    setMyTickets(updatedTickets)

    // Store in localStorage for persistence
    localStorage.setItem("myTickets", JSON.stringify(updatedTickets))
  }

  useEffect(() => {
    // Load tickets from localStorage on component mount
    const storedTickets = localStorage.getItem("myTickets")
    if (storedTickets) {
      setMyTickets(JSON.parse(storedTickets))
    }

    // Autoplay video when component mounts
    // if (videoRef.current) {
    //   videoRef.current.play().catch((error) => {
    //     console.log("Autoplay prevented:", error)
    //   })
    // }
  }, [])

  const categories = [
    {
      type: "movie",
      Icon: Film,
      title: "Movies",
      desc: "Experience cinematic excellence with blockchain-secured premium access.",
      features: ["VIP Seating", "Exclusive Premieres", "Digital Collectibles"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      type: "travel",
      Icon: Plane,
      title: "Travel",
      desc: "Elevate your journey with secure, decentralized luxury travel passes.",
      features: ["Priority Boarding", "Lounge Access", "Flexible Booking"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      type: "concert",
      Icon: Music,
      title: "Concerts",
      desc: "Unlock exclusive VIP experiences with NFT-powered concert access.",
      features: ["Backstage Access", "Meet & Greet", "Limited Editions"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      type: "sports",
      Icon: Rocket,
      title: "Sports",
      desc: "Premium seats and VIP experiences for major sporting events.",
      features: ["Box Seating", "Player Meet-ups", "Exclusive Merchandise"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      type: "expo",
      Icon: Globe,
      title: "Expos",
      desc: "Elite access to global exhibitions and premium networking events.",
      features: ["Early Access", "Speaker Sessions", "Networking Events"],
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      type: "festival",
      Icon: Gift,
      title: "Festivals",
      desc: "Exclusive multi-day passes with unique digital collectibles.",
      features: ["VIP Areas", "Fast-track Entry", "Exclusive Shows"],
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  const benefits = [
    {
      Icon: Lock,
      title: "Secure Ownership",
      description: "Military-grade encryption ensures your tickets are protected",
    },
    {
      Icon: Sparkles,
      title: "Exclusive Access",
      description: "VIP experiences and premium perks for token holders",
    },
    {
      Icon: Share2,
      title: "Easy Transfer",
      description: "Seamlessly transfer or resell tickets with full transparency",
    },
    {
      Icon: Clock,
      title: "Instant Delivery",
      description: "Receive your tickets immediately after purchase",
    },
  ]

  const tiers = [
    {
      Icon: Star,
      name: "Standard",
      price: "Free",
      features: ["Basic ticket access", "Digital wallet integration", "Email support", "Standard verification"],
    },
    {
      Icon: Crown,
      name: "Premium",
      price: "0.1 ETH/month",
      features: [
        "Priority access to events",
        "Exclusive NFT collectibles",
        "24/7 concierge service",
        "VIP customer support",
        "Advanced features",
      ],
    },
    {
      Icon: Gem,
      name: "Enterprise",
      price: "Custom",
      features: [
        "Custom ticketing solutions",
        "Dedicated account manager",
        "API access",
        "White-label options",
        "Custom analytics",
        "Priority support",
      ],
    },
  ]

  const stats = [
    { Icon: Users, value: "100K+", label: "Active Users" },
    { Icon: Ticket, value: "1M+", label: "Tickets Sold" },
    { Icon: Globe, value: "50+", label: "Countries" },
    { Icon: Coins, value: "$10M+", label: "Trading Volume" },
  ]

  const featuredEvents = [
    {
      id: 1,
      title: "Avengers: Endgame",
      type: "Movie",
      date: "Apr 15, 2025",
      image: "https://images.ctfassets.net/3sjsytt3tkv5/48dw0Wqg1t7RMqLrtodjqL/d72b35dae2516fa64803f4de2ab8e30f/Avengers-_Endgame_-_Header_Image.jpeg",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Taylor Swift: Eras Tour",
      type: "Concert",
      date: "May 10, 2025",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQwmpQf7VzI5WK8l7iBuvcA-FHWF5KQ-i70MjDo-9aHk5NQGV8R98cNbZJOwxH6GU_aeH9R",
      rating: 4.9,
    },
    {
      id: 3,
      title: "NBA Finals 2025",
      type: "Sports",
      date: "Jun 5, 2025",
      image: "https://cdn.nba.com/manage/2025/03/2025-finals-logo-white.jpg",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Tech Summit 2025",
      type: "Expo",
      date: "Jul 20, 2025",
      image: "https://dublintechsummit.tech/wp-content/uploads/sites/7/2025/01/Dublin-Tech-Summit-2025-2.jpg",
      rating: 4.6,
    },
  ]

  // Generate event data based on the active category
  const getCategoryEvents = () => {
    const category = categories.find((c) => c.type === activeCategory)
    return Array.from({ length: 6 }).map((_, index) => ({
      id: `${activeCategory}-${index + 1}`,
      title: `${category.title} Event ${index + 1}`,
      type: category.title,
      date: `Apr ${10 + index}, 2025`,
      image: category.image || "/placeholder.svg?height=400&width=300",
      rating: (4 + Math.random() * 0.9).toFixed(1),
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const slideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  const pulseAnimation = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const glowAnimation = {
    glow: {
      boxShadow: ["0 0 20px rgba(255, 0, 0, 0.2)", "0 0 60px rgba(255, 0, 0, 0.4)", "0 0 20px rgba(255, 0, 0, 0.2)"],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black text-white"
      >
        {/* Background Video */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute min-w-full min-h-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
        </div>

        {/* Navigation Bar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 bg-black/80 backdrop-blur-md border-b border-red-900/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/">
                  <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-red-600">
                    <Ticket className="inline-block mr-2 h-6 w-6" />
                    ChainPass
                  </motion.div>
                </Link>
                <div className="hidden md:block ml-10">
                  <div className="flex items-center space-x-4">
                    {categories.map((category) => (
                      <motion.button
                        key={category.type}
                        whileHover={{
                          color: "#ff0000",
                          scale: 1.05,
                          textShadow: "0 0 8px rgba(255,0,0,0.5)",
                        }}
                        className={`px-3 py-2 text-sm font-medium ${activeCategory === category.type ? "text-red-500" : "text-gray-300"} hover:text-white cursor-pointer`}
                        onClick={() => setActiveCategory(category.type)}
                      >
                        {category.title}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <input
                    type="text"
                    placeholder="Search for movies, events, plays, sports"
                    className="w-64 px-4 py-2 rounded-full bg-gray-900 border border-red-900/30 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </motion.div>
                {myTickets.length > 0 && (
                  <Link href="/mytickets">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-2 text-gray-300 hover:text-white"
                    >
                      <Ticket className="h-6 w-6" />
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {myTickets.length}
                      </span>
                    </motion.button>
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center px-4 py-2 bg-gradient-to-r from-red-700 to-red-900 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                  onClick={handleConnectWallet}
                  disabled={loading}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
                  {loading ? (
                    "Connecting..."
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      {walletAddress ? "Connected" : "Connect Wallet"}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-4 pt-20 pb-32 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            animate="glow"
            variants={glowAnimation}
            className="absolute top-10 left-1/2 transform -translate-x-1/2 rounded-full p-4 bg-gradient-to-r from-red-500/20 to-black/20 backdrop-blur-xl"
          >
            <Ticket className="w-16 h-16 text-red-600" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-24 text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-red-700"
          >
            ChainPass
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-2xl text-red-200/80 max-w-3xl mx-auto leading-relaxed font-light"
          >
            The future of premium ticketing, powered by blockchain technology.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12 flex justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center px-8 py-4 bg-gradient-to-r from-red-700 to-red-900 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] overflow-hidden"
              onClick={() => {
                const element = document.getElementById("category-section")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Play className="mr-2 h-5 w-5" />
              Explore Events
            </motion.button>
          </motion.div>

          {walletAddress && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red-300/80"
            >
              Connected: <span className="font-mono bg-red-950/50 px-3 py-1 rounded-lg">{walletAddress}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Featured Events Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 py-16 bg-gradient-to-b from-transparent to-black/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-red-500 mb-8">
              Featured Events
            </motion.h2>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px rgba(255, 0, 0, 0.2)",
                  }}
                  className="bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-red-900/20 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {event.rating} ★
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="text-xs font-semibold text-red-400">{event.type}</div>
                      <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date}
                      </div>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-red-500">
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-2 bg-gradient-to-r from-red-700 to-red-900 rounded-md font-medium text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                      onClick={() => handleBuyNow(event)}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 py-16 bg-gradient-to-b from-black/50 to-transparent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  animate="pulse"
                  variants={pulseAnimation}
                  className="text-center"
                >
                  <stat.Icon className="w-8 h-8 mx-auto mb-4 text-red-600" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-red-300/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Categories Tabs */}
        <motion.section
          id="category-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">
                Browse by Category
              </h2>
            </motion.div>

            {/* Category Tabs */}
            <motion.div variants={itemVariants} className="flex justify-center mb-12 overflow-x-auto pb-2">
              <div className="flex space-x-2 p-1 bg-gray-900/50 backdrop-blur-sm rounded-full border border-red-900/20">
                {categories.map((category) => (
                  <motion.button
                    key={category.type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.type)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.type
                        ? "bg-gradient-to-r from-red-700 to-red-900 text-white shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <category.Icon className="inline-block mr-1 h-4 w-4" />
                    {category.title}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Category Content */}
            <AnimatePresence mode="sync">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {getCategoryEvents().map((event, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInVariants}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 10px 30px rgba(255, 0, 0, 0.2)",
                    }}
                    className="bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-red-900/20 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={`${event.title}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {event.rating} ★
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <div className="text-xs font-semibold text-red-400">{event.type}</div>
                        <h3 className="text-lg font-bold text-white">{event.title}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date}
                        </div>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-red-500">
                          <Heart className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 py-2 bg-gradient-to-r from-red-700 to-red-900 rounded-md font-medium text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]"
                        onClick={() => handleBuyNow(event)}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div variants={itemVariants} className="mt-12 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-red-700 to-red-900 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.3)]"
              >
                View All {categories.find((c) => c.type === activeCategory)?.title}
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 py-24 bg-gradient-to-b from-black/50 to-transparent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">
                Why Choose ChainPass?
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={slideVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-black/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="relative bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-red-500/10">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                      className="flex justify-center mb-6"
                    >
                      <benefit.Icon className="w-12 h-12 text-red-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-red-300 mb-3 text-center">{benefit.title}</h3>
                    <p className="text-gray-400 text-center">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-black/10 backdrop-blur-xl" />
            <div className="relative bg-gradient-to-r from-gray-900/80 to-black/80 p-12 text-center">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500 mb-6">
                Elevate Your Event Experience
              </h2>
              <p className="text-xl text-red-200/80 mb-8 max-w-2xl mx-auto">
                Join the elite community of digital ticket holders. Experience events like never before.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-700 to-red-900 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300"
                onClick={handleConnectWallet}
              >
                Get Started Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 bg-black border-t border-red-900/30 py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold text-red-500 mb-4">ChainPass</h3>
                <p className="text-gray-400 mb-4">The future of premium ticketing, powered by blockchain technology.</p>
                <div className="flex space-x-4">
                  {[Globe, Ticket, Wallet, Star].map((Icon, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.2, color: "#ff0000" }}
                      className="text-gray-400 hover:text-white"
                      href="#"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-red-500 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.type}>
                      <motion.button
                        whileHover={{ x: 5, color: "#ff0000" }}
                        className="text-gray-400 hover:text-white"
                        onClick={() => {
                          setActiveCategory(category.type)
                          const element = document.getElementById("category-section")
                          element?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        {category.title}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-red-500 mb-4">Support</h3>
                <ul className="space-y-2">
                  {["Help Center", "Contact Us", "FAQs", "Terms of Service", "Privacy Policy"].map((item) => (
                    <li key={item}>
                      <motion.a
                        whileHover={{ x: 5, color: "#ff0000" }}
                        className="text-gray-400 hover:text-white"
                        href="#"
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-red-500 mb-4">Subscribe</h3>
                <p className="text-gray-400 mb-4">Get the latest updates on new events and exclusive offers.</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 bg-gray-900 border border-red-900/30 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white w-full"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-900 rounded-r-md"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-red-900/30 text-center text-gray-400"
            >
              <p>© 2025 ChainPass. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.footer>
      </motion.div>
    </AnimatePresence>
  )
}

