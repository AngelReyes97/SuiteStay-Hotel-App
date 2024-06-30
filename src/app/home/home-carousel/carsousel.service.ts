import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Image {
  previewImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
  srcset: string;
  sizes: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarsouselService {

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image[]> {
    return this.http.get<any>('/assets/carousel-home-photos/home-galleria.json').pipe(
      map(res => res.galleria as Image[])
    );
  }
}
