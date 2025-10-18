import ProductDescription from '@/app/[category]/[sub-category]/[product]/ProductDescription';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { Separator } from '@/components/ui/separator';
import { currency } from '@/lib/utils';
import { ProductPageType } from '@/types/page/product.page.type';
import { APP_INFO } from '@/utils/const.util';
import TEXT from '@/utils/text.util';
import ProductImages from './ProductImages';

type ProductDetailProps = {
  product: ProductPageType;
};

export default function ProductDetail({
  product: {
    avgRate,
    description,
    id,
    images,
    name,
    priceNew: salePrice,
    priceOld: basePrice,
    views,
  },
}: ProductDetailProps) {
  const percent = Math.round(((basePrice - salePrice) / basePrice) * 100);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="pc:grid-cols-2 grid grid-cols-1 gap-10">
        <div>
          <ProductImages images={[...(images ?? [])]} />
        </div>
        <div className="relative lg:border-gray-200">
          <h2
            title={name}
            className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
          >
            {name}
          </h2>
          <span
            title={'Người xem'}
            className="absolute top-0 right-0 flex gap-2 text-gray-500"
          >
            <ClientIcon icon={'mdi:eye'} />
            <span>{views}</span>
          </span>
          <Separator className="my-4" />
          <p>
            {TEXT.PRODUCT_DETAIL.CATEGORY}
            <span className="font-medium text-gray-800"></span>
          </p>
          <Separator className="my-4" />
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <div className="mt-2 flex items-baseline gap-x-4">
              {salePrice ? (
                <>
                  <span className="text-2xl font-semibold text-red-600">
                    {currency(salePrice)}
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    {currency(basePrice)}
                  </span>
                  <span className="order-2 ml-5 rounded-lg bg-green-600 px-3 font-medium text-white">
                    -{percent}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-red-600">
                  {currency(basePrice)}
                </span>
              )}
            </div>
            <span className="block pt-3 text-gray-500">
              {TEXT.PRODUCT_DETAIL.VAT}
            </span>
          </div>
          <Separator className="my-4" />
          <div className="flex gap-3">
            <Link
              href={APP_INFO.PHONE}
              className="inline-flex w-[150px] justify-center gap-3 rounded-md border-2 border-green-600 px-3 py-2 text-green-600 transition-colors hover:bg-green-600 hover:text-white"
            >
              <ClientIcon icon={'ic:baseline-phone'} />
              {TEXT.PRODUCT_DETAIL.PHONE}
            </Link>
            <Link
              href={APP_INFO.ZALO_OA}
              className="inline-flex w-[150px] justify-center gap-3 rounded-md border-2 border-blue-600 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
            >
              <ClientIcon icon={'simple-icons:zalo'} />
              {TEXT.PRODUCT_DETAIL.ZALO_OA}
            </Link>
          </div>
          <Separator className="my-4" />
          <div>
            <p>{TEXT.PRODUCT_DETAIL.ORDER_ADDRESS}</p>
            <div className="mt-2 max-w-[300px] rounded-md border-2 border-gray-300 p-2">
              <p className="text-[15px]">{APP_INFO.ADDRESS}</p>
              <Link
                href={APP_INFO.MAP}
                target="_blank"
                className="bg-primary mt-2 inline-flex items-center gap-2 rounded-md px-2 py-1 font-medium text-white"
              >
                <ClientIcon icon={'mdi:location'} size={20} />
                Bản đồ
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 lg:mt-10">
        <ProductDescription description={description} productId={id} />
      </div>
    </div>
  );
}
