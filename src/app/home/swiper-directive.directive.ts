import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);
@Directive({
  selector: '[appSwiperDirective]'
})
export class SwiperDirectiveDirective implements AfterViewInit{
  constructor(private elementRef: ElementRef) { }
  ngAfterViewInit(): void {
    new Swiper(this.elementRef.nativeElement, {
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".swiper-button-next-1",
        prevEl: ".swiper-button-prev-1",
      },
      pagination: {
        el: ".swiper-pagination-banner",
        clickable: true,
      },
      mousewheel: false,
      keyboard: false,
    });
  }

}
