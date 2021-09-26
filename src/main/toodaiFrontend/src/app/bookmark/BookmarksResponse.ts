import { Bookmark } from './bookmark';

export class BookmarksResponse {
  content: Bookmark[];
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
