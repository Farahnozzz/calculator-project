const createCalculator = () => {
    // Private state using closure
    let state = {
        current: '0',
        operand: null,
        operator: null,
        history: [],
        waitingForOperand: false,
        error: false,
        expression: ''
    };

    // ES6 Arrow functions and template literals
    const updateDisplay = (value = state.current) => {
        const display = document.getElementById('display');
        const expressionEl = document.getElementById('expression');
        
        display.value = value;
        expressionEl.textContent = state.expression;
        
        // Add/remove error class
        if (state.error) {
            display.classList.add('error');
        } else {
            display.classList.remove('error');
        }
    };

    const updateExpression = () => {
        if (state.operand !== null && state.operator) {
            state.expression = `${state.operand} ${state.operator} ${state.current}`;
        } else {
            state.expression = '';
        }
        updateDisplay();
    };

    const addToHistory = (expression, result) => {
        // Keep only last 10 items using array methods
        state.history = [{ expression, result, timestamp: Date.now() }, ...state.history].slice(0, 10);
        saveHistoryToLocalStorage();
        renderHistory();
    };

    // LocalStorage functions for MEMORY SAVE
    const saveHistoryToLocalStorage = () => {
        try {
            localStorage.setItem('calculator-history', JSON.stringify(state.history));
        } catch (e) {
            console.warn('Could not save history to localStorage');
        }
    };

    const loadHistoryFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem('calculator-history');
            if (saved) {
                state.history = JSON.parse(saved);
                renderHistory();
            }
        } catch (e) {
            console.warn('Could not load history from localStorage');
        }
    };

    const clearHistory = () => {
        state.history = [];
        saveHistoryToLocalStorage();
        renderHistory();
    };

    // ES6 Arrow function with template literals
    const renderHistory = () => {
        const historyEl = document.getElementById('history');
        historyEl.innerHTML = state.history
            .map(({ expression, result }, index) => `
                <div class="history-item" 
                     tabindex="0" 
                     role="button"
                     aria-label="Recall calculation: ${expression} equals ${result}"
                     data-index="${index}">
                    <span class="expr">${expression}</span>
                    <span class="res">= ${result}</span>
                </div>
            `)
            .join('');

        // Add click handlers to history items
        historyEl.querySelectorAll('.history-item').forEach((item, index) => {
            item.addEventListener('click', () => recallFromHistory(index));
            item.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    recallFromHistory(index);
                }
            });
        });
    };

    const recallFromHistory = (index) => {
        const item = state.history[index];
        if (item) {
            state.current = String(item.result);
            state.operand = null;
            state.operator = null;
            state.waitingForOperand = false;
            state.error = false;
            state.expression = '';
            updateDisplay();
            
            // Switch to calculator tab
            switchTab('calculator');
        }
    };

    // ES6 Default parameters
    const inputDigit = (digit = '0') => {
        if (state.error) {
            allClear();
        }

        if (state.waitingForOperand) {
            state.current = digit;
            state.waitingForOperand = false;
        } else {
            state.current = state.current === '0' ? digit : state.current + digit;
        }
        updateExpression();
    };

    const inputDecimal = () => {
        if (state.error) {
            allClear();
        }

        if (state.waitingForOperand) {
            state.current = '0.';
            state.waitingForOperand = false;
        } else if (!state.current.includes('.')) {
            state.current += '.';
        }
        updateExpression();
    };

    // ES6 Arrow function
    const chooseOperator = (nextOperator) => {
        if (state.error) {
            allClear();
        }

        const inputValue = parseFloat(state.current);

        if (state.operand === null) {
            state.operand = inputValue;
        } else if (state.operator) {
            const result = performOperation();
            
            if (state.error) {
                return;
            }

            state.current = String(result);
            state.operand = result;
        }

        state.waitingForOperand = true;
        state.operator = nextOperator;
        updateExpression();
    };

    // ES6 Arrow function with destructuring
    const performOperation = () => {
        const { operand, operator, current } = state;
        const inputValue = parseFloat(current);

        if (operator === '+') return operand + inputValue;
        if (operator === '-') return operand - inputValue;
        if (operator === '*') return operand * inputValue;
        if (operator === '/') {
            if (inputValue === 0) {
                state.error = true;
                state.expression = 'Cannot divide by zero';
                updateDisplay('Error');
                setTimeout(() => {
                    state.error = false;
                    state.current = '0';
                    state.operand = null;
                    state.operator = null;
                    state.expression = '';
                    updateDisplay();
                }, 2000);
                return 0;
            }
            return operand / inputValue;
        }

        return inputValue;
    };

    const evaluate = () => {
        if (state.error) return;

        const inputValue = parseFloat(state.current);

        if (state.operator && state.operand !== null) {
            const expression = `${state.operand} ${state.operator} ${state.current}`;
            const result = performOperation();

            if (!state.error) {
                // Round to avoid floating point issues
                const roundedResult = Math.round(result * 100000000) / 100000000;
                state.current = String(roundedResult);
                state.operand = null;
                state.operator = null;
                state.waitingForOperand = false;
                state.expression = '';
                
                addToHistory(expression, roundedResult);
                updateDisplay();
            }
        }
    };

    const clear = () => {
        state.current = '0';
        state.waitingForOperand = false;
        state.error = false;
        state.expression = '';
        updateDisplay();
    };

    const allClear = () => {
        state.current = '0';
        state.operand = null;
        state.operator = null;
        state.waitingForOperand = false;
        state.error = false;
        state.expression = '';
        updateDisplay();
    };

    const backspace = () => {
        if (state.error) {
            allClear();
            return;
        }

        if (!state.waitingForOperand) {
            state.current = state.current.length > 1 
                ? state.current.slice(0, -1) 
                : '0';
            updateExpression();
        }
    };

    // ES6 Spread operator for toJSON
    const toJSON = () => ({
        ...state,
        timestamp: new Date().toISOString()
    });

    // Public API - returning object with methods
    return {
        inputDigit,
        inputDecimal,
        chooseOperator,
        evaluate,
        clear,
        allClear,
        backspace,
        toJSON,
        updateDisplay,
        loadHistoryFromLocalStorage,
        clearHistory,
        getState: () => ({ ...state })
    };
};

// Theme Management WITH LOCALSTORAGE
const themeManager = {
    init() {
        const savedTheme = localStorage.getItem('calculator-theme') || 'dark';
        this.setTheme(savedTheme);
        
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('calculator-theme', theme);
        
        const themeText = document.querySelector('.theme-text');
        if (themeText) {
            if (theme === 'light') {
                themeText.textContent = '🌙 Dark Mode';
            } else {
                themeText.textContent = '☀️ Light Mode';
            }
        }
    }
};

// Tab Management
const switchTab = (tabName) => {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tabName === 'calculator') {
        document.getElementById('calculator-view').classList.add('active');
    } else {
        document.getElementById('history-view').classList.add('active');
    }
};

// Initialize calculator
const calculator = createCalculator();

// Event delegation for calculator buttons
document.getElementById('calculator-form').addEventListener('click', (e) => {
    if (e.target.tagName !== 'INPUT' || e.target.type !== 'button') return;

    const { action, value, operator } = e.target.dataset;

    if (action === 'all-clear') {
        calculator.allClear();
    } else if (action === 'clear') {
        calculator.clear();
    } else if (action === 'backspace') {
        calculator.backspace();
    } else if (action === 'equals') {
        calculator.evaluate();
    } else if (operator) {
        calculator.chooseOperator(operator);
    } else if (value === '.') {
        calculator.inputDecimal();
    } else if (value) {
        calculator.inputDigit(value);
    }
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

// Clear history button
document.getElementById('clear-history').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all history?')) {
        calculator.clearHistory();
    }
});

// Keyboard support using ES6 arrow function
document.addEventListener('keydown', (e) => {
    // Prevent default for calculator keys
    if (/^[0-9+\-*/.]$/.test(e.key) || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Escape') {
        e.preventDefault();
    }

    // Numbers
    if (/^[0-9]$/.test(e.key)) {
        calculator.inputDigit(e.key);
    }
    // Operators
    else if (e.key === '+') calculator.chooseOperator('+');
    else if (e.key === '-') calculator.chooseOperator('-');
    else if (e.key === '*') calculator.chooseOperator('*');
    else if (e.key === '/') calculator.chooseOperator('/');
    // Special keys
    else if (e.key === '.') calculator.inputDecimal();
    else if (e.key === 'Enter') calculator.evaluate();
    else if (e.key === 'Backspace') calculator.backspace();
    else if (e.key === 'Escape') calculator.allClear();
});

// Prevent form submission
document.getElementById('calculator-form').addEventListener('submit', (e) => {
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    calculator.loadHistoryFromLocalStorage();
    calculator.updateDisplay();
});

console.log('Calculator initialized with memory save feature');
