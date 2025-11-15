import Link from '@/components/Link';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductCardType } from '@/types/product.type';
import TEXT from '@/utils/text.util';
import Image from 'next/image';

type SectionGenericProps = {
  title: string;
  products: ProductCardType[];
  link?: string;
};

const SectionGeneric = ({ title, products, link }: SectionGenericProps) => {
  return (
    <section>
      <div className="pc:flex-row flex flex-col items-center justify-center">
        <Separator className="pc:block bg-primary hidden flex-1" />
        <Image
          src="/vintage-flourish-divider.svg"
          className="pc:hidden"
          width={100}
          height={50}
          alt=""
        />
        <Image
          src="/decorator-florist.svg"
          className="pc:block hidden"
          alt=""
          width={100}
          height={30}
        />
        <h3 className="title-section">{title}</h3>
        <Image
          src="/decorator-florist.svg"
          className="pc:block hidden -rotate-180"
          alt=""
          width={100}
          height={50}
        />
        <Separator className="pc:block bg-primary hidden flex-1" />
      </div>
      <div className="pc:grid-cols-4 pc:gap-8 mt-8 grid grid-cols-2 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
      {link && (
        <Link href={link} className="mt-5 block">
          <Button className="w-full py-1">{TEXT.PRODUCT_LIST.MORE} </Button>
        </Link>
      )}
    </section>
  );
};

export default SectionGeneric;
