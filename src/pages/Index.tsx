import PodiumLeaderboard, { TraderData } from "@/components/PodiumLeaderboard";

const Index = () => {
  // Sample data matching the Figma design
  const topTraders: [TraderData, TraderData, TraderData] = [
    {
      name: "Alex Thompson",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      profit: 212000,
      growth: 66,
      rank: 1,
    },
    {
      name: "Sarah Chen",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
      profit: 189000,
      growth: 58,
      rank: 2,
    },
    {
      name: "Marcus Johnson",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      profit: 165000,
      growth: 52,
      rank: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Top Traders Leaderboard
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the most successful traders and their remarkable
            achievements in our platform
          </p>
        </div>

        {/* Podium Leaderboard */}
        <PodiumLeaderboard traders={topTraders} />

        {/* Additional sections can be added here */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Active Traders</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">$2.5M</div>
              <div className="text-gray-400">Total Volume</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Market Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
