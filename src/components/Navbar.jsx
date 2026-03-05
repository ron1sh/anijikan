import { Link,NavLink } from "react-router-dom";


export default function Navbar(){
    return(
        <div className="flex flex-row list-none mt-[4.5rem] gap-[2rem] justify-center">
            <NavLink to="/anime"  className={({isActive})=>
                `transition-all duration-200 cursor-pointer text-[1rem] sm:text-base md:text-[1.3rem] lg:text-[1.4rem] ${isActive ?"text-red-600 font-bold scale-[1.2] hover:scale-[1.25]":"text-white hover:scale-[1.2]"}`
            }>Anime</NavLink>
            <NavLink to="/manga" className={({isActive})=>
                `transition-all duration-200 cursor-pointer text-[1rem] sm:text-base md:text-[1.3rem] lg:text-[1.4rem] ${isActive ?"text-red-600 font-bold scale-[1.2] hover:scale-[1.25]":"text-white hover:scale-[1.2]"}`
            }>Manga</NavLink>
        </div>
        );
}