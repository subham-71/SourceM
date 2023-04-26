import { Container } from "./styled";
import About from "./index"
import { GlobalStyles } from "./GlobalStyles";
import { ThemeProvider } from "styled-components";

const tema = {
  White: "#FFFFFF",
  Red: "hsl(0, 94%, 66%)",
  Blue: "hsl(231, 69%, 60%)",
  Grayish: "hsl(229, 8%, 60%)",
  Dark: "hsl(229, 31%, 21%)",
Green: "#3DD73C",
GreenDark: "#006501",
 
}

export default function Landing() {
  return (
    <>
      <ThemeProvider theme={tema}>
        <About/>
      </ThemeProvider>
    </>
  );
}