export class cDocument {
  title: string = "";
  description: string = "";
  files: cFile[] = [];
  maxFiles: number = 1;
  fileTypes: string[] = [];

  constructor(title: string, description: string, maxFiles: number, fileTypes: string[]) {
    this.title = title;
    this.description = description;
    this.maxFiles = maxFiles;
    this.fileTypes = fileTypes;
  }
}

export class cFile {
  name: string = "";
  base64: string = "";
}