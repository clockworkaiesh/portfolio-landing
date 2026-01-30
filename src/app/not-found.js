"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-dark flex flex-col items-center justify-center">
      <div className="w-64 h-64">
        <DotLottieReact
          src="https://lottie.host/30ac7b36-685e-422a-a3fb-dcd357ca2bb6/wSAI9IvqqI.lottie"
          loop
          autoplay
        />
      </div>

      <h1 className="text-text-heading text-2xl font-medium mt-6">
        Page not found
      </h1>
      <p className="text-text-secondary text-sm mt-2 mb-8">
        The page you're looking for doesn't exist.
      </p>

      <PrimaryButton text="Go Home" onClick={() => router.push("/")} />
    </div>
  );
}
