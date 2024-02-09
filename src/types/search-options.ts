export interface ISearchOptions {
  page: number;
  limit: number;
  search?: string;
  direction?: 'ASC' | 'DESC';
}
