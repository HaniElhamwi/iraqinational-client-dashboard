import { object, optional, type Output, any, string, minLength } from 'valibot';

function isValidPercentage(input: unknown) {
  // Regular expression to match valid percentages
  const percentageRegex = /^(100(?:\.0{1,2})?%|\d{1,2}(?:\.\d{1,2})?%)$/;

  // Test the input string against the regex
  return percentageRegex.test(input as string);
}

function isNumberString(input: unknown) {
  return typeof input === 'string' && input.length > 0 && !isNaN(Number(input));
}

export const TransportationFormSchema = object({
  first: object({
    title: object({
      en: string(undefined, [minLength(3, 'product.slug_required')]),
      ar: string(undefined, [minLength(3, 'product.slug_required')]),
    }),
    description: object({
      en: string(undefined, [minLength(3, 'product.slug_required')]),
      ar: string(undefined, [minLength(3, 'product.slug_required')]),
    }),
  }),

  second: object({
    title: object({
      en: string(undefined, [minLength(3, 'product.slug_required')]),
      ar: string(undefined, [minLength(3, 'product.slug_required')]),
    }),
    description: object({
      en: string(undefined, [minLength(3, 'product.slug_required')]),
      ar: string(undefined, [minLength(3, 'product.slug_required')]),
    }),
  }),
  third: object({
    title: object({
      en: string(undefined, [minLength(3, 'product.slug_required')]),
      ar: string(undefined, [minLength(3, 'product.slug_required')]),
    }),
    description: object({
      en: string(undefined, [minLength(3, 'product.slug_required')]),
      ar: string(undefined, [minLength(3, 'product.slug_required')]),
    }),
  }),

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

export type TransportationFormData = Output<typeof TransportationFormSchema>;
