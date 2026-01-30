"use client";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <article className="bg-dark-light border border-dark-softer rounded-2xl overflow-hidden transition-all duration-300 hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] h-full w-full flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-dark-softer to-dark-light">
        <img
          src={project.banner}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-text-heading mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-[13px] text-text-muted mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-1 text-xs rounded-md bg-dark-softer text-text-base">
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span
              className="relative group/tooltip px-2 py-1 text-xs rounded-md bg-dark-softer text-text-base cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`Additional skills: ${project.skills.slice(3).join(', ')}`}
            >
              +{project.skills.length - 3}
              <span
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg bg-dark-softer border border-dark-softer text-text-base whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 focus-within:opacity-100 transition-opacity duration-200 z-10"
                role="tooltip"
              >
                {project.skills.slice(3).join(', ')}
              </span>
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 border-t border-dark-softer pt-4 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neon-blue hover:text-neon-purple transition-colors"
              aria-label={`View live site for ${project.title} (opens in new tab)`}
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs sm:text-sm">Live Site</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text-base transition-colors"
              aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs sm:text-sm">Code</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
