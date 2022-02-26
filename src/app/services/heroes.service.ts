import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = "https://login-app-ca131-default-rtdb.firebaseio.com";
  constructor( private http: HttpClient ) { }


  crearHeroe( heroe: HeroeModel ) {
    
    return this.http.post(`${this.url}/heroes.json`, heroe)
                .pipe(
                  map( (resp: any) => {
                    heroe.id = resp.name;
                    return heroe;
                  })
                )

  }

  actualizarHeroe( heroe: HeroeModel ) {
      
      const heroeTemp = {
        ...heroe
      };

      delete heroeTemp.id;

      return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }


  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
                .pipe(
                  map( resp => this.crearArreglo(resp) )
                );
  }

  private crearArreglo( hereosObj: any ) {

      const heroes: HeroeModel[] = [];

      if( hereosObj === null ) { return []; }

      Object.keys( hereosObj ).forEach( key => {
        const heroe: HeroeModel = hereosObj[key];
        heroe.id = key;

        heroes.push( heroe );
      })

      return heroes;
  }

}
