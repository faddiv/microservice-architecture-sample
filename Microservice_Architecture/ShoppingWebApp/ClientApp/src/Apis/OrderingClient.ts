import { throwException } from "./ApiException";
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class OrderClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
      this.http = http ? http : window as any;
      this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  /**
   * @param body (optional)
   * @return Success
   */
  orderPOST(body: CheckoutOrderCommand | undefined): Promise<number> {
      let url_ = this.baseUrl + "/order/order";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);

      let options_: RequestInit = {
          body: content_,
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.http.fetch(url_, options_).then((_response: Response) => {
          return this.processOrderPOST(_response);
      });
  }

  protected processOrderPOST(response: Response): Promise<number> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<number>(null as any);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  orderDELETE(body: DeleteOrderCommand | undefined): Promise<Unit> {
      let url_ = this.baseUrl + "/order/order";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);

      let options_: RequestInit = {
          body: content_,
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.http.fetch(url_, options_).then((_response: Response) => {
          return this.processOrderDELETE(_response);
      });
  }

  protected processOrderDELETE(response: Response): Promise<Unit> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Unit;
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<Unit>(null as any);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  orderPUT(body: UpdateOrderCommand | undefined): Promise<Unit> {
      let url_ = this.baseUrl + "/order/order";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(body);

      let options_: RequestInit = {
          body: content_,
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      };

      return this.http.fetch(url_, options_).then((_response: Response) => {
          return this.processOrderPUT(_response);
      });
  }

  protected processOrderPUT(response: Response): Promise<Unit> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as Unit;
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<Unit>(null as any);
  }

  /**
   * @return Success
   */
  orderAll(userName: string): Promise<OrderModel[]> {
      let url_ = this.baseUrl + "/order/order/{userName}";
      if (userName === undefined || userName === null)
          throw new Error("The parameter 'userName' must be defined.");
      url_ = url_.replace("{userName}", encodeURIComponent("" + userName));
      url_ = url_.replace(/[?&]$/, "");

      let options_: RequestInit = {
          method: "GET",
          headers: {
              "Accept": "application/json"
          }
      };

      return this.http.fetch(url_, options_).then((_response: Response) => {
          return this.processOrderAll(_response);
      });
  }

  protected processOrderAll(response: Response): Promise<OrderModel[]> {
      const status = response.status;
      let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
      if (status === 200) {
          return response.text().then((_responseText) => {
          let result200: any = null;
          result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as OrderModel[];
          return result200;
          });
      } else if (status !== 200 && status !== 204) {
          return response.text().then((_responseText) => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          });
      }
      return Promise.resolve<OrderModel[]>(null as any);
  }
}

export interface CheckoutOrderCommand {
  userName?: string | undefined;
  totalPrice?: number;
  firstName?: string | undefined;
  lastName?: string | undefined;
  emailAddress?: string | undefined;
  addressLine?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  zipCode?: string | undefined;
  cardName?: string | undefined;
  cardNumber?: string | undefined;
  expiration?: string | undefined;
  cvv?: string | undefined;
  paymentMethod?: number;
}

export interface DeleteOrderCommand {
  id?: number;
}

export interface OrderModel {
  id?: number;
  totalPrice?: number;
  firstName?: string | undefined;
  lastName?: string | undefined;
  emailAddress?: string | undefined;
  addressLine?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  zipCode?: string | undefined;
  cardName?: string | undefined;
  cardNumber?: string | undefined;
  expiration?: string | undefined;
  cvv?: string | undefined;
  paymentMethod?: number;
  createdBy?: string | undefined;
  createdDate?: Date;
  lastModifiedBy?: string | undefined;
  lastModifiedDate?: Date | undefined;
}

export interface Unit {
}

export interface UpdateOrderCommand {
  id?: number;
  userName?: string | undefined;
  totalPrice?: number;
  firstName?: string | undefined;
  lastName?: string | undefined;
  emailAddress?: string | undefined;
  addressLine?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  zipCode?: string | undefined;
  cardName?: string | undefined;
  cardNumber?: string | undefined;
  expiration?: string | undefined;
  cvv?: string | undefined;
  paymentMethod?: number;
}
