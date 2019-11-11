export class AjaxApi {
  public static json(url: string, init?: RequestInit): Promise<any> {
    return fetch(url, init).then(res => res.json());
  }
}
