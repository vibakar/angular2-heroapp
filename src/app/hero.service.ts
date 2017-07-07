import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http:Http) { }
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
              .toPromise()
              .then((res)=>res.json().data as Hero[])
              .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
                    .toPromise()
                    .then((res)=>res.json().data as Hero)
                    .catch(this.handleError);
  }

  update(hero){
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url,JSON.stringify(hero),{headers: this.headers})
                    .toPromise()
                    .then(()=>null)
                    .catch(this.handleError);
  }

  create(name){
    return this.http.post(this.heroesUrl,{name:name},{headers: this.headers})
                    .toPromise()
                    .then((res)=>res.json().data as Hero)
                    .catch(this.handleError);
  }

  delete(hero){
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete(url)
                    .toPromise()
                    .then(()=>null)
                    .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('error ',error);
    return Promise.reject(error.message || error);
  }
}
