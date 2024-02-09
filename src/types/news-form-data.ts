import { object, string, optional, minLength, toTrimmed, type Output, date, any, boolean, startsWith } from 'valibot';

export const NewsFormSchema = object({
  title: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  subject: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  description: string('product.description_error', [minLength(10, 'product.description_required')]),
  image: any(),
  link: optional(string(undefined, [toTrimmed(), minLength(3, 'product.name_required'), startsWith('http')])),
  updatedAt: optional(date()),
  createdAt: optional(date()),
  id: optional(any()),
});

export type NewsFormData = Output<typeof NewsFormSchema>;
