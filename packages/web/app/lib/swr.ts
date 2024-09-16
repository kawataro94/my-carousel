import useSWR from "swr";

const baseUrl = import.meta.env.VITE_API_URL;

function fetcher<T>(endpoint: string) {
  return fetch(endpoint).then((res) => res.json() as Promise<T>);
}

export function useSlides() {
  return useSWR<{ slides: { id: string; name: string }[] }>(
    `${baseUrl}/slides`,
    fetcher
  );
}

export function useSlide({ slideId }: { slideId: string }) {
  return useSWR<{ id: string; name: string }>(
    `${baseUrl}/slides/${slideId}`,
    fetcher
  );
}
