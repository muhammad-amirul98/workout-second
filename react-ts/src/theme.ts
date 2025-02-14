import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     teal: {
//       main: "#008080", // Main teal color
//       light: "#4db6ac", // Light teal color
//       dark: "#004d40", // Dark teal color
//       contrastText: "#ffffff", // Text color on teal background
//     },
//   },
// });

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008080",
    },
    secondary: {
      main: "#EAF0F1",
    },
  },
});

export default theme;
