export class Formatar {
    year?: string;
    month?: string;
    day?: string;
    h?: string;
    m?: string;
    s?: string;
    constructor(date: any){
        const current = new Date(date);
        if (date instanceof Date) {
            this.year = String(date.getFullYear());
            this.month = (date.getMonth() + 1).toString().padStart(2, '0');
            this.day = date.getDate().toString().padStart(2, '0');
            this.h = date.getHours().toString().padStart(2, '0');
            this.m = date.getMinutes().toString().padStart(2, '0');
            this.s = date.getSeconds().toString().padStart(2, '0');
        } else if (typeof date === 'object' && date.$d instanceof Date) {
            this.year = date.$d.getFullYear();
            this.month = (date.$d.getMonth() + 1).toString().padStart(2, '0');
            this.day = date.$d.getDate().toString().padStart(2, '0');
            this.h = date.$d.getHours().toString().padStart(2, '0');
            this.m = date.$d.getMinutes().toString().padStart(2, '0');
            this.s = date.$d.getSeconds().toString().padStart(2, '0');
        } else if (typeof date === 'string') {
            this.year = String(current.getFullYear());
            this.month = (current.getMonth() + 1).toString().padStart(2, '0');
            this.day = current.getDate().toString().padStart(2, '0');
            this.h = current.getHours().toString().padStart(2, '0');
            this.m = current.getMinutes().toString().padStart(2, '0');
            this.s = current.getSeconds().toString().padStart(2, '0');
        }
    }
    dataGeralPT(): string { return `${this.day}/${this.month}/${this.year} ${this.h}:${this.m}:${this.s}`}
    dataAbreviadaPT(): string { return `${this.day}/${this.month}/${this.year}`}
    dataGeral(): string { return `${this.year}-${this.month}-${this.day}  ${this.h}:${this.m}:${this.s}`}
    dataAbreviada(): string { return `${this.year}-${this.month}-${this.day}`}
    intervalo(): string { return `${this.day}/${this.month}`}
}
export function convertSecondsToTime(seconds: any) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor((seconds % 3600) % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);
    const zeroEsquerda = (value: number) => {
        return value.toString().padStart(2, '0');
      };
    return `${zeroEsquerda(hours)}:${zeroEsquerda(minutes)}:${zeroEsquerda(remainingSeconds)}:${zeroEsquerda(milliseconds)}`;
  }