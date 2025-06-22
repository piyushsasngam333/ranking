# PodiumLeaderboard Component

A stunning 3D podium leaderboard component that displays the top 3 traders with glassmorphism effects, animated glows, and responsive design.

## Features

- 🏆 **3D Podium Design**: Realistic 3D geometric shapes with depth and perspective
- ✨ **Rank-based Styling**: Gold, silver, and bronze color schemes with matching glows
- 🌟 **Glassmorphism Effects**: Modern glass-like appearance with backdrop blur
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop views
- 🎨 **Animated Elements**: Hover effects and subtle animations
- ⚡ **TypeScript Ready**: Full type safety with interface definitions

## Usage

```tsx
import PodiumLeaderboard, { TraderData } from "@/components/PodiumLeaderboard";

const topTraders: [TraderData, TraderData, TraderData] = [
  {
    name: "Alex Thompson",
    avatarUrl: "https://example.com/avatar1.jpg",
    profit: 212000,
    growth: 66,
    rank: 1,
  },
  {
    name: "Sarah Chen",
    avatarUrl: "https://example.com/avatar2.jpg",
    profit: 189000,
    growth: 58,
    rank: 2,
  },
  {
    name: "Marcus Johnson",
    avatarUrl: "https://example.com/avatar3.jpg",
    profit: 165000,
    growth: 52,
    rank: 3,
  },
];

<PodiumLeaderboard traders={topTraders} />;
```

## Props

### `PodiumLeaderboardProps`

| Prop      | Type                                   | Description                             |
| --------- | -------------------------------------- | --------------------------------------- |
| `traders` | `[TraderData, TraderData, TraderData]` | Exactly 3 trader objects for the podium |

### `TraderData`

| Property    | Type          | Description                               |
| ----------- | ------------- | ----------------------------------------- |
| `name`      | `string`      | Full name of the trader                   |
| `avatarUrl` | `string`      | URL to the trader's profile image         |
| `profit`    | `number`      | Total profit amount in dollars            |
| `growth`    | `number`      | Growth percentage                         |
| `rank`      | `1 \| 2 \| 3` | Position on the podium (1st, 2nd, or 3rd) |

## Responsive Behavior

- **Mobile**: Stacks vertically in rank order (1st, 2nd, 3rd)
- **Tablet & Desktop**: Traditional podium layout (3rd, 1st, 2nd from left to right)

## Styling

The component uses Tailwind CSS with custom gradients and effects:

- **1st Place**: Gold theme (`yellow-400` variants)
- **2nd Place**: Silver theme (`gray-300` variants)
- **3rd Place**: Bronze theme (`orange-400` variants)

All styling is inline with Tailwind classes for maximum portability and customization.

## Requirements

- React 18+
- Tailwind CSS 3+
- The component expects a dark background for optimal visual appearance
