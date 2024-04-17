import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export const content = ["./**/*.{html,js}"];
export const theme = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    12: "48px",
    14: "56px",
    17: "68px",
    24: "96px",
    28: "112px",
    45: "180px",
    48: "192px",
    60: "240px",
    90: "340px"
  },
  colors: {
    White: "#ffffff",
    Black: "#000000",
    Gray: {
      25: "#fcfcfd",
      50: "#f9fafb",
      100: "#f2f4f7",
      200: "#eaecf0",
      300: "#d0d5dd",
      400: "#98a2b3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1d2939",
      900: "#101828",
    },
    Brand: {
      25: "#d6eee0",
      50: "#c2e5d0",
      100: "#adddc1",
      200: "#84cca2",
      300: "#5bba83",
      400: "#419c67",
      500: "#347c52",
      600: "#275d3d",
      700: "#1a3e29",
      800: "#0d1f14",
      900: "#060f0a",
    },
    Error: {
      25: "#fffbfa",
      50: "#fef3f2",
      100: "#fee4e2",
      200: "#fecdca",
      300: "#fda29b",
      400: "#f97066",
      500: "#f04438",
      600: "#d92d20",
      700: "#b42318",
      800: "#912018",
      900: "#7a271a",
    },
    Warning: {
      25: "#fffcf5",
      50: "#fffaeb",
      100: "#fef0c7",
      200: "#fedf89",
      300: "#fec84b",
      400: "#fdb022",
      500: "#f79009",
      600: "#dc6803",
      700: "#b54708",
      800: "#93370d",
      900: "#7a2e0e",
    },
    Success: {
      25: "#f6fef9",
      50: "#ecfdf3",
      100: "#d1fadf",
      200: "#a6f4c5",
      300: "#6ce9a6",
      400: "#32d583",
      500: "#12b76a",
      600: "#039855",
      700: "#027a48",
      800: "#05603a",
      900: "#054f31",
    },
    "Electric blue": {
      25: "#ddeff8",
      50: "#cce7f5",
      100: "#bbdff2",
      200: "#99cfeb",
      300: "#77c0e4",
      400: "#55b0dd",
      500: "#2896cc",
      600: "#1e7099",
      700: "#144b66",
      800: "#0a2533",
      900: "#05131a",
    },
    "Blue--dark": {
      25: "#edf5f9",
      50: "#dbecf4",
      100: "#b8d8e8",
      200: "#94c5dd",
      300: "#70b1d2",
      400: "#4e9ec7",
      500: "#3581a7",
      600: "#28617e",
      700: "#1a4154",
      800: "#0d202a",
      900: "#071015",
    },
    Blue: {
      25: "#f5faff",
      50: "#e5f4fc",
      100: "#caeafa",
      200: "#60c0ef",
      300: "#2babea",
      400: "#148cc8",
      500: "#1070a0",
      600: "#0c5478",
      700: "#083850",
      800: "#041c28",
      900: "#194185",
    },
    Purple: {
      25: "#f5e6f6",
      50: "#ecceee",
      100: "#d89ddd",
      200: "#c56ccb",
      300: "#ad40b5",
      400: "#7e2e84",
      500: "#65256a",
      600: "#4c1c4f",
      700: "#331335",
      800: "#19091a",
      900: "#0d050d",
    },
    Yellow: {
      25: "#fdfcf2",
      50: "#fbf8e4",
      100: "#f7f1c9",
      200: "#f4eaaf",
      300: "#f0e394",
      400: "#ecdd79",
      500: "#e3cd3b",
      600: "#bba61b",
      700: "#7d6f12",
      800: "#3e3709",
      900: "#1f1c04",
    },
  },
  fontSize: {
    xs: "0.75rem", //12px
    sm: "0.875rem", //14px
    base: "1rem", //16px
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
  },
  fontFamily: {
    karla: "Karla",
    "noto-sans-mono": "Noto Sans Mono",
  },
  extend: {
    aspectRatio: {
      '1/2': '1 / 2',
      '2/1': '2 / 1',
      '2/3': '2 / 3',
      '3/2': '3 / 2',
      '4/3': '4 / 3',
      '16/9': '16 / 9'
    }
  },
};
export const plugins = [
  plugin(function ({ addBase, theme }) {
    addBase({
      h1: { fontFamily: theme("fontFamily.karla") },
      h2: { 
            fontFamily: theme("fontFamily.karla"),
            fontSize: theme("fontSize[5xl]")
          },
      h3: { fontFamily: theme("fontFamily.karla") },
      h4: { fontFamily: theme("fontFamily.karla") },
      h5: { fontFamily: theme("fontFamily.karla") },
      p: { fontFamily: theme("fontFamily.noto-sans-mono") },
    });
  }),
];