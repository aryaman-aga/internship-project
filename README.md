# Sorting Visualizer

A beautiful and interactive web application that visualizes various sorting algorithms in real-time. Built with vanilla HTML, CSS, and JavaScript.

![Sorting Visualizer Demo](https://img.shields.io/badge/demo-live-brightgreen)

## 🚀 Features

### Sorting Algorithms
- **Bubble Sort** - O(n²) time complexity
- **Selection Sort** - O(n²) time complexity  
- **Insertion Sort** - O(n²) time complexity
- **Merge Sort** - O(n log n) time complexity
- **Quick Sort** - O(n log n) average time complexity
- **Heap Sort** - O(n log n) time complexity

### Interactive Controls
- **Array Size Control** - Adjust from 20 to 150 elements
- **Animation Speed** - 5 different speed levels
- **Generate New Array** - Create random arrays for testing
- **Algorithm Selection** - Choose from 6 different algorithms

### Visual Features
- **Color-coded Visualization**:
  - 🔵 Blue: Default/unsorted elements
  - 🟡 Yellow: Elements being compared
  - 🔴 Red: Elements being swapped
  - 🟣 Purple: Pivot element (Quick Sort)
  - 🟢 Green: Sorted elements

- **Real-time Complexity Display** - Shows time and space complexity
- **Performance Statistics** - Tracks comparisons, swaps, and duration
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Fluid transitions and effects

## 🛠️ Technologies Used

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Sorting algorithms and interactive features
- **No external dependencies** - Pure vanilla implementation

## 📱 Responsive Design

The visualizer automatically adapts to different screen sizes:
- **Mobile (< 480px)**: Optimized layout with reduced array size
- **Tablet (480px - 1200px)**: Stacked layout for better viewing
- **Desktop (> 1200px)**: Full three-column layout

## 🎯 Algorithm Complexity

| Algorithm | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No additional software or dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start visualizing sorting algorithms!

### Project Structure
```
sorting-visualizer/
├── index.html              # Main HTML file
├── style.css               # CSS styling and animations
├── js/
│   ├── main.js             # Main application controller
│   ├── algorithms.js       # Sorting algorithm implementations
│   └── visualizer.js       # Visual effects and utilities
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 💻 Usage

1. **Select Array Size**: Use the slider to adjust the number of elements (20-150)
2. **Choose Speed**: Set animation speed from 1 (slowest) to 5 (fastest)
3. **Generate Array**: Click "Generate New Array" to create a new random dataset
4. **Select Algorithm**: Click on any algorithm button to start visualization
5. **Watch the Magic**: Observe the sorting process with color-coded animations

## 🎨 Customization

The visualizer supports various customization options:

### Color Themes
Modify the CSS variables in `style.css` to change the color scheme:
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #5dade2;
  --accent-color: #f39c12;
  /* ... more variables */
}
```

### Animation Speed
Adjust the base animation timing in `js/main.js`:
```javascript
this.animationSpeed = 200 - (this.speed * 30);
```

### Array Size Limits
Modify the range limits in `index.html`:
```html
<input id="arraySize" type="range" min="20" max="150" step="1" value="80">
```

## 🔧 Development

### Code Structure
- **Object-Oriented Design**: Main `SortingVisualizer` class with prototype methods
- **Async/Await**: Smooth animations using asynchronous programming
- **Modular Architecture**: Separate files for algorithms, visualization, and main logic
- **Performance Tracking**: Built-in statistics and timing measurements

### Adding New Algorithms
1. Add the algorithm implementation to `js/algorithms.js`
2. Update the complexity information in `js/main.js`
3. Add the algorithm button to `index.html`
4. Include the case in the switch statement

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- IE11: Limited support (requires polyfills)

## 📈 Performance

The visualizer is optimized for smooth performance:
- **Efficient DOM Updates**: Minimal reflows and repaints
- **Optimized Animations**: CSS transforms and transitions
- **Memory Management**: Garbage collection friendly
- **Responsive Throttling**: Adaptive timing based on array size

## 🤝 Contributing

Contributions are welcome! Here are some ways to contribute:
- Report bugs and issues
- Suggest new features or algorithms
- Improve documentation
- Optimize performance
- Add new visual themes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by sorting algorithm visualizers across the web
- Built as an educational tool for understanding algorithm complexity
- Designed with modern web standards and accessibility in mind

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure JavaScript is enabled
3. Try refreshing the page
4. Use a modern web browser

---

**Happy Sorting! 🎉**

*Built with ❤️ using vanilla JavaScript*
