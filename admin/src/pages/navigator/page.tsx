import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useApi } from "@/hooks/use-api";
import httpService from "@/lib/http/http.service";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

interface NavigatorItem {
  title: string;
  href: string;
  child?: NavigatorItem[];
}

interface NavigatorResponse {
  code: number;
  message: string;
  data: NavigatorItem[];
  error: null | string;
  isSuccess: boolean;
  time: string;
  url: string;
}

const NavigatorsPage = () => {
  const { data } = useApi(
    () =>
      httpService
        .get<NavigatorResponse>("/page/navigate")
        .then((res) => res.data),
    [],
  );
  const renderItem = (item: NavigatorItem) => {
    if ((item.child?.length ?? 0) > 0) {
      return (
        <Collapsible key={item.title}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="group hover:bg-accent hover:text-accent-foreground w-full justify-start transition-none"
            >
              <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
              <FolderIcon />
              {item.title}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="style-lyra:ml-4 mt-1 ml-5">
            <div className="flex flex-col gap-1">
              {item.child?.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }
    return (
      <Button
        key={item.title}
        variant="link"
        size="sm"
        className="text-foreground w-full justify-start gap-2"
      >
        <div className="ml-4"></div>
        <FileIcon />
        <span>{item.title}</span>
      </Button>
    );
  };
  return (
    <div className="p-2 w-full gap-2">
      <h2 className="text-2xl font-bold">Navigators</h2>
      <Separator className="my-2" />
      <div>
        <div className="flex flex-col gap-1">
          {data?.data.map((item) => renderItem(item))}
        </div>
      </div>
    </div>
  );
};

export default NavigatorsPage;
