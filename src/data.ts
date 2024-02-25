export const homeOptions = [
  {
    name: 'transportation',
  },
  {
    name: 'drink',
  },
  {
    name: 'Grain',
  },
  {
    name: 'glasses',
  },
  {
    name: 'eduction',
  },
];

type categoryTypes = 'dinar' | 'hindirin' | 'nutritional' | 'rayan' | 'softdrinks' | 'steelbul';

export const drinksMainOptions: { name: categoryTypes }[] = [
  {
    name: 'dinar',
  },
  {
    name: 'hindirin',
  },
  {
    name: 'nutritional',
  },
  {
    name: 'rayan',
  },
  {
    name: 'softdrinks',
  },
  {
    name: 'steelbul',
  },
];

type transportationOptions = 'first' | 'second' | 'third';

export const transportationMainOptions: { name: transportationOptions }[] = [
  {
    name: 'first',
  },
  {
    name: 'second',
  },
  {
    name: 'third',
  },
];
