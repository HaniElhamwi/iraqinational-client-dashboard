import { object, string, optional, minLength, toTrimmed, type Output, date, any, boolean } from 'valibot';

export const HomeFormSchema = object({
  enTitle: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enDescription: string('product.description_error', [minLength(3, 'product.description_required')]),
  arTitle: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arDescription: string('product.description_error', [minLength(3, 'product.description_required')]),
  image: any(),
  enFirstOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enSecondOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enThirdOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enFourthOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arFirstOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arSecondOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arThirdOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arFourthOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  id: optional(string()),
});

export type HomeFormData = Output<typeof HomeFormSchema>;
