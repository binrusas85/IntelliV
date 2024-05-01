import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Model {
  name: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private selectedModel = new BehaviorSubject<Model | null>(null);

  setSelectedModel(model: Model) {
    this.selectedModel.next(model);
    console.log(`Model Service ===> ${JSON.stringify(model)}`);
  }

  getSelectedModel() {
    return this.selectedModel.asObservable();
  }
}
