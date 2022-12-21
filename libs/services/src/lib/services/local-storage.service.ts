import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  isNull = (value: any) => value === null;
  constructor() {}

  setValue(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  hasValue(key: string): boolean {
    return !this.isNull(localStorage.getItem(key));
  }

  removeValue(key: string): void {
    return localStorage.removeItem(key);
  }
}
