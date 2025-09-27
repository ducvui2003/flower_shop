// src/react-table.d.ts
import { ColumnMeta as BaseColumnMeta } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue>
    extends BaseColumnMeta<TData, TValue> {
    label?: string;
  }
}
