import ButtonUploadFile from "@/components/ButtonUploadFile";
import MediaDataTable from "@/components/data-table/media/page";
import { Button } from "@/components/ui/button";
import useMediaStore from "@/store/media.store";
import { RefreshCcw } from "lucide-react";

const MediaPage = () => {
  const { updateReload } = useMediaStore();
  return (
    <div className="p-5">
      <div className="mb-5 flex ">
        <h2 className="text-2xl font-bold">Media</h2>

        <div className="ml-auto">
          <Button className="mr-3" onClick={() => updateReload()}>
            <RefreshCcw />
          </Button>
          <ButtonUploadFile />
        </div>
      </div>
      <MediaDataTable />
    </div>
  );
};

export default MediaPage;
