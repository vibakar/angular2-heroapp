import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit{
  title: string = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero : Hero;

  constructor(private router: Router, private heroService: HeroService) {  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  add(name:string): void {
    if(!name){
      return;
    }else{
      this.heroService.create(name).then((hero)=>this.heroes.push(hero));
    }
  }

  delete(hero:Hero): void {
    this.heroService.delete(hero.id).then(()=>{this.heroes=this.heroes.filter((h)=>h!==hero)});
  }
}
