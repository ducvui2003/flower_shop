import { z } from 'zod';

const VnpayReturnSchema = z.object({
  vnp_ResponseCode: z.string(),
  vnp_TxnRef: z.string(),
  vnp_TmnCode: z.string(),
  vnp_Amount: z.coerce.number(),
  vnp_BankCode: z.string(),
  vnp_BankTranNo: z.string(),
  vnp_CardType: z.string(),
  vnp_PayDate: z
    .string()
    .regex(/^\d{14}$/, 'Must be in yyyyMMddHHmmss format')
    .transform((val) => {
      const year = parseInt(val.slice(0, 4), 10);
      const month = parseInt(val.slice(4, 6), 10) - 1; // Month is 0-indexed
      const day = parseInt(val.slice(6, 8), 10);
      const hour = parseInt(val.slice(8, 10), 10);
      const minute = parseInt(val.slice(10, 12), 10);
      const second = parseInt(val.slice(12, 14), 10);

      return new Date(year, month, day, hour, minute, second);
    }),
  vnp_OrderInfo: z.string(),
  vnp_TransactionNo: z.string(),
  vnp_TransactionStatus: z.string(),
  vnp_SecureHash: z.string(),
});
type VnpayReturnType = z.infer<typeof VnpayReturnSchema>;

type VnpayReturnSentBackendType = {
  responseCode: string;
  txnRef: string;
  tnnCode: string;
  amount: number;
  bankCode: string;
  bankTranNo: string;
  cardType: string;
  payDate: Date;
  orderInfo: string;
  transactionNo: string;
  transactionStatus: string;
  secureHash: string;
};

export { VnpayReturnSchema };
export type { VnpayReturnType, VnpayReturnSentBackendType };
