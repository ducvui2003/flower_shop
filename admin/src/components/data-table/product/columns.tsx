import { Product } from "@/components/data-table/product/type";
import DialogDeleteProduct from "@/components/dialog/dialog-delete-product";
import { NavLink } from "@/components/nav-link/NavLink";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 10,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "priceSale",
    header: "Sale Price",
  },
  {
    accessorKey: "createdAt",
    header: "Create",
    cell: ({ cell }) => {
      const date = cell.getValue<Date | undefined>();
      if (date) return formatDate(date, "LONG");
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Update",
    cell: ({ cell }) => {
      const date = cell.getValue<Date | undefined>();
      if (date) return formatDate(date, "LONG");
    },
  },
  {
    id: "actions",
    size: 10,
    enableHiding: true,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id.toString())
              }
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <NavLink to={`/product/update/${product.id.toString()}`}>
              <DropdownMenuItem>
                <Pencil />
                Edit
              </DropdownMenuItem>
            </NavLink>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DialogDeleteProduct id={product.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
