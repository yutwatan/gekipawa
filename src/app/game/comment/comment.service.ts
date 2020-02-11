import { Injectable } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private gameLogId: number;

  backendApiConfig = this.configService.get('backend_api');
  globalConfig = this.configService.get('global');

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  set gameId(id: number) {
    this.gameLogId = id;
  }

  /**
   * Save comment
   * @param comment comment data
   * @param kind 'comment' or 'news'
   * @param userId comment owner
   */
  async addComment(comment: string, kind: string, userId?: number) {
    const commentData = {
      gameLogId: this.gameLogId,
      comment,
      kind,
      userId: userId ? userId : null,
    };

    const url = this.backendApiConfig.baseurl + '/commentNews';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    try {
      return await this.http.post(url, commentData, options).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }
}
