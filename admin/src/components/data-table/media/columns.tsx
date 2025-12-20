import { Media } from "@/components/data-table/media/page";
import DialogDeleteMedia from "@/components/dialog/dialog-delete-media";
import DialogUpdateMedia from "@/components/dialog/dialog-update-media";
import envConfig from "@/config/env.config";
import { ColumnDef } from "@tanstack/react-table";

export const createUrl = (key: string) => {
  return `${envConfig.R2_PUBLIC_DOMAIN}/${key}`;
};

export const columns: ColumnDef<Media>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 10,
  },
  {
    accessorKey: "href",
    header: "",
    cell: ({ row }) => {
      const url: string = row.getValue("href");
      return (
        <div className="h-[100px] w-full flex items-center justify-center bg-gray-200">
          <img className="max-w-full max-h-full object-contain " src={url} />
        </div>
      );
    },
  },
  {
    accessorKey: "alt",
    header: "Alt text",
  },
  {
    accessorKey: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const data: string = row.getValue("metadata");
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    },
  },
  {
    header: "Edit",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <DialogUpdateMedia />
          <DialogDeleteMedia id={row.getValue("id")} />
        </div>
      );
    },
  },
];
