'use client';

import LoadingBoundary from '@/components/LoadingBoundary';
import {
  DatePickerMonthYear,
  DatePickerWithRange,
} from '@/components/ui/date-picker';
import { useGetRevenueByTimeQuery } from '@/features/manager/dashboard/dashboard.api';
import { currency, formatDate } from '@/lib/utils';
import {
  RevenueByTimeRequestType,
  RevenueByTimeResponseType,
} from '@/types/dashboard.type';
import { Tick } from 'chart.js';
import { useCallback, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChartRevenueRangeTime = () => {
  const [req, setReq] = useState<RevenueByTimeRequestType>({
    from: new Date('2025-01-01'),
    to: new Date('2025-12-31'),
  });
  const { data, isLoading } = useGetRevenueByTimeQuery(req, {
    skip: !req.from || !req.to,
  });

  const renderData = useCallback((data: RevenueByTimeResponseType) => {
    return {
      labels: data.map((item) => item.month),
      datasets: [
        {
          label: 'Doanh thu theo tháng',
          data: data.map((item) => Number(item.revenue)),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, []);

  const options = useCallback((data: RevenueByTimeResponseType) => {
    return {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Biểu đồ doanh thu theo tháng',
          font: {
            size: 20,
            weight: 'bold' as const,
          },
          padding: {
            top: 10,
            bottom: 20,
          },
          align: 'center' as const,
        },
        legend: { position: 'top' as const },
        tooltip: {
          callbacks: {
            title: (tooltipItems: any[]) => {
              const label = tooltipItems[0].label; // e.g., '2025-06'
              const date = new Date(`${label}-01`);
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              return `Tháng ${month}, ${year}`;
            },
            label: (context: any) => {
              const value = context.parsed.y;
              return currency(value);
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback: (
              value: string | number,
              index: number,
              values: Tick[],
            ): string => {
              const raw = data[index].month;
              const date = new Date(`${raw}-01`);
              return new Intl.DateTimeFormat('vi-VN', {
                month: 'short',
                year: 'numeric',
              }).format(date); // e.g., "thg 6, 2025"
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value: unknown): string {
              if (typeof value === 'number') {
                return currency(value);
              }
              return '';
            },
          },
        },
      },
    };
  }, []);

  return (
    <section>
      <h3 className="text-center">
        Doanh thu từ {formatDate(req.from, 'SHORT')} đến{' '}
        {formatDate(req.to, 'SHORT')}
      </h3>
      <div className="mt-3 flex flex-col items-center">
        <div className="flex gap-3">
          <DatePickerMonthYear
            date={{
              month: req.from.getMonth() + 1,
              year: req.from.getFullYear(),
            }}
            setDate={(date) => {
              setReq({
                from: new Date(date.year, date.month - 1, 1),
                to: new Date(req.to.getFullYear(), req.to.getMonth(), 0),
              });
            }}
          />
        </div>
        <div className="mt-4 flex gap-3">
          <DatePickerMonthYear
            date={{
              month: req.to.getMonth() + 1,
              year: req.to.getFullYear(),
            }}
            setDate={(date) => {
              setReq({
                from: new Date(req.from.getFullYear(), req.from.getMonth(), 1),
                to: new Date(date.year, date.month - 1, 0),
              });
            }}
          />
        </div>
      </div>
      <LoadingBoundary<RevenueByTimeResponseType>
        data={data}
        isLoading={isLoading}
        loading={<div>Loading...</div>}
      >
        {(data) => <Bar data={renderData(data)} options={options(data)} />}
      </LoadingBoundary>
    </section>
  );
};

export default BarChartRevenueRangeTime;
