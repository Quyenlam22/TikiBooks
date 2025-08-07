import { NavLink, Outlet } from "react-router-dom";
import "./LayoutClient.css";
import logo from "../../assets/react.svg";
import { useState } from "react";
import FooterComponent from "../../components/FooterComponent";


function LayoutClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto px-4 py-2">
        <header className="border border-gray-300 rounded-3xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <img className="h-auto max-w-full" src={logo} alt="image description" />

            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-xl">
                <li><NavLink className="link-underline font-medium text-gray-600 hover:text-gray-800" to="/">Home</NavLink></li>
                <li><NavLink className="link-underline font-medium text-gray-600 hover:text-gray-800" to="/book/:id">Book</NavLink></li>
                <li><NavLink className="link-underline font-medium text-gray-600 hover:text-gray-800" to="/contact">Contact</NavLink></li>
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex gap-3 text-xl">
                <a className="rounded-md bg-teal-600 px-4 py-2 text-white font-medium hover:bg-teal-700 transition" href="#">
                  Login
                </a>
                <a className="rounded-md bg-white px-4 py-2 text-teal-600 font-medium border border-teal-600 hover:bg-teal-50 transition" href="#">
                  Register
                </a>
              </div>

              <button
                className="md:hidden p-2 rounded bg-gray-200"
                onClick={() => setOpen(!open)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden transform transition-all duration-300 ease-out md:hidden ${open ? "max-h-[350px] opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
              }`}
          >
            <nav className="mt-4 px-2">
              <ul className="flex flex-col gap-2 text-xl text-center">
                <li><NavLink className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded" to="/">Home</NavLink></li>
                <li><NavLink className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded" to="/book/:id">Book</NavLink></li>
                <li><NavLink className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded" to="/contact">Contact</NavLink></li>
                <li className="sm:hidden text-center flex justify-center">
                  <a className="block px-4 py-2 text-teal-600 font-semibold hover:bg-teal-100 rounded bg-white border border-teal-600 mt-2" href="#">
                    Register
                  </a>
                </li>
                <li className="sm:hidden text-center flex justify-center">
                  <a className="block px-4 py-2 bg-teal-600 text-white font-semibold hover:bg-teal-700 rounded" href="#">
                    Login
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="main p-4 min-h-[60vh]">
          <Outlet />
        </main>



        <FooterComponent />
      </div>
    </>
  )
}

export default LayoutClient;