import {
  Detail,
  DetailList,
  DetailName,
  DetailValue,
} from "@web/components/ui/detail";

export function PresentationDetail({
  presentation,
}: {
  presentation: {
    id: string;
    name: string;
    fileNames: string[];
  };
}) {
  return (
    <Detail>
      <DetailList>
        <DetailName>ID</DetailName>
        <DetailValue>{presentation.id}</DetailValue>
      </DetailList>

      <DetailList>
        <DetailName>Name</DetailName>
        <DetailValue>{presentation.name}</DetailValue>
      </DetailList>
    </Detail>
  );
}
