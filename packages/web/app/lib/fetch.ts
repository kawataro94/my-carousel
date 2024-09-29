import useSWR from "swr";
import { cors } from "hono/cors";

const baseUrl = import.meta.env.VITE_API_URL;

function fetcher<T>(endpoint: string) {
  return fetch(endpoint).then((res) => res.json() as Promise<T>);
}

export function useSlidesFetcher() {
  return useSWR<{
    slides: { id: string; name: string; fileNames: string[] }[];
  }>(`${baseUrl}/slides`, fetcher);
}

export function useSlideFetcher({ slideId }: { slideId: string }) {
  return useSWR<{ id: string; name: string; fileNames: string[] }>(
    `${baseUrl}/slides/${slideId}`,
    fetcher
  );
}

export function downloadSlide({
  slideId,
  fileName,
}: {
  slideId: string;
  fileName: string;
}) {
  return fetch(`${baseUrl}/slides/${slideId}/download/${fileName}`).then(
    (response) => response.blob()
  );
}
