import {
  Detail,
  DetailList,
  DetailName,
  DetailValue,
} from "@web/components/ui/detail";

export function SlideDetail({
  slide,
}: {
  slide: {
    id: string;
    name: string;
    fileNames: string[];
  };
}) {
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
