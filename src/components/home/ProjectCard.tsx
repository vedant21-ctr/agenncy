import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/config/site";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block relative rounded-2xl bg-[#111115] border border-white/10 hover:border-[#3ddc84]/50 transition-colors duration-300 overflow-hidden"
    >
      {/* Visual Image Container with subtle scale */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Gradient shadow for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2">
            {project.isConcept && (
              <span className="rounded bg-black/80 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90">
                Concept Project
              </span>
            )}
            <span className="rounded bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-zinc-300">
              {project.type}
            </span>
          </div>

          <span className="rounded bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-zinc-400">
            {project.industry}
          </span>
        </div>

        {/* Sliding "View case study" pill on hover */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out z-10">
          <span className="flex items-center gap-1.5 rounded-full bg-[#3ddc84] px-3.5 py-1.5 text-xs font-mono font-bold text-black shadow-lg">
            <span>View case study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#3ddc84] font-semibold">{project.client}</span>
          <span className="text-zinc-500">{project.duration}</span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#3ddc84] transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
          {project.outcome}
        </p>

        {/* Tech Stack Pills */}
        <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-mono text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
