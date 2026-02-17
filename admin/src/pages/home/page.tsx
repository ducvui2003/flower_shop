import DialogGetImage from "@/components/dialog/dialog-get-image";
import { Image } from "@/components/data-table/product/type";
import { HomePageResponse } from "@/pages/home/loader";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectSeparator,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { Page, ResponseApi } from "@/lib/http/http.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useLoaderData } from "react-router";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const formSchema = z.object({
  banners: z.object({
    mediaIds: z.array(z.number().int()),
  }),
  sliders: z.object({
    title: z.string(),
    categoryIds: z.array(z.number().int()),
  }),
  categories: z.array(
    z.object({
      id: z.number().int(),
      title: z.string(),
      productIds: z.array(z.number().int()),
    }),
  ),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

type CategoryOption = {
  id: number;
  name: string;
};

type ProductOption = {
  id: number;
  name: string;
};

type ProductGroup = {
  categoryId: number;
  categoryName: string;
  products: ProductOption[];
};

const defaultValues: FormInput = {
  banners: {
    mediaIds: [],
  },
  sliders: {
    title: "",
    categoryIds: [],
  },
  categories: [],
};

const mapHomeResponseToForm = (data: HomePageResponse): FormInput => {
  const bannerSection = data.find((section) => section.type === "banner");
  const sliderSection = data.find(
    (section) => section.type === "category_slider",
  );
  const categorySection = data.find(
    (section) => section.type === "category_product_section",
  );

  return {
    banners: {
      mediaIds: bannerSection?.config.mediaIds ?? [],
    },
    sliders: {
      title: sliderSection?.config.title ?? "",
      categoryIds: sliderSection?.config.categoryIds ?? [],
    },
    categories: categorySection?.config.categories ?? [],
  };
};

const HomePage = () => {
  const homeData = useLoaderData<HomePageResponse>();
  const formDefaults = useMemo(
    () => (homeData ? mapHomeResponseToForm(homeData) : defaultValues),
    [homeData],
  );
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaults,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const [bannerImages, setBannerImages] = useState<Image[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [productGroupsLoading, setProductGroupsLoading] = useState(false);
  const [productGroupsError, setProductGroupsError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    form.reset(formDefaults);
    setBannerImages([]);
  }, [formDefaults, form]);

  useEffect(() => {
    let active = true;
    const loadProductGroups = async () => {
      setProductGroupsLoading(true);
      setProductGroupsError(null);
      try {
        const categoryRes = await httpService.get<
          ResponseApi<Page<CategoryOption>>
        >("/category?page=1&limit=50");
        const categories = categoryRes.data.data.items ?? [];
        if (!active) return;
        setCategoryOptions(categories);

        const groups = await Promise.all(
          categories.map(async (category) => {
            const productRes = await httpService.get<
              ResponseApi<{
                items: ProductOption[];
              }>
            >(`/product?categories=${category.id}&page=1&limit=50`);
            const products = productRes.data.data.items ?? [];
            return {
              categoryId: category.id,
              categoryName: category.name,
              products,
            };
          }),
        );
        if (!active) return;
        setProductGroups(groups.filter((group) => group.products.length > 0));
      } catch (e) {
        if (!active) return;
        logger.error(e);
        setProductGroupsError("Failed to load products");
      } finally {
        if (!active) return;
        setProductGroupsLoading(false);
      }
    };
    loadProductGroups();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const ids = formDefaults.banners.mediaIds;
    if (!ids || ids.length === 0) {
      setBannerImages([]);
      return;
    }
    let active = true;
    const load = async () => {
      try {
        const res = await httpService.get<
          ResponseApi<
            Array<{ id: number; key: string; href: string; alt: string | null }>
          >
        >(`/media-id?ids=${ids.join(",")}`);
        if (!active) return;
        const data = res.data.data.map((item) => ({
          id: item.id,
          key: item.key,
          href: item.href,
          alt: item.alt ?? "",
        }));
        setBannerImages(data);
      } catch (e) {
        logger.error(e);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [formDefaults.banners.mediaIds]);

  const handleSubmit = async (value: FormInput) => {
    const result = formSchema.safeParse(value);
    if (!result.success) {
      logger.error(result.error.flatten());
      toast.error("Invalid form data");
      return;
    }

    const data: FormOutput = result.data;
    try {
      // Get current sections from homeData
      const bannerSection = homeData?.find(
        (section) => section.type === "banner",
      );
      const sliderSection = homeData?.find(
        (section) => section.type === "category_slider",
      );
      const categorySection = homeData?.find(
        (section) => section.type === "category_product_section",
      );

      // Build new section objects
      const newBannerConfig = { mediaIds: data.banners.mediaIds };
      const newSliderConfig = {
        title: data.sliders.title,
        categoryIds: data.sliders.categoryIds,
      };
      const newCategoryConfig = {
        categories: data.categories,
      };

      // Determine new, update, delete
      const newSections = [];
      const updateSections = [];
      const deleteSectionIds: number[] = [];

      // Banner section
      if (bannerSection) {
        const hasChanges =
          JSON.stringify(bannerSection.config) !==
          JSON.stringify(newBannerConfig);
        if (hasChanges) {
          updateSections.push({
            id: bannerSection.id,
            type: "banner" as const,
            config: newBannerConfig,
            position: bannerSection.position,
          });
        }
      } else {
        newSections.push({
          type: "banner" as const,
          config: newBannerConfig,
          position: 1,
        });
      }

      // Slider section
      if (sliderSection) {
        const hasChanges =
          JSON.stringify(sliderSection.config) !==
          JSON.stringify(newSliderConfig);
        if (hasChanges) {
          updateSections.push({
            id: sliderSection.id,
            type: "category_slider" as const,
            config: newSliderConfig,
            position: sliderSection.position,
          });
        }
      } else {
        newSections.push({
          type: "category_slider" as const,
          config: newSliderConfig,
          position: 2,
        });
      }

      // Category section
      if (categorySection) {
        const hasChanges =
          JSON.stringify(categorySection.config) !==
          JSON.stringify(newCategoryConfig);
        if (hasChanges) {
          updateSections.push({
            id: categorySection.id,
            type: "category_product_section" as const,
            config: newCategoryConfig,
            position: categorySection.position,
          });
        }
      } else {
        newSections.push({
          type: "category_product_section" as const,
          config: newCategoryConfig,
          position: 3,
        });
      }

      const pageUpdate = {
        new: newSections,
        update: updateSections,
        delete: deleteSectionIds,
      };

      logger.info(pageUpdate);
      // ENABLE
      // await httpService.put("/page/home", pageUpdate);
      toast.success("Update home page success");
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.code, {
          description: e.response?.data?.message ?? "Not defined",
        });
      } else toast.error("Not define");
      logger.error(e);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Home Page</h2>
      <Separator className="my-2" />
      <form
        className="pb-20"
        onSubmit={form.handleSubmit(handleSubmit)}
        onReset={() => {
          form.reset(formDefaults);
          setBannerImages([]);
        }}
      >
        <FieldGroup>
          <h3 className="text-xl font-bold">Banners</h3>
          <Controller
            name="banners.mediaIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Banner media</FieldLabel>
                <div className="grid mt-4 grid-cols-6 gap-4">
                  {bannerImages.map((item) => (
                    <div key={item.id}>
                      <div className="p-4 relative rounded shadow w-fit bg-gray-50">
                        <X
                          className="absolute top-0 right-0 text-sm hover:opacity-70 text-red-500 cursor-pointer"
                          onClick={() => {
                            const next = bannerImages.filter(
                              (i) => i.id !== item.id,
                            );
                            setBannerImages(next);
                            field.onChange(next.map((i) => i.id));
                          }}
                        />
                        <Zoom>
                          <img
                            src={item.href}
                            className="aspect-square object-contain"
                            alt={item.alt}
                          />
                        </Zoom>
                      </div>
                    </div>
                  ))}
                </div>
                <DialogGetImage
                  value={bannerImages}
                  onChange={(images) => {
                    setBannerImages(images);
                    field.onChange(images.map((i) => i.id));
                  }}
                  className="w-full"
                >
                  <div className="w-full grid place-items-center h-20 border-dotted border-2 border-gray-400 bg-gray-100 rounded">
                    <Button type="button" className="bg-green-500">
                      Choose Images
                    </Button>
                  </div>
                </DialogGetImage>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Separator className="my-4" />

        <FieldGroup>
          <h3 className="text-xl font-bold">Category Slider</h3>
          <Controller
            name="sliders.title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Title</FieldLabel>
                <Input {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="sliders.categoryIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Category IDs</FieldLabel>
                <MultiSelect
                  values={field.value.map(String)}
                  onValuesChange={(vals) => field.onChange(vals.map(Number))}
                >
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select categories..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent
                    search={{
                      placeholder: "Search categories...",
                      emptyMessage: "No categories found",
                    }}
                  >
                    {categoryOptions.length === 0 && (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        No categories available
                      </div>
                    )}
                    <MultiSelectGroup>
                      {categoryOptions.map((item) => (
                        <MultiSelectItem
                          key={item.id}
                          value={String(item.id)}
                          badgeLabel={item.name}
                        >
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-xs text-muted-foreground">
                              #{item.id}
                            </span>
                          </div>
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Separator className="my-4" />

        <FieldGroup>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Category Product Sections</h3>
            <Button
              type="button"
              onClick={() =>
                append({
                  id: 0,
                  title: "",
                  productIds: [],
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add section
            </Button>
          </div>

          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No category sections yet.
            </p>
          )}

          {fields.map((item, index) => (
            <div key={item.id} className="rounded border p-3 mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold">Section {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Controller
                name={`categories.${index}.title`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Section Title</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name={`categories.${index}.productIds`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Product IDs</FieldLabel>
                    <MultiSelect
                      values={field.value.map(String)}
                      onValuesChange={(vals) =>
                        field.onChange(vals.map(Number))
                      }
                    >
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select products..." />
                      </MultiSelectTrigger>
                      <MultiSelectContent
                        search={{
                          placeholder: "Search products...",
                          emptyMessage: "No products found",
                        }}
                      >
                        {productGroupsLoading && (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            Loading products...
                          </div>
                        )}
                        {productGroupsError && (
                          <div className="px-3 py-2 text-sm text-destructive">
                            {productGroupsError}
                          </div>
                        )}
                        {!productGroupsLoading &&
                          !productGroupsError &&
                          productGroups.length === 0 && (
                            <div className="px-3 py-2 text-sm text-muted-foreground">
                              No products available
                            </div>
                          )}
                        {productGroups.map((group, groupIndex) => (
                          <div key={group.categoryId}>
                            <MultiSelectGroup
                              heading={`${group.categoryName} (${group.products.length})`}
                            >
                              {group.products.map((product) => (
                                <MultiSelectItem
                                  key={product.id}
                                  value={String(product.id)}
                                  badgeLabel={product.name}
                                >
                                  <div className="flex flex-col">
                                    <span>{product.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      #{product.id}
                                    </span>
                                  </div>
                                </MultiSelectItem>
                              ))}
                            </MultiSelectGroup>
                            {groupIndex < productGroups.length - 1 && (
                              <MultiSelectSeparator />
                            )}
                          </div>
                        ))}
                      </MultiSelectContent>
                    </MultiSelect>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          ))}
        </FieldGroup>

        <div className="fixed left-1/2 flex gap-2 bg-white -translate-x-1/2 bottom-1 border-2 p-2 rounded-xl z-50">
          <Button type="submit" className="bg-green-500">
            Update
          </Button>
          <Button type="reset">Clear</Button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
