import { Button } from "@web/components/ui/button";
import { downloadPresentation } from "@web/lib/fetch";

export function PresentationDownloadButton({
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

  return <Button onClick={() => download()}>ダウンロード</Button>;
}
