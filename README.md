# 🧮 Modern Calculator with Theme Toggle

A fully-featured, accessible calculator web application with dark/light theme support and persistent memory storage.

![Calculator Demo](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

### 🎨 **Dual Theme Support**
- **Dark Mode** (Default) - Modern dark theme with cyan accents
- **Light Mode** - Clean, bright theme with blue accents
- **Persistent Theme** - Your theme preference is saved automatically
- **One-Click Toggle** - Large, visible button to switch themes instantly

### 💾 **Memory Storage**
- **Auto-Save History** - All calculations are automatically saved
- **Persistent Memory** - History survives page refreshes and browser restarts
- **Last 10 Calculations** - Keeps your most recent 10 calculations
- **Click to Recall** - Click any history item to load that result

### 🧮 **Calculator Functions**
- ✅ Basic Operations: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- ✅ Decimal Point Support
- ✅ Backspace (DE button) - Delete last character
- ✅ Clear (C) - Clear current entry
- ✅ All Clear (AC) - Reset everything
- ✅ Error Handling - Division by zero protection
- ✅ Expression Display - See your calculation before evaluating

### ⌨️ **Keyboard Support**
- **Numbers**: `0-9`
- **Operators**: `+`, `-`, `*`, `/`
- **Decimal**: `.`
- **Equals**: `Enter`
- **Backspace**: `Backspace`
- **Clear All**: `Escape`

### ♿ **Accessibility Features**
- Full keyboard navigation
- ARIA labels for screen readers
- Focus indicators
- Semantic HTML structure
- Responsive design for all devices

---

## 📁 Project Structure

```
calculator/
│
├── index.html          # Main HTML structure
├── style.css          # All styling and themes
├── app.js             # Calculator logic and functionality
└── README.md          # This file
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs completely client-side!

### Installation

1. **Download the files**
   ```bash
   git clone https://github.com/yourusername/calculator.git
   cd calculator
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js with http-server
   npx http-server
   ```

3. **Start calculating!** 🎉

---

## 💻 Usage

### Basic Operations

1. **Simple Calculation**
   ```
   Click: 5 → + → 3 → =
   Result: 8
   ```

2. **Using Decimal Points**
   ```
   Click: 3 → . → 1 → 4 → × → 2 → =
   Result: 6.28
   ```

3. **Chain Calculations**
   ```
   Click: 10 → + → 5 → + → 3 → =
   Result: 18
   ```

### Theme Toggle

1. Look for the theme button at the top of the calculator
2. In **Dark Mode**, button shows: "☀️ Light Mode"
3. In **Light Mode**, button shows: "🌙 Dark Mode"
4. Click to switch instantly!

### History Features

1. **View History**
   - Click the "History" tab at the top
   - See all your recent calculations

2. **Recall a Calculation**
   - Click any history item
   - The result loads into the calculator
   - Automatically switches back to Calculator tab

3. **Clear History**
   - Click "Clear All" button in History tab
   - Confirm the action
   - All history is permanently deleted

---

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `style.css`:

```css
/* Dark Mode Colors */
:root {
    --bg-main: #1a1a2e;           /* Background color */
    --bg-calc: #16213e;           /* Calculator background */
    --bg-button: #0f3460;         /* Button color */
    --text-color: #fff;           /* Text color */
    --operator-color: #00d9ff;    /* Accent color */
}

/* Light Mode Colors */
[data-theme="light"] {
    --bg-main: #f0f4f8;
    --bg-calc: #ffffff;
    --operator-color: #3182ce;
    /* ... more variables */
}
```

### Modifying History Limit

In `app.js`, find this line:

```javascript
state.history = [{ expression, result, timestamp: Date.now() }, ...state.history].slice(0, 10);
```

Change `10` to your desired number of history items.

---

## 🛠️ Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **LocalStorage API** - For persistent data storage

### Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 60+           |
| Firefox | 55+           |
| Safari  | 11+           |
| Edge    | 79+           |

### Key Features Implementation

**Factory Pattern**
```javascript
const calculator = createCalculator();
// Encapsulates state and methods
```

**LocalStorage Integration**
```javascript
localStorage.setItem('calculator-history', JSON.stringify(state.history));
localStorage.setItem('calculator-theme', theme);
```

**Event Delegation**
```javascript
document.getElementById('calculator-form').addEventListener('click', (e) => {
    // Handle all button clicks efficiently
});
```

---

## 📱 Responsive Design

The calculator automatically adapts to different screen sizes:

- **Desktop** (768px+): Full size with 60px buttons
- **Mobile** (<768px): Compact layout with 50px buttons

---

## 🐛 Known Issues & Limitations

1. **LocalStorage Limit**: Browser localStorage is limited to ~5-10MB
2. **Private Browsing**: History won't persist in incognito/private mode
3. **Floating Point Precision**: JavaScript's inherent floating-point arithmetic limitations (mitigated with rounding)

---

## 🔧 Troubleshooting

### History not saving?
- Check if cookies/localStorage is enabled in your browser
- Disable private/incognito mode
- Clear browser cache and try again

### Theme not changing?
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for JavaScript errors
- Ensure all three files are in the same directory

### Buttons not working?
- Ensure JavaScript is enabled in your browser
- Check browser console for errors
- Verify all files are properly loaded


## 👨‍💻 Authors

**Adolat Gharibshoeva and Farahnoz Ahmadkhonova**
## 📊 Changelog

### Version 1.0.0 (Current)
- ✅ Basic calculator operations
- ✅ Dark/Light theme toggle
- ✅ Persistent history storage
- ✅ Keyboard support
- ✅ Responsive design
- ✅ Accessibility features

---

<div align="center">

**Made with ❤️ and ☕**

</div>
