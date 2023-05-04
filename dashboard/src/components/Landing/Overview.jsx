import {
  Container,
  Image_,
  Para_,
  Wrap_,
  Text_,
} from "./styled";

import imagem from "../../assets/landing.svg";
import sourceCode from '../../assets/sourceCode.png'
import { useNavigate } from "react-router-dom";


export default function Overview() {
  const navigate = useNavigate();
  
  function Signup() {    
    navigate("/signup");
  }
  
  function Login() {
    navigate("/login");
  }
  return (
    <>
    <nav>
        <div class=" flex flex-wrap items-center justify-between mx-2 p-4">
        <a class="flex items-center">
            <img src={sourceCode} class="bg-white mx-3 ml-1" alt="sourceM Logo" />
        </a>
        <div class="flex justify-between md:order-last">
            <button type="button" class="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            onClick={()=>{navigate('/about')}}>About</button>
        </div>
        
        </div>
      </nav>
    
    <Container>
      <Wrap_>
        <Text_>
            
          
          <h1 class="mb-4 text-7xl font-extrabold leading-none tracking-tight text-gray-900 md:text-7xl lg:text-7xl text-black">Source<span class="text-blue-600 dark:text-blue-500">M</span></h1>
          <Para_>
            With SourceM, you have the ultimate toolkit for Java development. Whether you're a seasoned developer, a code optimization enthusiast, or someone seeking to improve the efficiency of your applications, this product has got you covered. Unlock the full potential of your code, streamline your development process, and deliver exceptional results with SourceM. Get ready to revolutionize the way you develop Java applications!
</Para_>

          <div class="flex flex-row">
            <button type="button" class="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            onClick={()=>Signup()}>Signup</button>

            <button type="button" class="text-black text-xl ml-3 bg-white-700 hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 "
            onClick={()=>Login()}>Login</button>
    
          </div>
        </Text_>
        <Image_>
          <img src={imagem} alt="bookmark" />
        </Image_>
      </Wrap_>
    </Container>
    </>
  );
}
