/**
 * Sorting Visualizer - Interactive Algorithm Visualization
 * 
 * Author: Aryaman Agarwal
 * 
 * A comprehensive sorting algorithm visualizer with responsive design
 * and interactive controls. Supports 6 different sorting algorithms
 * with real-time visualization and performance tracking.
 */

// Main application controller
class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 80;
        this.speed = 3;
        this.isAnimating = false;
        this.animationSpeed = 50;
        this.algorithmComplexities = {
            bubble: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n²)',
                timeBest: 'O(n)',
                spaceWorst: 'O(1)'
            },
            selection: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n²)',
                timeBest: 'O(n²)',
                spaceWorst: 'O(1)'
            },
            insertion: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n²)',
                timeBest: 'O(n)',
                spaceWorst: 'O(1)'
            },
            merge: {
                timeWorst: 'O(n log n)',
                timeAverage: 'O(n log n)',
                timeBest: 'O(n log n)',
                spaceWorst: 'O(n)'
            },
            quick: {
                timeWorst: 'O(n²)',
                timeAverage: 'O(n log n)',
                timeBest: 'O(n log n)',
                spaceWorst: 'O(log n)'
            },
            heap: {
                timeWorst: 'O(n log n)',
                timeAverage: 'O(n log n)',
                timeBest: 'O(n log n)',
                spaceWorst: 'O(1)'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.adjustArraySizeForScreen(); // Set appropriate size for current screen
        
        // Set optimal initial array size
        const optimalSize = this.getOptimalArraySize();
        if (optimalSize !== this.arraySize) {
            this.arraySize = optimalSize;
            document.getElementById('arraySize').value = optimalSize;
            document.getElementById('arraySizeValue').textContent = optimalSize;
        }
        
        this.generateArray();
        this.updateSpeedDisplay();
    }

    setupEventListeners() {
        // Array size slider
        const arraySizeSlider = document.getElementById('arraySize');
        arraySizeSlider.addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            document.getElementById('arraySizeValue').textContent = this.arraySize;
            if (!this.isAnimating) {
                this.generateArray();
            }
        });

        // Speed slider
        const speedSlider = document.getElementById('speed');
        speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            this.updateSpeedDisplay();
        });

        // Generate array button
        const generateBtn = document.getElementById('generateArray');
        generateBtn.addEventListener('click', () => {
            if (!this.isAnimating) {
                this.generateArray();
            }
        });

        // Algorithm buttons
        const algoButtons = document.querySelectorAll('.algo-btn');
        algoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isAnimating) {
                    const algorithm = e.target.dataset.algo;
                    this.startSorting(algorithm);
                }
            });
        });

        // Window resize event
        window.addEventListener('resize', this.debounceResize(() => {
            this.adjustArraySizeForScreen();
        }, 250));
    }

    generateArray() {
        this.array = [];
        const container = document.getElementById('arrayContainer');
        container.innerHTML = '';

        // Generate random array
        for (let i = 0; i < this.arraySize; i++) {
            const value = this.generateResponsiveValues();
            this.array.push(value);
        }

        // Create visual bars
        this.renderArray();
        this.clearComplexityInfo();
        this.updateStatus('Array generated. Select an algorithm to start sorting.');
    }

    renderArray() {
        const container = document.getElementById('arrayContainer');
        container.innerHTML = '';

        // Wait for container to be properly sized
        setTimeout(() => {
            const containerWidth = container.offsetWidth - 32; // Account for padding
            const margin = window.innerWidth < 768 ? 0.5 : 1; // Responsive margin
            const totalMarginSpace = this.arraySize * (margin * 2);
            const availableWidth = containerWidth - totalMarginSpace;
            const barWidth = Math.max(1, Math.floor(availableWidth / this.arraySize));
            
            // Ensure bars don't exceed container
            const maxBarWidth = Math.min(barWidth, 50);

            this.array.forEach((value, index) => {
                const bar = document.createElement('div');
                bar.className = 'array-bar';
                bar.style.height = `${value}px`;
                bar.style.width = `${maxBarWidth}px`;
                bar.style.marginLeft = `${margin}px`;
                bar.style.marginRight = `${margin}px`;
                bar.dataset.index = index;
                bar.dataset.value = value;
                container.appendChild(bar);
            });
        }, 10);
    }

    updateSpeedDisplay() {
        document.getElementById('speedValue').textContent = this.speed;
        // Much faster animation speed - minimal delays
        this.animationSpeed = Math.max(1, 20 - (this.speed * 3));
    }

    async startSorting(algorithm) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.disableControls();
        this.highlightSelectedAlgorithm(algorithm);
        this.displayComplexity(algorithm);
        this.updateStatus(`Sorting with ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort...`);

        // Reset array visualization
        this.resetBarStyles();

        try {
            switch (algorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'merge':
                    await this.mergeSort(0, this.array.length - 1);
                    break;
                case 'quick':
                    await this.quickSort(0, this.array.length - 1);
                    break;
                case 'heap':
                    await this.heapSort();
                    break;
            }

            // Mark all bars as sorted
            await this.markAllSorted();
            this.updateStatus('Sorting completed!');
        } catch (error) {
            console.error('Sorting error:', error);
            this.updateStatus('Sorting interrupted.');
        }

        this.isAnimating = false;
        this.enableControls();
        this.clearAlgorithmSelection();
    }

    disableControls() {
        document.getElementById('arraySize').disabled = true;
        document.getElementById('generateArray').disabled = true;
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.add('disabled');
        });
    }

    enableControls() {
        document.getElementById('arraySize').disabled = false;
        document.getElementById('generateArray').disabled = false;
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.remove('disabled');
        });
    }

    highlightSelectedAlgorithm(algorithm) {
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-algo="${algorithm}"]`).classList.add('selected');
    }

    clearAlgorithmSelection() {
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }

    displayComplexity(algorithm) {
        const complexity = this.algorithmComplexities[algorithm];
        document.getElementById('timeWorst').textContent = complexity.timeWorst;
        document.getElementById('timeAverage').textContent = complexity.timeAverage;
        document.getElementById('timeBest').textContent = complexity.timeBest;
        document.getElementById('spaceWorst').textContent = complexity.spaceWorst;
    }

    clearComplexityInfo() {
        document.getElementById('timeWorst').textContent = '-';
        document.getElementById('timeAverage').textContent = '-';
        document.getElementById('timeBest').textContent = '-';
        document.getElementById('spaceWorst').textContent = '-';
    }

    updateStatus(message) {
        document.getElementById('statusText').textContent = message;
    }

    resetBarStyles() {
        document.querySelectorAll('.array-bar').forEach(bar => {
            bar.className = 'array-bar';
        });
    }

    async markAllSorted() {
        const bars = document.querySelectorAll('.array-bar');
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.add('sorted');
            await this.sleep(1); // Very fast completion
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Utility method to swap array elements and update visualization
    async swap(i, j) {
        if (i === j) return;

        // Swap in array
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];

        // Update visualization instantly
        const bars = document.querySelectorAll('.array-bar');
        const bar1 = bars[i];
        const bar2 = bars[j];

        // Add swapping color
        bar1.classList.add('swapping');
        bar2.classList.add('swapping');

        // Update heights
        bar1.style.height = `${this.array[i]}px`;
        bar2.style.height = `${this.array[j]}px`;

        await this.sleep(this.animationSpeed);

        // Remove swapping color
        bar1.classList.remove('swapping');
        bar2.classList.remove('swapping');
    }

    // Utility method to highlight bars being compared
    async compare(i, j) {
        const bars = document.querySelectorAll('.array-bar');
        
        // Clear previous comparisons
        bars.forEach(bar => bar.classList.remove('comparing'));
        
        // Highlight current comparison
        if (i < bars.length) bars[i].classList.add('comparing');
        if (j < bars.length) bars[j].classList.add('comparing');

        await this.sleep(this.animationSpeed);
    }

    // Utility method to mark a bar as pivot
    markPivot(index) {
        const bars = document.querySelectorAll('.array-bar');
        bars.forEach(bar => bar.classList.remove('pivot'));
        if (index < bars.length) {
            bars[index].classList.add('pivot');
        }
    }

    // Utility method to clear all highlighting
    clearHighlighting() {
        document.querySelectorAll('.array-bar').forEach(bar => {
            bar.classList.remove('comparing', 'swapping', 'pivot');
        });
    }

    // Generate responsive array values based on screen size
    generateResponsiveValues() {
        const container = document.getElementById('arrayContainer');
        const containerHeight = container.offsetHeight || 400; // Fallback height
        
        // Responsive height calculation based on screen size
        let maxHeight, minHeight;
        
        if (window.innerWidth < 480) {
            maxHeight = Math.min(150, containerHeight * 0.7);
            minHeight = 15;
        } else if (window.innerWidth < 768) {
            maxHeight = Math.min(200, containerHeight * 0.75);
            minHeight = 20;
        } else {
            maxHeight = Math.min(350, containerHeight * 0.8);
            minHeight = 25;
        }
        
        return Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    }

    // Auto-adjust array size for optimal performance on current device
    getOptimalArraySize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Calculate optimal size based on screen dimensions and pixel density
        let optimalSize;
        
        if (screenWidth < 320) {
            optimalSize = 25;
        } else if (screenWidth < 480) {
            optimalSize = Math.min(40, Math.floor(screenWidth / 8));
        } else if (screenWidth < 768) {
            optimalSize = Math.min(60, Math.floor(screenWidth / 10));
        } else if (screenWidth < 1200) {
            optimalSize = Math.min(100, Math.floor(screenWidth / 12));
        } else {
            optimalSize = Math.min(150, Math.floor(screenWidth / 15));
        }
        
        // Adjust for high DPI screens
        if (devicePixelRatio > 1.5) {
            optimalSize = Math.floor(optimalSize * 0.8);
        }
        
        return Math.max(20, optimalSize);
    }

    // Debounced resize handler for better performance
    debounceResize(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

// Initialize the application
let visualizer;
document.addEventListener('DOMContentLoaded', () => {
    visualizer = new SortingVisualizer();
});
