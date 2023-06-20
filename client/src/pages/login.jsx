import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function login() {
  const router = useRouter();
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user: { displayName: name, email, photoURL: profileImage } } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log("🚀 ~ file: login.jsx:17 ~ handleLogin ~ {data}:", { data }) 
        if(!data.status) {
          router.push("/onboarding");
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: login.jsx:15 ~ handleLogin ~ error:", error)
    }
    // console.log("🚀 ~ file: login.jsx:12 ~ handleLogin ~ { user }:", { user })
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 bg-panel-header-background">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="Whatsapp" height={300} width={300} />
        <span className="text-7xl">
          WhatsApp
        </span>
      </div>
      <button className="flex items-center justify-center p-5 gap-7 bg-search-input-container-background rounded-xl" onClick={handleLogin}>
        <FcGoogle className="text-4xl" />
        <span className="text-2xl text-white">
          Login with Google
        </span>
      </button>
    </div>
  );
}

export default login;
