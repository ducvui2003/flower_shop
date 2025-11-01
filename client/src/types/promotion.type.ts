type GetActivePromotionsResType = {
  id: number;
  code: string;
  description: string;
  startDate: Date;
  endDate: Date;
  usageLimit: number;
  status: 'ACTIVE' | 'INACTIVE';
  percent: number;
  maxAmount: number;
}[];

export type { GetActivePromotionsResType };
