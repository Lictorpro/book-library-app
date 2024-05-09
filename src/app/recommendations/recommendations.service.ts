import { Injectable } from '@angular/core';
import { Recommendation } from './recommendation.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { BooksService } from '../books/books.service';


interface RecommendationData {
  rating: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  private _recommendations = new BehaviorSubject<Recommendation[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get recommendations() {
    return this._recommendations.asObservable();
  }

  /*addRecommendation(rating: number, text: string) {

    let generatedId;
    let newRecommendation: Recommendation;
    let fetchedUserId: string;
    console.log('Usao u service');
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        console.log('User je: ' + userId + ', a token je ' + this.authService.token);
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        newRecommendation = new Recommendation(null, rating, text);
        console.log('NewRecc' + newRecommendation);
        return this.http.post<{ name: string }>(`https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/recommendations.json?auth=${token}`, newRecommendation);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.recommendations;
      }),
      take(1),
      tap((recommendations => {
        newRecommendation.id = generatedId;
        this._recommendations.next(recommendations.concat(newRecommendation))
      })))
  }*/

  addRecommendation(rating: number, text: string): Observable<Recommendation> {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        const newRecommendation: Recommendation = new Recommendation(null, rating, text);
        return this.http.post<{ name: string }>(`https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/recommendations.json?auth=${token}`, newRecommendation);
      }),
      map(resData => {
        const id = resData.name;
        console.log(resData);
        return { id, rating, text } as Recommendation;
      })
    );
  }

  getRecommendation(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<RecommendationData>(
          `https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/recommendations/${id}.json?auth=${token}`
        );
      }),
      map((resData) => {
        return new Recommendation(
          id,
          resData.rating,
          resData.text
        );
      })
    );
  }

  editRecommendation(recommendationId: string, rating: string, text: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/recommendations/${recommendationId}.json?auth=${token}`,
          { rating, text }
        );
      }),
      switchMap(() => this.recommendations),
      take(1),
      tap((recommendations) => {
        const updatedRecommendationIndex = recommendations.findIndex((recommendation) => recommendation.id === recommendationId);
        const updatedRecommendations = [...recommendations];
        updatedRecommendations[updatedRecommendationIndex] = new Recommendation(
          recommendationId,
          +rating,
          text
        );
        this._recommendations.next(updatedRecommendations);
      })
    );
  }
}

