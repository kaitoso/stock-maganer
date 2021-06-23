import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/clients.interface';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	baseUrl: string = "http://localhost/";
  credentials = {
    "email":"xscorpio_@hotmail.com",
    "password":"admin"
};
	constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    
    this.httpClient.post(`${this.baseUrl}angular/api-crud/public/login`,this.credentials)
    .subscribe((resp:any) =>{
      console.log(resp);
      localStorage.setItem("token",resp.token)
    });

		return this.httpClient.post(`${this.baseUrl}angular/api-crud/public/login`, { email: email, password: password });
	}

	logout() {
		return this.httpClient.post(`${this.baseUrl}angular/api-crud/public/logout`, {});
	}

	getData() {
		return this.httpClient.get(`${this.baseUrl}angular/api-crud/public/clients`,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}});
	}

	getClientData(id: number) {
		return this.httpClient.get(`${this.baseUrl}angular/api-crud/public/clients/` + id);
	}

	updateClient(client: Client) {
		return this.httpClient.put(`${this.baseUrl}angular/api-crud/public/clients/` + client.id, client);
	}

	insertClient(client: Client) {
		return this.httpClient.post(`${this.baseUrl}angular/api-crud/public/clients`, client);
	}

	deleteClient(id: number) {
		return this.httpClient.delete(`${this.baseUrl}angular/api-crud/public/clients/` + id);
	}

	getRegions() {
		return this.httpClient.get(`${this.baseUrl}angular/api-crud/public/regions`);
	}

	getProvinces(region_id: string) {
		return this.httpClient.get(`${this.baseUrl}angular/api-crud/public/provinces/` + region_id);
	}

	getCommunes(province_id: string) {
		return this.httpClient.get(`${this.baseUrl}angular/api-crud/public/communes/` + province_id);
	}
}
