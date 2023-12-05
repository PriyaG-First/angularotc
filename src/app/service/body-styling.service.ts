import { Injectable, Renderer2,RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyStylingService {

  removeStyleFromBody(styleName:string){
    document.body.style.removeProperty(styleName)
  }
  addStyleFromBody(){
    document.body.style.backgroundColor = '#004d99'
  }
}
