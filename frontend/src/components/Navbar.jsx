import { Link, useNavigate } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { getToken, logout } from "../lib/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = getToken();

  const handleLogout = () => {
    logout(); // Clear token from localStorage
    navigate("/login");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight">
            Outline
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/create" className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-error">
                  <LogOutIcon className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-primary">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/*
import {Link} from "react-router";
import {PlusIcon} from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
                    Outline
                </h1>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-5"/>
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Navbar;
*/