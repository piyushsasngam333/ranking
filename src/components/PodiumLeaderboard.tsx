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

  const LaurelIcon: React.FC<{
    className?: string;
    side?: "left" | "right";
  }> = ({ className = "", side = "left" }) => (
    <svg
      className={className}
      width="44"
      height="68"
      viewBox="0 0 62 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={
          side === "left"
            ? "M10.7722 37.3668C12.4519 36.9697 14.6979 36.8205 16.908 37.6675C18.5859 38.2735 19.8847 39.4415 21.1213 40.4986C21.1213 40.4986 20.74 40.0425 20.3193 39.2627C19.8685 38.4908 19.2702 37.4716 18.6869 36.4484C18.0885 35.4291 17.5052 34.4059 17.0584 33.6489C16.6978 32.8532 16.4547 32.3128 16.4547 32.3128C15.2861 32.8133 12.2378 33.923 9.21707 32.2243C8.27966 31.6769 7.38006 30.9125 6.6787 30.0478C6.03342 29.1524 5.49221 28.1658 5.05833 27.2781C4.23161 25.4758 3.82906 23.9909 3.82906 23.9909"
            : "M51.1477 37.3668C49.4681 36.9697 47.2221 36.8205 45.0119 37.6675C43.334 38.2735 42.0352 39.4415 40.7986 40.4986C40.7986 40.4986 41.1799 40.0425 41.6006 39.2627C42.0514 38.4908 42.6497 37.4716 43.2331 36.4484C43.8314 35.4291 44.4147 34.4059 44.8615 33.6489C45.2221 32.8532 45.4652 32.3128 45.4652 32.3128C46.6338 32.8133 49.6822 33.923 52.7028 32.2243C53.6403 31.6769 54.5399 30.9125 55.2412 30.0478"
        }
        fill="url(#paint0_linear)"
        fillOpacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
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
        <div className="relative mb-8 z-30">
          {/* Outer glow ring */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${getRankColor(trader.rank)} opacity-40 blur-md scale-110`}
          />

          {/* Avatar container with border */}
          <div
            className={`relative w-28 h-28 rounded-full bg-gradient-to-r ${getRankColor(
              trader.rank,
            )} p-1 ${getRankGlowColor(trader.rank)}`}
            style={{
              background: `conic-gradient(from 0deg,
                ${
                  trader.rank === 1
                    ? "#facc15, #eab308, #facc15"
                    : trader.rank === 2
                      ? "#d1d5db, #9ca3af, #d1d5db"
                      : "#fb923c, #f97316, #fb923c"
                })`,
              boxShadow: `0 0 20px ${
                trader.rank === 1
                  ? "rgba(250,204,21,0.4)"
                  : trader.rank === 2
                    ? "rgba(209,213,219,0.4)"
                    : "rgba(251,146,60,0.4)"
              }`,
            }}
          >
            {/* Inner shadow container */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-800 to-gray-900 p-1">
              <img
                src={trader.avatarUrl || "/placeholder.svg"}
                alt={trader.name}
                className="w-full h-full rounded-full object-cover border-2 border-gray-700/50"
              />
            </div>
          </div>

          {/* Laurel decoration */}
          <div
            className={`absolute -top-4 -left-6 ${
              trader.rank === 1
                ? "text-yellow-400"
                : trader.rank === 2
                  ? "text-gray-300"
                  : "text-orange-400"
            } opacity-60`}
          >
            <LaurelIcon
              className="w-11 h-16 transform -rotate-15"
              side="left"
            />
          </div>
          <div
            className={`absolute -top-4 -right-6 ${
              trader.rank === 1
                ? "text-yellow-400"
                : trader.rank === 2
                  ? "text-gray-300"
                  : "text-orange-400"
            } opacity-60`}
          >
            <LaurelIcon
              className="w-11 h-16 transform rotate-15"
              side="right"
            />
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

        {/* Podium base with 3D geometric design */}
        <div className="relative">
          {/* Main podium face */}
          <div
            className={`relative ${getPodiumHeight(
              trader.rank,
            )} w-48 bg-gradient-to-b from-gray-800/90 to-black/95 backdrop-blur-sm border border-white/5 ${
              isCenter ? "rounded-t-3xl" : "rounded-t-2xl"
            } ${getRankGlowColor(trader.rank)} transition-all duration-300 hover:scale-[1.02] overflow-hidden`}
            style={{
              background: `linear-gradient(135deg,
                rgba(0,0,0,0.8) 0%,
                rgba(31,41,55,0.6) 50%,
                rgba(0,0,0,0.9) 100%)`,
              backdropFilter: "blur(15px)",
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1),
                         inset 0 -1px 0 rgba(0,0,0,0.3),
                         0 20px 40px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Inner glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${getRankColor(trader.rank)} opacity-5`}
            />

            {/* Geometric patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </div>

          {/* Right side panel for 3D effect */}
          <div
            className={`absolute top-0 -right-6 ${getPodiumHeight(
              trader.rank,
            )} w-6 bg-gradient-to-b from-gray-700/40 to-black/60 transform skew-y-6 origin-top-left ${
              isCenter ? "rounded-tr-3xl" : "rounded-tr-2xl"
            }`}
            style={{
              boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3)",
            }}
          />

          {/* Bottom edge for depth */}
          <div
            className="absolute -bottom-1 -right-6 w-6 h-6 bg-gradient-to-br from-gray-800/60 to-black/80 transform skew-y-6 skew-x-12"
            style={{
              clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
            }}
          />

          {/* Left side subtle shadow */}
          <div
            className={`absolute top-0 -left-1 ${getPodiumHeight(
              trader.rank,
            )} w-1 bg-gradient-to-b from-black/20 to-black/40 ${
              isCenter ? "rounded-tl-3xl" : "rounded-tl-2xl"
            }`}
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
