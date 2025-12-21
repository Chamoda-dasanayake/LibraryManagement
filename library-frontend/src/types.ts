export interface Book {
  id?: number | string;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
  copiesAvailable: number;
}
