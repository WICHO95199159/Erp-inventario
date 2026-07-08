import { helpCommand } from "../commands/help.js";

export function dispatchCommand(command) {

    switch (command) {

        case "help":

            return helpCommand();

        default:

            return [
                "Unknown command."
            ];

    }

}