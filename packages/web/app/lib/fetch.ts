import useSWR from "swr";

const baseUrl = import.meta.env.VITE_API_URL;

function fetcher<T>(endpoint: string) {
  return fetch(endpoint).then((res) => res.json() as Promise<T>);
}

export function usePresentationsFetcher() {
  return useSWR<{
    presentations: { id: string; name: string; fileNames: string[] }[];
  }>(`${baseUrl}/presentations`, fetcher);
}

export function usePresentationFetcher({
  presentationId,
}: {
  presentationId: string;
}) {
  return useSWR<{ id: string; name: string; fileNames: string[] }>(
    `${baseUrl}/presentations/${presentationId}`,
    fetcher
  );
}

export function uploadSlides({
  presentationId,
  formData,
}: {
  presentationId: string;
  formData: FormData;
}) {
  return fetch(`${baseUrl}/presentations/${presentationId}/slides/upload`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

export function downloadPresentation({
  presentationId,
  fileName,
}: {
  presentationId: string;
  fileName: string;
}) {
  return fetch(
    `${baseUrl}/presentations/${presentationId}/download/${fileName}`
  ).then((response) => response.blob());
}
