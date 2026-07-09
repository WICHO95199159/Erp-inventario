import { helpCommand, helloCommand, yesCommand, noCommand } from "../commands/help.js";

export function dispatchCommand(command) {

    switch (command) {

        case "help":

            return helpCommand();

        case "hello":

            return helloCommand();

        case "yes":

            return yesCommand();

        case "no":

            return noCommand();

        default:

            return [
                "Unknown command."
            ];

    }

}