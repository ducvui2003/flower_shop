import { columns } from "@/components/data-table/product/columns";
import { DataTable } from "@/components/data-table/product/data-table";
import { Product } from "@/components/data-table/product/type";
import LoadingBoundary from "@/components/LoadingBoundary";
import Pagination from "@/components/Pagination";
import { useApi } from "@/hooks/use-api";
import httpService from "@/lib/http/http.service";
import { Page, ResponseApi } from "@/lib/http/http.type";
import { useState } from "react";

const ProductDataTable = () => {
  const [page, setPage] = useState<number>(1);
  const { data } = useApi(async () => {
    const res = await httpService.get<ResponseApi<Page<Product>>>(
      `/product?page=${page}`
    );
    return res.data.data;
  }, [page]);
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

export default ProductDataTable;
