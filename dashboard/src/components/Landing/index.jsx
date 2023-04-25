import {
  Links,
  Container,
  Signup_,
  Login_,
  ColunaImagem,
  Para_,
  Title_,
  Wrap_,
  Text_,
} from "./styled";
import imagem from "../../assets/landing.svg";
import { useNavigate } from "react-router-dom";



export default function About() {
  const navigate = useNavigate();
  
  function Signup() {    
    navigate("/signup");
  }
  
  function Login() {
    navigate("/login");
  }
  return (
    <>
    
    <Container>
      <Wrap_>
        <Text_>
            
          <Title_>SourceM</Title_>
          <Para_>Our platform is designed to provide developers, project managers, and software teams with the necessary tools to monitor their source code efficiently. As a developer, it's crucial to ensure that your code is clean, efficient, and secure. Our platform helps you achieve this by monitoring your source code and providing you with real-time insights and feedback.

</Para_>
          <Links>
            <Signup_ onClick={()=> Signup()}>
              Signup  
            </Signup_>

            <Login_ onClick={()=> Login()} >
              Login
            </Login_>
    
          </Links>
        </Text_>
        <ColunaImagem>
          <img src={imagem} alt="bookmark" />
        </ColunaImagem>
      </Wrap_>
    </Container>
    </>
  );
}
