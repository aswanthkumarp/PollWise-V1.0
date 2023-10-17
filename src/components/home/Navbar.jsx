import { useState } from "react";
import {close,menu,Pollwise} from "../../assets"
import { navLinks } from "../../constants";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const auth = useAuthContext();

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={Pollwise} alt="PollWise" className="w-[100px] h-[100px]" />
      

      <ul className="list-none sm:flex hidden justify-center items-center flex-1">
        {navLinks.map((nav, index) => {
     
          if (nav.title === "Login" || nav.title === "Register") {
            return null;
          }
          return (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-white" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          );
        })}
      </ul>

      <div className="sm:hidden flex flex-1 flex-row justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20  my-2 min-w-[340px] rounded-xl sidebar  bg-black`}
        >
          <ul className="list-none flex justify-center items-start flex-1 flex-col">
            {navLinks.map((nav, index) => {
              return (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              );
            })}
          </ul>
     { auth.user !==null?(<Link to='/dashboard' ><AccountCircleIcon color="primary" sx={{fontSize:40}}/></Link>) :(<div>
       <Link to='/login'>
        <button className="bg-transparent border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white py-2 px-4 rounded-full">
            Login
          </button>
        </Link>
         <Link to='/signup'>
         <button className="bg-cyan-600 text-white py-2 px-4 rounded-full ml-3">
            Register
          </button>
         </Link>
       </div>)}
        </div>
      </div>

      {/* Move buttons to the right end for large screens */}
    {auth.user !==null?(<Link to='/dashboard' ><AccountCircleIcon color="primary" sx={{fontSize:80}}/></Link>): ( <div className="hidden sm:flex flex-row items-center">
       <Link to='/login'>
       <button className="bg-transparent border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white py-2 px-4 rounded-full">
          Login
        </button>
       </Link>
      <Link to='/signup'>
       <button className="bg-cyan-600 text-white py-2 px-4 rounded-full ml-3">
          Register
        </button>
       </Link>
      </div>)}
    </nav>
  );
};

export default Navbar;
