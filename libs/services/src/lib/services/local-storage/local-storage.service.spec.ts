import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;
  beforeEach(() => {
    localStorageService = new LocalStorageService();
    const store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
  });

  it('should be created', () => {
    const service: LocalStorageService = TestBed.inject(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('should store the key and value in localStorage', () => {
    localStorageService.setValue('key', 'value');
    expect(localStorage.getItem('key')).toEqual('value');
  });

  it('should get the value from localStorage', () => {
    localStorage.setItem('key', 'value');
    expect(localStorageService.getValue('key')).toEqual('value');
  });

  it('should check whether localStorage has some key', () => {
    localStorage.setItem('key', 'value');
    expect(localStorageService.hasValue('key')).toBe(true);
  });
});
