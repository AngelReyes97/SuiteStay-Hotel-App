import { Component, OnInit} from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CarsouselService } from './carsousel.service';

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.css',
  providers: [CarsouselService]
})
export class HomeCarouselComponent {
  images: any[] | undefined;
    
  responsiveOptions: any[] | undefined;

    constructor(private photoService: CarsouselService) {}

    ngOnInit() {
        this.photoService.getImages().subscribe((images) => (this.images = images));
        this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 5
          },
          {
              breakpoint: '768px',
              numVisible: 3
          },
          {
              breakpoint: '560px',
              numVisible: 1
          }
      ];
    }

}
