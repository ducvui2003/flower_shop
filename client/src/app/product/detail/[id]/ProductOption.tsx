import { ProductDetailRespType } from '@/types/product.type';

type ProductOptionProps = {
  options: ProductDetailRespType['option'];
};
export default function ProductOption({ options }: ProductOptionProps) {
  return (
    <form>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Dung tích</h3>
        <fieldset className="mt-2">
          <div className="flex items-center gap-x-3">
            {options.map((option, idx) => (
              <label
                key={idx}
                className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:border-black"
              >
                <input type="radio" name="volume-choice" className="sr-only" />
                {option.name}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </form>
  );
}
