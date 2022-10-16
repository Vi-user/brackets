module.exports = function check(str, bracketsConfig) {
  // your solution
    if (str.length === 0) return true;
    const stack = [];
    const openScopes = bracketsConfig.map(el => el[0]);
    const closeScopes = bracketsConfig.map(el => el[1]);
    const similarScopes = bracketsConfig.filter(el => el[0] === el[1]).map(el => el[0])
    for (let i = 0; i < str.length; i++) {
        if ((stack.length === 0) && !(openScopes.includes(str[i]))) return false;
        if ((stack.length === 0) && openScopes.includes(str[i])) {
            stack.push(str[i]);
            continue;
        };
        if (similarScopes.includes(str[i])) {
            const lastSymbol = stack[stack.length-1];
            if (lastSymbol === str[i]) {
                stack.pop();
                continue;
            } else {
                stack.push(str[i]);
                continue;
            }
        }
        if (stack.length > 0 && closeScopes.includes(str[i])) {
            const lastSymbol = stack[stack.length-1];
            const pairOfLastSymbol = bracketsConfig.find(el => el[0] === lastSymbol);
            if (str[i] === pairOfLastSymbol[1]) {
                stack.pop();
                continue;
            } else {
                return false
            }
        }
        if (stack.length > 0 && !(closeScopes.includes(str[i]))) {
            stack.push(str[i]);
            continue;
        }
    }
    return (stack.length === 0);
}
