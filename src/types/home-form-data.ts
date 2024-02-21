import { object, string, optional, minLength, toTrimmed, type Output, date, any, boolean } from 'valibot';

export const HomeFormSchema = object({
  enTitle: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enDescription: optional(string(undefined, [toTrimmed(), minLength(0, 'product.name_required')])),
  arTitle: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arDescription: optional(string(undefined, [toTrimmed(), minLength(0, 'product.name_required')])),
  enFirstOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enSecondOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enThirdOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  enFourthOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arFirstOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arSecondOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arThirdOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  arFourthOption: string(undefined, [toTrimmed(), minLength(3, 'product.name_required')]),
  id: optional(string()),
  category: optional(string()),
});

export type HomeFormData = Output<typeof HomeFormSchema>;
