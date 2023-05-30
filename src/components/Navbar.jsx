import { Link, useLocation } from "wouter";
import { useAuthStore } from "../store/auth";
import logo from "../assets/logo.svg";

import supabase from "../../supabaseClient";

export default function Navbar() {
  const storeUser = useAuthStore((state) => state.user);
  const storeSignOut = useAuthStore((state) => state.signOut);
  const [location, setLocation] = useLocation();

  const signOut = async () => {
    await supabase.auth.signOut().then(() => {
      storeSignOut();
      setLocation("/sign-in");
    });
  };

  return (
    <nav className="flex items-center px-3 bg-white border-b w-full h-20 justify-between">
      <div>
        <Link href="/">
          <div className="flex gap-3 items-center cursor-pointer">
            <img src={logo} className="h-9" alt="logo" />
            <p className="text-xl font-bold font-recoleta">Tranqui</p>
          </div>
        </Link>
      </div>
      <div>
        <ul className="flex gap-4 items-center">
          {storeUser ? (
            <>
              <li>
                <Link href="sign-up" onClick={() => signOut()}>
                  <button className="rounded-full hover:ring-4 block px-4 py-3 w-full bg-black hover:bg-gray-700 text-white">Cerrar sesión</button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="sign-in">
                  <button className="rounded-full px-3 py-3 bg-white hover:bg-gray-300 hover:ring-4 transition-all">Iniciar sesión</button>
                </Link>
              </li>
              <li>
                <Link href="sign-up">
                  <button className="rounded-full px-4 py-3 bg-blue-600 hover:bg-blue-800 hover:ring-4 text-white transition-all">Registrarme</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
