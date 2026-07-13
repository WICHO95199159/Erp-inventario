import { helpCommand } from "../commands/help.js";
import { helloCommand } from "../commands/hello.js";
import { yesCommand } from "../commands/yes.js";
import { noCommand } from "../commands/no.js";
import { authorCommand } from "../commands/author.js";

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