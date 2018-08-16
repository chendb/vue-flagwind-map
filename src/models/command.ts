// tslint:disable-next-line:interface-name
export default class Command<T> {
    public constructor(
        public execute: (o: T) => void,
        public time: number = new Date().getTime()
    ) {}

    public static get EMPTY() {
        return new Command<any>(l => {
            console.log("Command is EMPTY");
        });
    }
}
