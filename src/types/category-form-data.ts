import { object, string, minLength, toTrimmed, type Output, any } from 'valibot';

export const CategoryFormSchema = object({
  enTitle: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  //   enDescription: string('product.description_error', [minLength(3, 'product.description_required')]),
  arTitle: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  //   arDescription: string('product.description_error', [minLength(3, 'product.description_required')]),
  image: any(),
});

export type CategoryFormData = Output<typeof CategoryFormSchema>;
