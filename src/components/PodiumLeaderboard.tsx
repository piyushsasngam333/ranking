import React from "react";

export interface TraderData {
  name: string;
  avatarUrl: string;
  profit: number;
  growth: number;
  rank: 1 | 2 | 3;
}

export interface PodiumLeaderboardProps {
  traders: [TraderData, TraderData, TraderData];
}

const PodiumLeaderboard: React.FC<PodiumLeaderboardProps> = ({ traders }) => {
  // Sort traders by rank to ensure correct positioning
  const sortedTraders = [...traders].sort((a, b) => a.rank - b.rank);
  const [first, second, third] = sortedTraders;

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600"; // Gold
      case 2:
        return "from-gray-300 to-gray-500"; // Silver
      case 3:
        return "from-orange-400 to-orange-600"; // Bronze
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRankBorderColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "ring-yellow-400"; // Gold
      case 2:
        return "ring-gray-300"; // Silver
      case 3:
        return "ring-orange-400"; // Bronze
      default:
        return "ring-gray-400";
    }
  };

  const getRankGlowColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "shadow-[0_0_30px_rgba(250,204,21,0.3)]"; // Gold glow
      case 2:
        return "shadow-[0_0_30px_rgba(209,213,219,0.3)]"; // Silver glow
      case 3:
        return "shadow-[0_0_30px_rgba(251,146,60,0.3)]"; // Bronze glow
      default:
        return "shadow-[0_0_30px_rgba(156,163,175,0.3)]";
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-64"; // Tallest
      case 2:
        return "h-48"; // Medium
      case 3:
        return "h-40"; // Shortest
      default:
        return "h-32";
    }
  };

  const formatProfit = (profit: number) => {
    return `$ ${profit.toLocaleString()}`;
  };

  const LaurelIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg
      className={className}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2722 20.3668C11.9519 19.9697 14.1979 19.8205 16.408 20.6675C18.0859 21.2735 19.3847 22.4415 20.6213 23.4986C20.6213 23.4986 20.24 23.0425 19.8193 22.2627C19.3685 21.4908 18.7702 20.4716 18.1869 19.4484C17.5885 18.4291 17.0052 17.4059 16.5584 16.6489C16.1978 15.8532 15.9547 15.3128 15.9547 15.3128C14.7861 15.8133 11.7378 16.923 8.71707 15.2243C7.77966 14.6769 6.88006 13.9125 6.1787 13.0478C5.53342 12.1524 4.99221 11.1658 4.55833 10.2781C3.73161 8.47576 3.32906 6.99088 3.32906 6.99088C3.32906 6.99088 4.40966 6.64108 5.9104 6.59384C7.43019 6.55727 9.38516 6.81942 11.1288 7.96502C12.3721 8.74983 13.2441 9.88752 14.0549 10.9778L22 22L30 10 C22 22 30 10"
        fill="currentColor"
        fillOpacity="0.6"
      />
    </svg>
  );

  const PodiumBox: React.FC<{
    trader: TraderData;
    position: "left" | "center" | "right";
  }> = ({ trader, position }) => {
    const isCenter = position === "center";
    const isLeft = position === "left";

    return (
      <div
        className={`relative flex flex-col items-center ${
          isCenter ? "order-2" : isLeft ? "order-1" : "order-3"
        } ${isCenter ? "z-20" : "z-10"}`}
      >
        {/* Blurred background glow */}
        <div
          className={`absolute inset-0 rounded-full ${getRankColor(
            trader.rank,
          )} opacity-30 blur-3xl ${getPodiumHeight(trader.rank)} w-32 top-8`}
        />

        {/* Avatar section */}
        <div className="relative mb-6 z-30">
          {/* Avatar container with glow */}
          <div
            className={`relative p-1 rounded-full bg-gradient-to-r ${getRankColor(
              trader.rank,
            )} ${getRankGlowColor(trader.rank)}`}
          >
            <div className="w-24 h-24 rounded-full bg-gray-900 p-1">
              <img
                src={trader.avatarUrl || "/placeholder.svg"}
                alt={trader.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Laurel decoration */}
          <div className="absolute -top-3 -left-3 text-yellow-400 opacity-80">
            <LaurelIcon className="w-8 h-8 transform -rotate-12" />
          </div>
          <div className="absolute -top-3 -right-3 text-yellow-400 opacity-80">
            <LaurelIcon className="w-8 h-8 transform rotate-12 scale-x-[-1]" />
          </div>

          {/* Rank badge */}
          <div
            className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r ${getRankColor(
              trader.rank,
            )} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
          >
            {trader.rank}
          </div>
        </div>

        {/* Trader info */}
        <div className="text-center mb-4 z-30 relative">
          <h3 className="text-xl font-medium text-white/90 mb-2 tracking-tight">
            {trader.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg text-white/80 font-normal">
              {formatProfit(trader.profit)}
            </span>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                trader.rank === 1
                  ? "bg-yellow-400/10 text-yellow-400"
                  : trader.rank === 2
                    ? "bg-gray-300/10 text-gray-300"
                    : "bg-orange-400/10 text-orange-400"
              }`}
            >
              {trader.growth}%
            </div>
          </div>
        </div>

        {/* Podium base */}
        <div
          className={`relative ${getPodiumHeight(
            trader.rank,
          )} w-48 bg-gradient-to-b from-gray-800/80 to-gray-900/90 backdrop-blur-sm border border-white/10 ${
            isCenter ? "rounded-t-2xl" : "rounded-t-xl"
          } ${getRankGlowColor(trader.rank)} transition-all duration-300 hover:scale-[1.02]`}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            backdropFilter: "blur(10px)",
            borderImage: `linear-gradient(135deg, ${
              trader.rank === 1
                ? "rgba(250,204,21,0.3)"
                : trader.rank === 2
                  ? "rgba(209,213,219,0.3)"
                  : "rgba(251,146,60,0.3)"
            }, transparent) 1`,
          }}
        >
          {/* Podium side panels for 3D effect */}
          <div
            className={`absolute top-0 -right-4 ${getPodiumHeight(
              trader.rank,
            )} w-4 bg-gradient-to-b from-gray-700/60 to-gray-800/80 transform skew-y-2 ${
              isCenter ? "rounded-tr-2xl" : "rounded-tr-xl"
            }`}
          />
          <div
            className={`absolute bottom-0 -right-4 w-4 h-8 bg-gradient-to-b from-gray-800/80 to-gray-900/90 transform skew-y-2`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 blur-3xl rounded-3xl" />

      {/* Main podium container */}
      <div className="relative flex items-end justify-center gap-8 lg:gap-12">
        {/* Third place (left) */}
        <PodiumBox trader={third} position="left" />

        {/* First place (center) */}
        <PodiumBox trader={first} position="center" />

        {/* Second place (right) */}
        <PodiumBox trader={second} position="right" />
      </div>

      {/* Additional glow at bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent blur-2xl" />
    </div>
  );
};

export default PodiumLeaderboard;
