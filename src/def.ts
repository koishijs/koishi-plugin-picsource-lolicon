export interface LoliconReturnData {
  pid: number;
  p: number;
  uid: number;
  title: string;
  author: string;
  r18: boolean;
  width: number;
  height: number;
  tags: string[];
  ext: string;
  uploadDate: number;
  urls: Urls;
}

export interface Urls {
  original: string;
}

export interface LoliconReturnMessage {
  error: string;
  data: LoliconReturnData[];
}
