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
    this.apiService.getAllNamespaces().subscribe((data: any) => {
      this.allNamespaces = data.Namespaces;
    });
    this.currNamespace = this.localStorageService.getNamespace();
  }

  public setCurrNamespace(namespace: string): boolean {
    if (this.allNamespaces.includes(namespace)) {
      this.currNamespace = namespace;
      this.localStorageService.setNamespace(namespace);
      return true;
    }
    return false;
  }

  public getCurrNamespace(): string {
    return this.currNamespace;
  }

  public getAllNamespaces(): string[] {
    return this.allNamespaces;
  }
}
