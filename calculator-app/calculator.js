const $prevNum = document.getElementById('prev-num');
const $operator = document.getElementById('operator');
const $currNum = document.getElementById('curr-num');

// Maps innerHTML text of buttons
const keys = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3',
    FOUR: '4',
    FIVE: '5',
    SIX: '6',
    SEVEN: '7',
    EIGHT: '8',
    NINE: '9',
    PERIOD: '.',
    PLUS: '+',
    MINUS: '-',
    PRODUCT: 'x',
    DIVIDE: '/',
    EQUAL: '=',
    BACKSPACE: 'DEL',
    CLEAR: 'RESET'
};

// Maps keyboard key press code to keys
const keyCode = new Map();
keyCode.set('Digit1', keys.ONE);
keyCode.set('Digit2', keys.TWO);
keyCode.set('Digit3', keys.THREE);
keyCode.set('Digit4', keys.FOUR);
keyCode.set('Digit5', keys.FIVE);
keyCode.set('Digit6', keys.SIX);
keyCode.set('Digit7', keys.SEVEN);
keyCode.set('Digit8', keys.EIGHT);
keyCode.set('Digit9', keys.NINE);
keyCode.set('Digit0', keys.ZERO);
keyCode.set('Backspace', keys.BACKSPACE);
keyCode.set('Minus', keys.MINUS);
keyCode.set('Equal', keys.EQUAL);
keyCode.set('Slash', keys.DIVIDE);
keyCode.set('Period', keys.PERIOD);

// Maps innerHTML text to button nodes
const keyMapping = new Map();

function formatNumber(num) {
    num = parseFloat(num)
    return num.toLocaleString('en-US', {
        useGrouping: true,
        maximumFractionDigits: 5,
    });
}

function calculateValue(prev, curr, operator) {
    if (!operator) operator = keys.PLUS;
    if (!prev) prev = '0';
    if (!curr) curr = '0';

    prev = prev.replaceAll(',', '');
    curr = curr.replaceAll(',', '');

    prev = parseFloat(prev);
    curr = parseFloat(curr);
    
    let res = 0;
    switch (operator) {
        case keys.PLUS:
            res = prev + curr;
            break;
        case keys.MINUS:
            res = prev - curr;
            break;
        case keys.PRODUCT:
            res = prev * curr;
            break;
        case keys.DIVIDE:
            res = prev / curr;
            break;
    }
    return formatNumber(res)
}

function getValidatedNumber(char) {
    const original = $currNum.innerHTML;
    
    let curr = original.replaceAll(',', '');
    if (curr.length == 9) return original;

    if (curr === '0' && char !== keys.PERIOD) {
        curr = '';
    }

    curr += char;
    const re = /^\d+.?\d*$/
    if (re.test(curr)) {
        curr = formatNumber(curr);
        return curr;
    } else {
        return original;
    }
}

function handleUpdate(key) {
    if ([keys.PLUS, keys.MINUS, keys.PRODUCT, keys.DIVIDE, keys.EQUAL].includes(key)) {
        const prev = $prevNum.innerHTML;
        const oper = $operator.innerHTML;
        const curr = $currNum.innerHTML;
        const res = calculateValue(prev, curr, oper);
        if (key !== '=') {
            $prevNum.innerHTML = res;
            $operator.innerHTML = key;
            $currNum.innerHTML = 0;
        } else {
            $prevNum.innerHTML = '';
            $operator.innerHTML = '';
            $currNum.innerHTML = res;
        }
    } else if (key === keys.BACKSPACE) {
        let curr = $currNum.innerHTML;
        curr = curr.replaceAll(',', '');
        if (curr.length > 1) {
            curr = curr.substring(0, curr.length - 1);
        } else {
            curr = 0;
        }

        $currNum.innerHTML = formatNumber(curr);
    } else if (key === keys.CLEAR) {
        $prevNum.innerHTML = '';
        $operator.innerHTML = '';
        $currNum.innerHTML = '0';
    } else if (key >= keys.ZERO && key <= keys.NINE || key === keys.PERIOD) {
        $currNum.innerHTML = getValidatedNumber(key);
    }
}

function calculatorKeyPressed(node) {
    if (node.dataset.click === 'true') return;
    
    node.dataset.click = 'true';
    handleUpdate(node.innerHTML);
}

function calculatorKeyUnpressed(node) {
    if (node.dataset.click === 'true') {
        node.dataset.click = 'false';
    }
}

document.querySelectorAll(".keys-holder > button").forEach(node => {
    keyMapping.set(node.innerHTML, node);

    // Mouse click listeners
    node.addEventListener('mousedown', function (e) {
        calculatorKeyPressed(this);
    });

    node.addEventListener('mouseup', function (e) {
        calculatorKeyUnpressed(this);
    });

    node.addEventListener('mouseleave', function (e) {
        calculatorKeyUnpressed(this);
    });

    // Keyboard click using tab to navigate and space or enter to press
    node.addEventListener('keydown', function (e) {
        if (e.code !== 'Space' && e.code !== 'Enter') return;
        calculatorKeyPressed(this);
    });
});

document.addEventListener('keydown', (e) => {
    if (!keyCode.has(e.code))
    return;
    
    let pressed = keyCode.get(e.code);
    if (e.shiftKey) {
        if (e.code === 'Digit8') {
            pressed = 'x';
        } else if (e.code === 'Equal') {
            pressed = '+';
        }
    }
    calculatorKeyPressed(keyMapping.get(pressed))
});

document.addEventListener('keyup', (e) => {
    keyMapping.forEach((node, key) => {
        calculatorKeyUnpressed(node);
    });
});