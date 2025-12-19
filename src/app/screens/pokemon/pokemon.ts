import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonResponse } from '../../core/interfaces/pokemon.interface';
import { UpperFirstLetterPipe } from '../../utils/pipes/upper-first-letter-pipe';

@Component({
  selector: 'app-pokemon',
  imports: [NgClass, RouterLink, UpperFirstLetterPipe],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class Pokemon implements OnInit {

  pokemonId: string = '';

  pokemon: any;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    
    this.pokemonId = this.route.snapshot.paramMap.get('id')!;

    if(Number(this.pokemonId) <= 0 || Number(this.pokemonId) > 1025) {
      this.router.navigate(['/pokedex'])
    } else {
      this.getPokemon();
    }

  }

  getPokemon() {

    this.pokemonService.getPokemon(+this.pokemonId).subscribe({
      next: (res: PokemonResponse) => {
        // console.log(res)
        this.pokemon = res
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
