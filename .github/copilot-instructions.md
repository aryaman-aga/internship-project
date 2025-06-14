<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Sorting Visualizer Project Instructions

This is a web-based sorting algorithm visualizer built with vanilla HTML, CSS, and JavaScript.

## Project Structure
- `index.html` - Main HTML structure with navigation and controls
- `style.css` - Modern CSS styling with animations and responsive design
- `js/main.js` - Main application controller and initialization
- `js/algorithms.js` - Implementation of all sorting algorithms
- `js/visualizer.js` - Visual effects and animation utilities

## Key Features
- 6 sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, and Heap Sort
- Interactive controls for array size (20-150 elements) and animation speed (1-5)
- Real-time visualization with color-coded states:
  - Blue: Default state
  - Yellow: Elements being compared
  - Red: Elements being swapped
  - Purple: Pivot element (Quick Sort)
  - Green: Sorted elements
- Time and Space complexity information display
- Responsive design for mobile and desktop
- Performance tracking and statistics

## Code Style Guidelines
- Use ES6+ features and modern JavaScript
- Follow object-oriented patterns with prototype methods
- Maintain consistent indentation and naming conventions
- Add comments for complex algorithms and visual effects
- Ensure all animations are smooth and performant
- Keep functions focused and modular

## Algorithm Implementation Notes
- All sorting algorithms are implemented as async functions for visualization
- Use `await this.sleep()` for animation timing
- Call visualization methods (`compare()`, `swap()`, etc.) before array operations
- Track performance metrics (comparisons, swaps, duration)
- Handle edge cases and maintain algorithm correctness

## Visual Design Principles
- Use gradients and modern CSS for attractive appearance
- Implement smooth transitions and hover effects
- Maintain accessibility with proper contrast and sizing
- Ensure responsive behavior across all device sizes
- Use meaningful colors for different algorithm states
