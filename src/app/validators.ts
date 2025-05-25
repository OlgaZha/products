import {FormControl, ValidationErrors} from '@angular/forms';

export function forbiddenName(word: string) {
  return (control: FormControl): ValidationErrors | null => {
    let value: string = control.value;
    if(value && value.toLowerCase().includes(word.toLowerCase()) ){
      return { forbiddenWord: {keyword: word} };
    } else {
      return null;
    }
  }
}
