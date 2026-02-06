import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { RWebShare } from "react-web-share";

interface RwebShareProps {
  url: string;
  title: string;
  text: string;
}

export const ShareButton = ({ url, title, text }: RwebShareProps) => {
  return (
    <RWebShare
      data={{
        url,
        title,
        text,
      }}
      onClick={() => console.log("shared successfully")}
    >
      <Button size={"sm"} variant={"outline"}>
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </RWebShare>
  );
};
