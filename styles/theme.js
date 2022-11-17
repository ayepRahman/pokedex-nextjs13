/**
 * @dev - explicitly name as a .js extension to be use in tailwind.config.js
 */

const theme = {
  container: {
    // you can configure the container to be centered
    center: true,
    padding: "1rem",
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1888px",
    },
  },
  colors: {
    white: "#FFFFFF",
    transparent: "transparent",
    twitter: "#1DA1F2",
    discord: "#5865F2",
    background: "#E5E5E5",
    neutral: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293B",
      900: "#0f172A",
    },
    primary: {
      50: "#CDC8FF",
      100: "#e6e9f9",
      200: "#d1d6f4",
      300: "#A098DF",
      400: "#9699e3",
      500: "#746ACB",
      600: "#746acb",
      700: "#4F46A5",
      800: "#4c458e",
      900: "#1f1860",
    },
    primary2: {
      50: "#EEEAFF",
      300: "#D6CDF9",
      500: "#A897EC",
      700: "#7F67E1",
      900: "#5B3ED6",
    },
    primary3: {
      50: "#F0E1FF",
      300: "#DBB9FF",
      500: "#BF83FF",
      700: "#B166FF",
      900: "#922DFC",
    },
    primary4: {
      50: "#B4FFFB",
      300: "#76F6EF",
      500: "#12DED2",
      700: "#12BCB2",
      900: "#10958D",
    },
    secondary: {
      50: "#FFF9D8",
      300: "#FBF0B5",
      500: "#F6E171",
      700: "#E9D04F",
      900: "#DCBD1C",
    },
    success: {
      50: "#E5FBD1",
      300: "#C5E8A6",
      500: "#87BA65",
      700: "#269365",
      900: "#064e3b",
    },
    warning: {
      50: "#FFE4BC",
      300: "#FDC46E",
      500: "#EB9E58",
      700: "#DE6F0E",
      900: "#B75A0A",
    },
    error: {
      50: "#FFC0C0",
      300: "#FF8888",
      500: "#EB4343",
      700: "#BD1A1A",
      900: "#8B0A0A",
    },
    gradient: {
      purple:
        "linear-gradient(134.14deg, #766BF2 40.76%, #5944D7 55.74%, #613FE9 85.26%)",
    },
  },
  boxShadow: {
    xs: "0px 1px 2px -1px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.1)",
    sm: " 0px 4px 6px -1px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.1)",
    md: "0px 4px 6px -4px rgba(16, 24, 40, 0.1), 0px 10px 15px -3px rgba(16, 24, 40, 0.1)",
    lg: "0px 8px 10px -6px rgba(16, 24, 40, 0.1), 0px 20px 25px -5px rgba(16, 24, 40, 0.1)",
    xl: "0px 25px 50px -12px rgba(16, 24, 40, 0.1)",
  },
  fontFamily: {
    dmsans: ["DM Sans", "sans-serif"],
    montserrat: ["Montserrat", "sans-serif"],
  },
  blur: {
    sm: "8px",
    md: "16px",
    lg: "24px",
  },
};

module.exports = { theme };
