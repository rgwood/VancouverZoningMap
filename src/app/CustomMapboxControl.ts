import { IControl, Evented } from 'mapbox-gl/dist/mapbox-gl';

export class CustomMapboxControl extends Evented {

    map: mapboxgl.Map;
    container: HTMLDivElement;
    onClickFunction : () => void;
    button: HTMLButtonElement;

    constructor(onClickFunction: () => void)
    {
      super();
      this.onClickFunction = onClickFunction;
    }
  
    onAdd(map){
      this.map = map;
      this.container = document.createElement('div');
      this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-custom';
      this.button.onclick = () => this.onClickFunction();
      //this.button.innerText = '';
      this.container.appendChild(this.button);

      return this.container;
    }
  
    onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
  }

  }