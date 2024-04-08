import { AvailableInformation, Commands } from '../models/command-line.model';

export const getCommandFromString = (text: string) => {
  const splittedText = text.split(' ');
  const command = text.split(' ')[0];

  return {
    command,
    text: splittedText.slice(1).join(),
  };
};

const CommandSudoAvailableInfo = {
  [AvailableInformation.WIG]: `

this works

`,
  [AvailableInformation.SN]: `Github: <a href="https://github.com/zapatagustin" target="_blank">https://github.com/zapatagustin</a>
Linkedin: <a href="https://www.linkedin.com/in/zapataagustin/" target="_blank">https://www.linkedin.com/in/zapataagustin/</a>
`,
  [AvailableInformation.WTS]: `Angular 17:                     🅰️ <a href="https://angular.dev/" target="_blank">https://angular.dev/</a>h
SCSS:                           🎨 <a href="https://develpoer.modizlla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing" target="_blank"> https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing</a>
Signals:                        🚦 <a href="https://angular.dev/guide/signals" target="_blank">https://angular.dev/guide/signals</a>`,
};

const CommandSUDOActions = (payload: string) => {
  if (!(payload in CommandSudoAvailableInfo)) return `Command Not Recognized`;

  return CommandSudoAvailableInfo[payload as AvailableInformation];
};

const CommandActions = {
  [Commands.HELP]: () => `Command list:
- sudo: sudo command needed to access personal information
- list: list all possible personal information
- clear: clear terminal history
      `,
  [Commands.LIST]: () => `Available information:
- WIG: What is Gentleman Programming ?
- SN: Social Networks
- WTS: Website's Tech Stack
    `,
  [Commands.SUDO]: (payload: string) => CommandSUDOActions(payload),
};

type CommandsWithoutPayload = Commands.HELP | Commands.LIST;

export const CommandMapper = (command: string, payload?: string) => {
  const commandWithoutPayload = [Commands.HELP, Commands.LIST];

  if (command === Commands.SUDO && payload) {
    return CommandActions[command](payload);
  }

  if (commandWithoutPayload.find((cwp) => cwp === command)) {
    return CommandActions[command as CommandsWithoutPayload]();
  }

  return 'Command Not Recognized';
};
