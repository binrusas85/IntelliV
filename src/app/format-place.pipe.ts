import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPlace',
  standalone: true
})
export class FormatPlacePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value
      .split('_') // Split the string by underscores
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(' '); // Join the words back into a string with spaces
  }

}
