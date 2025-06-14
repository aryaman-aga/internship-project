/**
 * Visualization Utilities and Enhancements
 * Author: Aryaman Agarwal
 * 
 * Provides visual effects, responsive behavior, and
 * performance optimizations for the sorting visualizer.
 */

// Enhanced visualization effects
SortingVisualizer.prototype.createRippleEffect = function(index) {
    const bars = document.querySelectorAll('.array-bar');
    const bar = bars[index];
    
    if (!bar) return;
    
    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    bar.style.position = 'relative';
    bar.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
};

// Add sound effects (optional - can be enabled/disabled)
SortingVisualizer.prototype.playSound = function(frequency, duration = 100) {
    if (!this.soundEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
        // Silently fail if audio context is not supported
        console.warn('Audio not supported in this browser');
    }
};

// Enhanced swap without visual effects - keep it simple
SortingVisualizer.prototype.swapWithEffects = async function(i, j) {
    if (i === j) return;
    
    // Perform the actual swap without effects
    await this.swap(i, j);
};

// Progress tracking
SortingVisualizer.prototype.updateProgress = function(current, total) {
    const percentage = Math.round((current / total) * 100);
    this.updateStatus(`Sorting progress: ${percentage}% (${current}/${total})`);
};

// Performance statistics
SortingVisualizer.prototype.startPerformanceTracking = function() {
    this.startTime = performance.now();
    this.comparisons = 0;
    this.swaps = 0;
};

SortingVisualizer.prototype.trackComparison = function() {
    this.comparisons++;
};

SortingVisualizer.prototype.trackSwap = function() {
    this.swaps++;
};

SortingVisualizer.prototype.endPerformanceTracking = function() {
    if (!this.startTime) return;
    
    const endTime = performance.now();
    const duration = (endTime - this.startTime).toFixed(2);
    
    console.log(`Performance Statistics:
        Duration: ${duration}ms
        Comparisons: ${this.comparisons}
        Swaps: ${this.swaps}
        Array Size: ${this.array.length}`);
    
    this.updateStatus(`Completed in ${duration}ms with ${this.comparisons} comparisons and ${this.swaps} swaps`);
};

// Array state management for undo/redo functionality
SortingVisualizer.prototype.saveState = function() {
    if (!this.history) this.history = [];
    this.history.push([...this.array]);
    
    // Limit history to prevent memory issues
    if (this.history.length > 100) {
        this.history.shift();
    }
};

SortingVisualizer.prototype.restoreState = function(index = -1) {
    if (!this.history || this.history.length === 0) return;
    
    const stateIndex = index === -1 ? this.history.length - 1 : index;
    if (stateIndex >= 0 && stateIndex < this.history.length) {
        this.array = [...this.history[stateIndex]];
        this.renderArray();
    }
};

// Color theme management
SortingVisualizer.prototype.setColorTheme = function(theme) {
    const themes = {
        default: {
            primary: '#3498db',
            secondary: '#5dade2',
            comparing: '#f39c12',
            swapping: '#e74c3c',
            sorted: '#27ae60',
            pivot: '#9b59b6'
        },
        ocean: {
            primary: '#006994',
            secondary: '#47b8e0',
            comparing: '#ffc952',
            swapping: '#ff6b6b',
            sorted: '#34c759',
            pivot: '#af52de'
        },
        forest: {
            primary: '#2d5016',
            secondary: '#68a225',
            comparing: '#ff9500',
            swapping: '#ff3b30',
            sorted: '#30d158',
            pivot: '#bf5af2'
        }
    };
    
    if (themes[theme]) {
        this.currentTheme = themes[theme];
        this.applyTheme();
    }
};

SortingVisualizer.prototype.applyTheme = function() {
    if (!this.currentTheme) return;
    
    const style = document.createElement('style');
    style.textContent = `
        .array-bar {
            background: linear-gradient(to top, ${this.currentTheme.primary}, ${this.currentTheme.secondary}) !important;
        }
        .array-bar.comparing {
            background: linear-gradient(to top, ${this.currentTheme.comparing}, ${this.currentTheme.comparing}dd) !important;
        }
        .array-bar.swapping {
            background: linear-gradient(to top, ${this.currentTheme.swapping}, ${this.currentTheme.swapping}dd) !important;
        }
        .array-bar.sorted {
            background: linear-gradient(to top, ${this.currentTheme.sorted}, ${this.currentTheme.sorted}dd) !important;
        }
        .array-bar.pivot {
            background: linear-gradient(to top, ${this.currentTheme.pivot}, ${this.currentTheme.pivot}dd) !important;
        }
    `;
    
    // Remove existing theme styles
    const existingTheme = document.getElementById('theme-styles');
    if (existingTheme) {
        existingTheme.remove();
    }
    
    style.id = 'theme-styles';
    document.head.appendChild(style);
};

// Responsive array size adjustment
SortingVisualizer.prototype.adjustArraySizeForScreen = function() {
    const screenWidth = window.innerWidth;
    let maxSize;
    
    if (screenWidth < 480) {
        maxSize = 40;
    } else if (screenWidth < 768) {
        maxSize = 60;
    } else if (screenWidth < 1200) {
        maxSize = 100;
    } else {
        maxSize = 150;
    }
    
    const arraySizeSlider = document.getElementById('arraySize');
    arraySizeSlider.max = maxSize;
    
    if (this.arraySize > maxSize) {
        this.arraySize = maxSize;
        arraySizeSlider.value = maxSize;
        document.getElementById('arraySizeValue').textContent = maxSize;
        this.generateArray();
    }
};

// Enhanced responsive behavior
SortingVisualizer.prototype.handleResize = function() {
    if (!this.isAnimating) {
        this.adjustArraySizeForScreen();
        // Re-render array with new dimensions
        setTimeout(() => {
            this.renderArray();
        }, 100);
    }
};

// Initialize responsive behavior with debouncing
const debouncedResize = () => {
    if (visualizer && !visualizer.isAnimating) {
        visualizer.handleResize();
    }
};

window.addEventListener('resize', visualizer ? visualizer.debounceResize(debouncedResize, 300) : debouncedResize);

// Also handle orientation change on mobile devices
window.addEventListener('orientationchange', () => {
    if (visualizer && !visualizer.isAnimating) {
        setTimeout(() => {
            visualizer.handleResize();
        }, 500); // Longer delay for orientation change
    }
});

// Add simple CSS for clean bars
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .array-bar {
            transition: background-color 0.1s ease;
        }
    `;
    document.head.appendChild(style);
});
