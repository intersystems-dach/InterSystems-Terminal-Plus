import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class NamespaceService {
  private currNamespace: string = '';
  private allNamespaces: string[] = [];

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) {
    this.fetchAllNamespaces();
    this.currNamespace = this.localStorageService.getNamespace();
  }

  fetchAllNamespaces() {
    this.apiService.getAllNamespaces().subscribe((data: any) => {
      this.allNamespaces = data.Namespaces;
    });
  }

  setCurrNamespace(namespace: string): boolean {
    if (this.allNamespaces.includes(namespace)) {
      this.currNamespace = namespace;
      this.localStorageService.setNamespace(namespace);
      return true;
    }
    return false;
  }

  getCurrNamespace(): string {
    return this.currNamespace;
  }

  getAllNamespaces(): string[] {
    return this.allNamespaces;
  }
}
