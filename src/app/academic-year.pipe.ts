import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'academicYear'
})
export class AcademicYearPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
  
        // Split the input value by the - character 
    const parts = value.split('-');

      // return the first two parts joined by a - character
    return parts.slice(0, 2).join('/');
  }

}
