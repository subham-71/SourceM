
import illustration1 from "../../assets/img.avif";
import illustration2 from "../../assets/img-3.jpg";
import illustration3 from "../../assets/img-2.avif";
import sourceCode from '../../assets/sourceCode.png'
import { useNavigate } from "react-router-dom";


export default function Overview() {
  const navigate = useNavigate();
  

  return (
    <>
    <nav>
        <div class=" flex flex-wrap items-center justify-between mx-2 p-4">
        <a class="flex items-center">
            <img src={sourceCode} class="bg-white mx-3 ml-1" alt="sourceM Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-black">sourceM</span>
        </a>
        <div class="flex justify-between md:order-last">
            <button type="button" class="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            onClick={()=>{navigate('/')}}>Back</button>
        </div>
        
        </div>
      </nav>  

    <div className="flex justify-center items-center">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-black">We  got you<span class="text-blue-600 dark:text-blue-500">r CODE</span> covered.</h1>

    </div>

<div class="w-full grid grid-cols-3 md:grid-cols-3 lg: grid-cols-3 gap-y-2" style={{marginTop : 1, padding : 100}}>

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={illustration2}/>
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Realtime Monitoring</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Gain invaluable insights into how your application's functions and methods are utilized by your clients in real-time. SourceM provides a comprehensive view of the usage patterns, allowing you to identify popular features, detect underutilized code segments, and understand user behavior. Armed with this information, you can make informed decisions to optimize your codebase and prioritize development efforts.</p>
        
    </div>
</div>

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={illustration1}/>
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bytecode Weaving</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">With sourceM, you can effortlessly measure crucial statistics without altering or interfering with the original source code. Our innovative bytecode weaving techniques enable seamless monitoring by injecting lightweight monitoring code at runtime. This non-intrusive approach ensures accurate data collection without impacting the application's performance or functionality.</p>
        
    </div>
</div>

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={illustration3}/>
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Interactive Data Analysis</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">SourceM offers a powerful interactive data analysis platform to unleash the full potential of your monitoring data. Visualize and explore usage patterns, drill down into specific code sections, and identify performance bottlenecks with ease. Our intuitive interface and a range of analytical tools empower you to uncover hidden insights, track trends, and make data-driven decisions to enhance the efficiency and user experience of your Java application.</p>
        
    </div>
</div>

</div>

   
    </>
  );
}
