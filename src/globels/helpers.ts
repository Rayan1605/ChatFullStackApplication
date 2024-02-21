export class Helpers {

    static firstletter = (str: string): string => {
     const Vstring = str.toLowerCase();
        // the split For example, "hello world" becomes ["hello", "world"].
        // then we map through each value and make the first letter capital and the rest of the letters lowercase

        return Vstring.split(' ').map((value: string) => `${value.charAt(0).
     toUpperCase()}${value.slice(1).toLowerCase()}`).join(' ')
    }

    static lowerEmail = (email: string): string => {

        return email.toLowerCase();
}
}