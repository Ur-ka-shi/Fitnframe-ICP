import React from "react";
import { IdentityKit, IdentityKitAuthType, InternetIdentity } from "@nfid/identitykit";

const Login = () => {
  const handleLogin = async () => {
    const idkit = new IdentityKit({
      providers: [InternetIdentity],
      authType: IdentityKitAuthType.Login,
    });

    const identity = await idkit.login();
    console.log("User identity:", identity);
    // TODO: Save identity in context for use in your app
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to FitnFrame</h1>
      <button
        onClick={handleLogin}
        className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700"
      >
        Login with Internet Identity
      </button>
    </div>
  );
};

export default Login;
