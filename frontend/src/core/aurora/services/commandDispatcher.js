import { helpCommand, helloCommand, yesCommand, noCommand, authorCommand } from "../commands/help.js";

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

        case "author":

            return authorCommand();

        default:

            return [
                "Unknown command."
            ];

    }

}