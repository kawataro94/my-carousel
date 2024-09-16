import {
  Detail,
  DetailList,
  DetailName,
  DetailValue,
} from "@web/components/ui/detail";
import { useSlide } from "@web/lib/swr";

export function SlideDetail({ slideId }: { slideId: string }) {
  const { data: slide, error, isLoading } = useSlide({ slideId });

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  if (slide == null || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Detail>
      <DetailList>
        <DetailName>ID</DetailName>
        <DetailValue>{slide.id}</DetailValue>
      </DetailList>

      <DetailList>
        <DetailName>Name</DetailName>
        <DetailValue>{slide.name}</DetailValue>
      </DetailList>
    </Detail>
  );
}
