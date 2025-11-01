import Link from '@/components/Link';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductCardType } from '@/types/product.type';
import TEXT from '@/utils/text.util';

type SectionGenericProps = {
  title: string;
  products: ProductCardType[];
  href?: string;
};

const SectionGeneric = ({ title, products, href }: SectionGenericProps) => {
  return (
    <section>
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
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
      {href && (
        <div className="mt-5 grid place-items-center">
          <Link href={href}>
            <Button>{TEXT.PRODUCT_LIST.MORE} </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default SectionGeneric;
