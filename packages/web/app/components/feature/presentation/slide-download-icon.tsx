import { Download } from "lucide-react";
import { downloadPresentation } from "@web/lib/fetch";

export function SlideDownloadIcon({
  presentation,
}: {
  presentation: {
    id: string;
    name: string;
    fileNames: string[];
  };
}) {
  function download() {
    Promise.all(
      presentation.fileNames.map(async (fileName) => ({
        fileName,
        blob: await downloadPresentation({
          presentationId: presentation.id,
          fileName,
        }),
      }))
    ).then((res) => {
      for (const r of res) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(r.blob);
        a.download = r.fileName;
        a.click();
      }
    });
  }

  return <Download onClick={() => download()} />;
}
