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

const PodiumLeaderboard: React.FC<PodiumLeaderboardProps> = React.memo(
  ({ traders }) => {
    // Validate that we have exactly 3 traders
    if (!traders || traders.length !== 3) {
      console.warn(
        "PodiumLeaderboard: Expected exactly 3 traders, received:",
        traders?.length || 0,
      );
      return (
        <div className="relative w-full max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="text-white/60">
            <p>Leaderboard requires exactly 3 traders</p>
          </div>
        </div>
      );
    }

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
                  alt={`${trader.name} avatar`}
                  className="w-full h-full rounded-full object-cover border-2 border-gray-700/50"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
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
              className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(
                trader.rank,
              )} flex items-center justify-center text-white font-bold text-base shadow-2xl border-2 border-white/20`}
              style={{
                boxShadow: `0 4px 12px ${
                  trader.rank === 1
                    ? "rgba(250,204,21,0.5)"
                    : trader.rank === 2
                      ? "rgba(209,213,219,0.5)"
                      : "rgba(251,146,60,0.5)"
                }, inset 0 1px 0 rgba(255,255,255,0.3)`,
              }}
            >
              {trader.rank}
            </div>
          </div>

          {/* Trader info */}
          <div className="text-center mb-4 z-30 relative px-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white/90 mb-2 tracking-tight">
              {trader.name}
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="text-base sm:text-lg lg:text-xl text-white/80 font-normal">
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
              )} w-36 sm:w-44 lg:w-48 bg-gradient-to-b from-gray-800/90 to-black/95 backdrop-blur-sm border border-white/5 ${
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
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Background decorative image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('${traders[0].avatarUrl}')`,
            backgroundSize: "400px 200px",
            backgroundPosition: "center 20%",
            backgroundRepeat: "no-repeat",
            filter: "blur(40px) brightness(0.3)",
            transform: "scale(2)",
          }}
        />

        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/10 to-purple-500/5 blur-3xl rounded-3xl animate-pulse" />

        {/* Large blue glow effect at bottom */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[900px] h-72 opacity-30 blur-[75px]"
          style={{
            background:
              "radial-gradient(ellipse, #50D5FF 0%, rgba(80, 213, 255, 0.2) 40%, transparent 70%)",
          }}
        />

        {/* Main podium container */}
        <div className="relative flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 lg:gap-12">
          {/* Mobile: Stack vertically in rank order */}
          <div className="block sm:hidden space-y-8">
            <PodiumBox trader={first} position="center" />
            <PodiumBox trader={second} position="right" />
            <PodiumBox trader={third} position="left" />
          </div>

          {/* Desktop: Show in podium layout */}
          <div className="hidden sm:contents">
            <PodiumBox trader={third} position="left" />
            <PodiumBox trader={first} position="center" />
            <PodiumBox trader={second} position="right" />
          </div>
        </div>

        {/* Subtle overlay pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    );
  },
);

PodiumLeaderboard.displayName = "PodiumLeaderboard";

export default PodiumLeaderboard;
