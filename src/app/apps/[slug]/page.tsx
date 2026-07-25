import { notFound } from "next/navigation";
import { LayoutGrid, Monitor, Smartphone, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DownloadButton from "@/components/DownloadButton";
import type { App } from "@/lib/types";

const platformIcons = { web: Globe, android: Smartphone, desktop: Monitor };

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: app } = await supabase
    .from("apps")
    .select("*, categories(id, name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!app) notFound();

  const typedApp = app as App;

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-text-muted overflow-hidden">
          {typedApp.icon_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={typedApp.icon_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <LayoutGrid size={28} />
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl font-700">{typedApp.name}</h1>
          {typedApp.tagline && (
            <p className="mt-1 text-text-muted">{typedApp.tagline}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
            <span>v{typedApp.version}</span>
            {typedApp.size_label && <span>{typedApp.size_label}</span>}
            <span>{typedApp.downloads_count.toLocaleString()} downloads</span>
            {typedApp.categories?.name && <span>{typedApp.categories.name}</span>}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <DownloadButton appId={typedApp.id} externalLink={typedApp.external_link} />
        <div className="flex items-center gap-3 text-text-muted">
          {typedApp.platforms.map((p) => {
            const Icon = platformIcons[p] ?? Globe;
            return (
              <span key={p} className="flex items-center gap-1 text-xs font-mono capitalize">
                <Icon size={14} /> {p}
              </span>
            );
          })}
        </div>
      </div>

      {typedApp.screenshots?.length > 0 && (
        <div className="mt-12 flex gap-4 overflow-x-auto pb-2">
          {typedApp.screenshots.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${typedApp.name} screenshot ${i + 1}`}
              className="aurora-border h-64 shrink-0 rounded-xl bg-surface object-cover"
            />
          ))}
        </div>
      )}

      {typedApp.description && (
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-lg font-600">About this app</h2>
          <p className="mt-3 whitespace-pre-line text-text-muted">
            {typedApp.description}
          </p>
        </div>
      )}
    </div>
  );
}
