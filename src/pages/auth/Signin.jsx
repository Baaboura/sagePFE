import React, { useState } from "react";
import { useAuth } from "../../hooks/auth";
const Signin = () => {
  const { SignIn } = useAuth()

  const [isLoad, setIsLoad] = useState(false)
  const handleSignIn =async (e) => {
    e.preventDefault();
    if(isLoad) return
    setIsLoad(true)
    await SignIn()
    setIsLoad(false)
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="border rounded bg-gray-100 p-5">
        <div className="flex justify-center">
          <img src="/assets/img/logo1.png" alt="" className="w-52" />
        </div>
        {
          isLoad ?
            <div>
              Just a sec ...
            </div>
            : <div className="mt-8">
              <form className="flex flex-col gap-3 w-80" onSubmit={handleSignIn}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-bold">adresse email:</label>
                  <input
                    type="text"
                    className="px-3 py-2 border-2 border-gray-400 rounded-lg"
                    id="email"
                    placeholder="exemple@gmail.com"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-xs font-bold"> Mot de passe:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="px-3 py-2 border-2 border-gray-400 rounded-lg"
                    placeholder="mot de passe"
                    autoComplete="off"
                    required
                  />
                </div>
                <button type="submit" className="p-4 bg-blue-600 font-bold uppercase text-white text-sm rounded-lg mt-3"> Sign in </button>
              </form>
            </div>
        }

      </div>
    </div>
  );
};

export default Signin;
