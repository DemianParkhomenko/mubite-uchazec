export interface Album {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
}

export function isAlbum(obj: unknown): obj is Album {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof (obj as Album).id === "number" &&
    "userId" in obj &&
    typeof (obj as Album).userId === "number" &&
    "title" in obj &&
    typeof (obj as Album).title === "string"
  );
}
