import { Button } from "@web/components/ui/button";
import { downloadSlide } from "@web/lib/fetch";

export function SlideDownloadButton({
  slide,
}: {
  slide: {
    id: string;
    name: string;
    fileNames: string[];
  };
}) {
  function download() {
    Promise.all(
      slide.fileNames.map(async (fileName) => ({
        fileName,
        blob: await downloadSlide({ slideId: slide.id, fileName }),
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
