"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WorkCard({ item }) {
  return (
    <motion.article 
      className="bg-dark-light border border-dark-softer rounded-2xl overflow-hidden h-full flex flex-col"
      whileHover={{ scale: 1.02, borderColor: "rgba(0, 240, 255, 0.3)", boxShadow: "0 0 30px rgba(0, 240, 255, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold text-text-heading mb-3">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-text-muted leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}
