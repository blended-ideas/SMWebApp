import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare interface AnyData {
  [name: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) {
  }

  uploadFile<T>(method: 'post' | 'patch', url: string, file: File, data?: AnyData, fileName?: string,
                options?: object) {
    const formData = new FormData();
    for (const dt in data) {
      if (data.hasOwnProperty(dt)) {
        if (Array.isArray(data[dt])) {
          data[dt].forEach((item) => {
            formData.append(dt, item);
          });
        } else {
          formData.append(dt, data[dt]);
        }
      }
    }
    fileName = fileName ? fileName : file.name;
    formData.append(fileName, file);
    if (method === 'post') {
      return this.httpClient.post<T>(url, formData, options);
    } else {
      return this.httpClient.patch<T>(url, formData, options);
    }
  }
}
