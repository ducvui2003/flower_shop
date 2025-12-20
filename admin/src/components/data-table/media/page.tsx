import { columns } from "@/components/data-table/media/columns";
import { DataTable } from "@/components/data-table/media/data-table";
import LoadingBoundary from "@/components/LoadingBoundary";
import Pagination from "@/components/Pagination";
import { useApi } from "@/hooks/use-api";
import httpService from "@/lib/http/http.service";
import { Page, ResponseApi } from "@/lib/http/http.type";
import useMediaStore from "@/store/media.store";
import { useState } from "react";

export type Media = {
  id: number;
  key: string;
  metadata: object;
  alt: string;
  provider: string | null;
  href: string;
};

const MediaDataTable = () => {
  const [page, setPage] = useState<number>(1);
  const { reload } = useMediaStore();
  const { data } = useApi(async () => {
    const res = await httpService.get<ResponseApi<Page<Media>>>(
      `/media?page=${page}`
    );
    return res.data.data;
  }, [page, reload]);
  return (
    <div>
      <LoadingBoundary data={data}>
        {(data) => {
          return (
            <>
              <div className="mb-20">
                <DataTable columns={columns} data={data.items} />
              </div>
              <div className="fixed left-1/2 -translate-x-1/2 bottom-1 border-2 p-2 rounded-xl">
                <Pagination
                  page={{
                    currentPage: data.currentPage,
                    totalItems: data.totalItems,
                    totalPages: data.totalPages,
                  }}
                  onPageChange={(page) => setPage(page)}
                />
              </div>
            </>
          );
        }}
      </LoadingBoundary>
    </div>
  );
};

export default MediaDataTable;
