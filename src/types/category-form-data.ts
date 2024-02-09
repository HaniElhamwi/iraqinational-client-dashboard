import { object, string, optional, minLength, toTrimmed, type Output, date, any, boolean } from 'valibot';

export const CategoryFormSchema = object({
  title: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  description: string('product.description_error', [minLength(3, 'product.description_required')]),
  image: any(),
  updatedAt: optional(date()),
  createdAt: optional(date()),
  published: optional(boolean()),
  id: optional(any()),
});

export type CategoryFormData = Output<typeof CategoryFormSchema>;
