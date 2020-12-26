import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { defaultIfEmpty, flatMap, map } from 'rxjs/operators'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PostalService {
  constructor(private httpClient : HttpClient){

  }

  resolvePostalCode(postalCode : string): Observable<any> {
    const uriParams = new HttpParams()
    .set('maxRows', '1')
    .set('username', environment.userName)
    .set('postalcode', postalCode)
  return this.httpClient
    .get(
      `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
    { params: uriParams }
  ).pipe(flatMap( (data:any) => data.postalCodes), defaultIfEmpty(null), map((x:any) =>{
    if(x){
      const {lat : latitude, lng : longitude} = x;
      return ({latitude, longitude })
    }


    }))

  }

}