"use client";

export default function WorkCard({ item }) {
  return (
    <article className="bg-dark-light border border-dark-softer rounded-2xl overflow-hidden transition-all duration-300 hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] flex flex-col">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
          loading="lazy"
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
    </article>
  );
}
