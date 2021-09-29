export class Bookmark {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  creationDateTime: string;
  toRead: boolean;
  editMode: boolean = false;
}
