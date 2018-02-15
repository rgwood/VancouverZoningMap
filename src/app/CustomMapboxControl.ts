import { IControl, Evented, Map } from 'mapbox-gl/dist/mapbox-gl';

export class CustomMapboxControl extends Evented {

    map: mapboxgl.Map;
    container: HTMLDivElement;
    onClickFunction : () => void;
    button: HTMLButtonElement;
    visible: boolean;

    constructor(visible:boolean, onClickFunction: () => void)
    {
      super();
      this.visible = visible;
      this.onClickFunction = onClickFunction;
    }
  
    onAdd(map: Map){
      this.map = map;
      this.container = document.createElement('div');
      this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-custom';
      this.button.onclick = () => this.onClickFunction();
      this.setStyleFromVisible();
      //this.button.innerText = '';
      this.container.appendChild(this.button);

      return this.container;
    }
  
    onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
  }

  hide(){
    this.visible = false;
    this.setStyleFromVisible();
  }

  show(){
    this.visible = true;
    this.setStyleFromVisible();
  }

  private setStyleFromVisible(){
    if(this.visible){
      this.button.style.display = '';
    }
    else{
      this.button.style.display = 'none';
    }
  }

  }