"use client";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-dark-default flex flex-col items-center justify-center">
      <div className="size-[350px]">
        <Image
          src="/404.webp"
          alt="404 Not Found Illustration"
          width={350}
          height={350}
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-text-heading text-2xl font-medium mt-6">
        Page not found
      </h1>
      <p className="text-text-secondary text-sm mt-2 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <PrimaryButton text="Go Home" onClick={() => router.push("/")} />
    </div>
  );
}
