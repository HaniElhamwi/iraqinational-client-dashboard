import { object, number, string, optional, minLength, toTrimmed, type Output, date, any, required, boolean } from 'valibot';

function isValidPercentage(input: unknown) {
  // Regular expression to match valid percentages
  const percentageRegex = /^(100(?:\.0{1,2})?%|\d{1,2}(?:\.\d{1,2})?%)$/;

  // Test the input string against the regex
  return percentageRegex.test(input as string);
}

function isNumberString(input: unknown) {
  return typeof input === 'string' && input.length > 0 && !isNaN(Number(input));
}

export const ProductFormSchema = object({
  title: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  description: string('product.description_error', [minLength(3, 'product.description_required')]),
  images: optional(any()),
  price: string('products.price_error'),
  quantity: optional(string()),
  country: string(undefined, [minLength(3, 'country must have at least 3 characters')]),
  city: string(undefined, [minLength(2, 'city must have at least 2 characters')]),
  showPlace: boolean('this field is required'),

  categoryId: required(
    object({
      id: number(),
      title: string(),
    }),
  ),
  userId: optional(number()),
  updatedAt: optional(date()),
  createdAt: optional(date()),
  id: any(),
  published: optional(boolean()),

  //   slug: string(undefined, [minLength(3, 'product.slug_required')]),
  //   seoDescription: string(undefined, [minLength(3, 'product.seo_description_required')]),
  //   categories: array(object({ id: number(), name: string() })),
  //   sku: string(undefined, [minLength(12, 'product.sku_min_length'), maxLength(18, 'product.sku_max_length')]),
  //   colors: array(string('product.color_required'), [minLength(1, 'product.colors_required')]),
  //   color: string(),
  //   coverImage: array(
  //     object({
  //       key: string(undefined, [minLength(21, 'product.cover_image_key_required')]),
  //       dataURL: optional(string()),
  //       file: optional(instance(File)),
  //     }),
  //   ),
  //   printAreas: array(
  //     object({
  //       id: optional(number()),
  //       top: special<`${number}%`>(isValidPercentage, 'product.print_area_top_required'),
  //       left: special<`${number}%`>(isValidPercentage, 'product.print_area_left_required'),
  //       width: special<`${number}%`>(isValidPercentage, 'product.print_area_width_required'),
  //       height: special<`${number}%`>(isValidPercentage, 'product.print_area_height_required'),
  //       key: string(undefined, [minLength(21, 'product.print_area_image_key_required')]),
  //       location: string(undefined, [minLength(2, 'product.print_area_location_required')]),
  //       dataURL: optional(string()),
  //       file: optional(instance(File)),
  //     }),
  //     [minLength(1, 'product.print_areas_required')],
  //   ),
  //   printingImages: array(
  //     object({
  //       id: optional(number()),
  //       top: special<`${number}%`>(isValidPercentage, 'product.print_area_top_required'),
  //       left: special<`${number}%`>(isValidPercentage, 'product.print_area_left_required'),
  //       width: special<`${number}%`>(isValidPercentage, 'product.print_area_width_required'),
  //       height: special<`${number}%`>(isValidPercentage, 'product.print_area_height_required'),
  //       key: string(undefined, [minLength(21, 'product.print_area_image_key_required')]),
  //       location: string(undefined, [minLength(2, 'product.print_area_location_required')]),
  //       dataURL: optional(string()),
  //       file: optional(instance(File)),
  //       isDefault: boolean(),
  //     }),
  //     [minLength(1, 'product.printing_images_required')],
  //   ),
  //   price: special<string>(isNumberString, 'product.price_required', [minValue('0', 'product.price_required')]),
  //   published: boolean(),
});

export type ProductFormData = Output<typeof ProductFormSchema>;
