export class AjaxApi {
  public static json<T>(url: string, init?: RequestInit): Promise<T> {
    return fetch(url, init).then(res => res.json());
  }
}
