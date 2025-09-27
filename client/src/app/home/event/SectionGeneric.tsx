import Link from '@/components/Link';
import ProductCard from '@/components/product/ProductCard';
import { ProductCardType } from '@/types/product.type';
import TEXT from '@/utils/text.util';

type SectionGenericProps = {
  title: string;
  products: ProductCardType[];
  href?: string;
};

const SectionGeneric = ({ title, products, href }: SectionGenericProps) => {
  return (
    <section className="mt-12">
      <div className="pc:flex-row flex flex-col items-center justify-center">
        <img
          src="/vintage-flourish-divider.svg"
          className="pc:hidden w-[100px]"
          alt=""
        />
        <img
          src="/decorator-florist.svg"
          className="pc:h-[30px] pc:block hidden"
          alt=""
        />
        <h3 className="pc:text-3xl text-center text-2xl font-light">{title}</h3>
        <img
          src="/decorator-florist.svg"
          className="pc:block hidden h-[30px] -rotate-180"
          alt=""
        />
      </div>
      <div className="pc:grid-cols-4 pc:gap-8 mt-8 grid grid-cols-2 gap-4">
        {products.map((item) => (
          <ProductCard {...item} />
        ))}
      </div>
      {href && <Link href={href}> {TEXT.PRODUCT_LIST.MORE}</Link>}
    </section>
  );
};

export default SectionGeneric;
