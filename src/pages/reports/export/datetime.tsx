
export function DateFormat(date : any){
    let year, month, day;
    if (date instanceof Date) {

        year = date.getFullYear();
        month = (date.getMonth() + 1).toString().padStart(2, '0');
        day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;

    } else if (typeof date === 'object' && date.$d instanceof Date) {
        year = date.$d.getFullYear();
        month = (date.$d.getMonth() + 1).toString().padStart(2, '0');
        day = date.$d.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;

    } else if (typeof date === 'string') {

        const dateFormat = new Date(date);
        year = dateFormat.getFullYear();
        month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
        day = dateFormat.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return null;

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
