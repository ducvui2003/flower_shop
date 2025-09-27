'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetRevenueByTimeAndCategoryQuery } from '@/features/manager/dashboard/dashboard.api';
import { useCallback, useMemo, useState } from 'react';
import {
  RevenueByTimeAndCategoryRequestType,
  RevenueByTimeAndCategoryResponseType,
} from '@/types/dashboard.type';
import { currency } from '@/lib/utils';
import LoadingBoundary from '@/components/LoadingBoundary';
import { Skeleton } from '@/components/ui/skeleton';
import { DatePickerMonthYear } from '@/components/ui/date-picker';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutRevenueCategory = () => {
  const [req, setReq] = useState<RevenueByTimeAndCategoryRequestType>({
    month: 5,
    year: 2025,
  });
  const { data, isLoading } = useGetRevenueByTimeAndCategoryQuery(req, {
    skip: !req.month || !req.year,
  });

  const options = useMemo(() => {
    return {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${currency(value)}`;
            },
          },
        },
      },
    };
  }, []);

  const renderChartConfig = useCallback(
    (data: RevenueByTimeAndCategoryResponseType) => {
      return {
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: 'Doanh thu',
            data: data.map((item) => item.revenue),
            backgroundColor: [
              '#36A2EB',
              '#FF6384',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    [],
  );
  return (
    <section>
      <h3 className="text-center">Doanh theo thể loại</h3>
      <div className="mt-3 flex justify-center gap-3">
        <DatePickerMonthYear
          date={{
            month: req.month,
            year: req.year,
          }}
          setDate={(date) => {
            setReq({
              month: date.month,
              year: date.year,
            });
          }}
        />
      </div>
      <div className="mt-3 grid w-full place-items-center rounded-xl">
        <LoadingBoundary<RevenueByTimeAndCategoryResponseType>
          data={data}
          loading={<Skeleton className="h-96 w-96" />}
          isLoading={isLoading}
          fallback={
            <div className="bg-primary grid h-full w-full place-items-center">
              Không có dữ liệu
            </div>
          }
        >
          {(data) => {
            return (
              <Doughnut data={renderChartConfig(data)} options={options} />
            );
          }}
        </LoadingBoundary>
      </div>
    </section>
  );
};

export default DoughnutRevenueCategory;
