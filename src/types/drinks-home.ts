import { object, string, optional, minLength, toTrimmed, type Output, date, any, boolean } from 'valibot';

export const DrinksHomeFormSchema = object({
  dinar: object({
    title: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
    description: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
  }),

  hindirin: object({
    title: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
    description: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
  }),

  nutritional: object({
    title: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
    description: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
  }),

  rayan: object({
    title: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
    description: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
  }),

  softdrinks: object({
    title: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
    description: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
  }),

  steelbul: object({
    title: object({
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
    description: object({
      ar: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
      en: string(undefined, [toTrimmed(), minLength(0, 'product.name_required')]),
    }),
  }),
});

export type DrinksHomeFormData = Output<typeof DrinksHomeFormSchema>;
