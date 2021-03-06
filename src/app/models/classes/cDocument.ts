export class cDocument {
  title: string = "";
  description: string = "";
  files: cFile[] = [];
  maxFiles: number = 1;
  fileTypes: string = "";
  required: boolean = false;

  constructor(title: string, description: string, maxFiles: number, fileTypes: string[], required: boolean) {
    this.title = title;
    this.description = description;
    this.maxFiles = maxFiles;
    if (fileTypes.length > 0) {
      var cont = 1;
      fileTypes.forEach(e => {
        if (cont !== 1) {
          this.fileTypes += ", ";
        }
        this.fileTypes += e;
        cont++;
      });
    }
    this.required = required;
  }
}

export class cFile {
  name: string = "";
  base64: string = "";
}