export const getCLIUsername = () => {
    const usernameArg = process.argv.find((arg) => arg.startsWith('--username='));
    const username = usernameArg ? usernameArg.split('=')[1] : 'Guest';
    return username;
}