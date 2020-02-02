export default () => {
    let i = 10;
    while (i > 0) {
        JSON.parse(JSON.stringify({ foo: --i }));
    }
}