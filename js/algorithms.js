/**
 * Sorting Algorithms Implementation
 * Author: Aryaman Agarwal
 * 
 * Contains implementations of 6 sorting algorithms with
 * visual animation support and step-by-step visualization.
 */

// All methods are added to the SortingVisualizer prototype

// Bubble Sort
SortingVisualizer.prototype.bubbleSort = async function() {
    const n = this.array.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            await this.compare(j, j + 1);
            
            if (this.array[j] > this.array[j + 1]) {
                await this.swap(j, j + 1);
                swapped = true;
            }
            
            // Clear comparison highlighting
            this.clearHighlighting();
        }
        
        // Mark the last element as sorted
        const bars = document.querySelectorAll('.array-bar');
        bars[n - i - 1].classList.add('sorted');
        
        // If no swapping occurred, array is sorted
        if (!swapped) break;
    }
    
    // Mark first element as sorted
    const bars = document.querySelectorAll('.array-bar');
    bars[0].classList.add('sorted');
};

// Selection Sort
SortingVisualizer.prototype.selectionSort = async function() {
    const n = this.array.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Mark current position
        const bars = document.querySelectorAll('.array-bar');
        bars[i].classList.add('comparing');
        
        // Find the minimum element in remaining array
        for (let j = i + 1; j < n; j++) {
            await this.compare(minIndex, j);
            
            if (this.array[j] < this.array[minIndex]) {
                // Remove previous minimum highlighting
                bars[minIndex].classList.remove('comparing');
                minIndex = j;
                bars[minIndex].classList.add('comparing');
            }
            
            await this.sleep(this.animationSpeed / 2);
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            await this.swap(i, minIndex);
        }
        
        // Mark current element as sorted
        this.clearHighlighting();
        bars[i].classList.add('sorted');
    }
    
    // Mark last element as sorted
    const bars = document.querySelectorAll('.array-bar');
    bars[n - 1].classList.add('sorted');
};

// Insertion Sort
SortingVisualizer.prototype.insertionSort = async function() {
    const n = this.array.length;
    const bars = document.querySelectorAll('.array-bar');
    
    // First element is considered sorted
    bars[0].classList.add('sorted');
    
    for (let i = 1; i < n; i++) {
        let key = this.array[i];
        let j = i - 1;
        
        // Highlight current element being inserted
        bars[i].classList.add('comparing');
        await this.sleep(this.animationSpeed);
        
        // Move elements greater than key one position ahead
        while (j >= 0 && this.array[j] > key) {
            await this.compare(j, j + 1);
            
            this.array[j + 1] = this.array[j];
            
            // Update visualization
            bars[j + 1].style.height = `${this.array[j + 1]}px`;
            
            j--;
            await this.sleep(this.animationSpeed);
        }
        
        // Place key in its correct position
        this.array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        
        // Clear highlighting and mark as sorted
        this.clearHighlighting();
        for (let k = 0; k <= i; k++) {
            bars[k].classList.add('sorted');
        }
        
        await this.sleep(this.animationSpeed);
    }
};

// Merge Sort
SortingVisualizer.prototype.mergeSort = async function(left, right) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    
    // Highlight the section being divided
    await this.highlightRange(left, right, 'comparing');
    
    await this.mergeSort(left, mid);
    await this.mergeSort(mid + 1, right);
    await this.merge(left, mid, right);
};

SortingVisualizer.prototype.merge = async function(left, mid, right) {
    const leftArray = [];
    const rightArray = [];
    
    // Copy data to temporary arrays
    for (let i = left; i <= mid; i++) {
        leftArray.push(this.array[i]);
    }
    for (let i = mid + 1; i <= right; i++) {
        rightArray.push(this.array[i]);
    }
    
    let i = 0, j = 0, k = left;
    
    // Merge the temporary arrays back
    while (i < leftArray.length && j < rightArray.length) {
        await this.compare(k, k);
        
        if (leftArray[i] <= rightArray[j]) {
            this.array[k] = leftArray[i];
            i++;
        } else {
            this.array[k] = rightArray[j];
            j++;
        }
        
        // Update visualization
        const bars = document.querySelectorAll('.array-bar');
        bars[k].style.height = `${this.array[k]}px`;
        bars[k].classList.add('swapping');
        
        await this.sleep(this.animationSpeed);
        bars[k].classList.remove('swapping');
        
        k++;
    }
    
    // Copy remaining elements
    while (i < leftArray.length) {
        this.array[k] = leftArray[i];
        const bars = document.querySelectorAll('.array-bar');
        bars[k].style.height = `${this.array[k]}px`;
        i++;
        k++;
        await this.sleep(this.animationSpeed / 2);
    }
    
    while (j < rightArray.length) {
        this.array[k] = rightArray[j];
        const bars = document.querySelectorAll('.array-bar');
        bars[k].style.height = `${this.array[k]}px`;
        j++;
        k++;
        await this.sleep(this.animationSpeed / 2);
    }
    
    // Mark merged section as sorted temporarily
    await this.highlightRange(left, right, 'sorted');
    await this.sleep(this.animationSpeed);
    this.clearRangeHighlighting(left, right);
};

// Quick Sort
SortingVisualizer.prototype.quickSort = async function(low, high) {
    if (low < high) {
        const pivotIndex = await this.partition(low, high);
        
        await this.quickSort(low, pivotIndex - 1);
        await this.quickSort(pivotIndex + 1, high);
    }
};

SortingVisualizer.prototype.partition = async function(low, high) {
    const pivot = this.array[high];
    this.markPivot(high);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        await this.compare(j, high);
        
        if (this.array[j] < pivot) {
            i++;
            if (i !== j) {
                await this.swap(i, j);
            }
        }
        
        await this.sleep(this.animationSpeed / 2);
    }
    
    // Place pivot in correct position
    await this.swap(i + 1, high);
    
    // Mark pivot as sorted
    const bars = document.querySelectorAll('.array-bar');
    bars[i + 1].classList.remove('pivot');
    bars[i + 1].classList.add('sorted');
    
    this.clearHighlighting();
    
    return i + 1;
};

// Heap Sort
SortingVisualizer.prototype.heapSort = async function() {
    const n = this.array.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await this.heapify(n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        await this.swap(0, i);
        
        // Mark as sorted
        const bars = document.querySelectorAll('.array-bar');
        bars[i].classList.add('sorted');
        
        // Call max heapify on the reduced heap
        await this.heapify(i, 0);
    }
    
    // Mark first element as sorted
    const bars = document.querySelectorAll('.array-bar');
    bars[0].classList.add('sorted');
};

SortingVisualizer.prototype.heapify = async function(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Highlight current node
    await this.compare(i, i);
    
    // Check if left child is larger than root
    if (left < n) {
        await this.compare(left, largest);
        if (this.array[left] > this.array[largest]) {
            largest = left;
        }
    }
    
    // Check if right child is larger than largest so far
    if (right < n) {
        await this.compare(right, largest);
        if (this.array[right] > this.array[largest]) {
            largest = right;
        }
    }
    
    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        await this.swap(i, largest);
        await this.heapify(n, largest);
    }
    
    this.clearHighlighting();
};

// Utility methods for range highlighting
SortingVisualizer.prototype.highlightRange = async function(start, end, className) {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = start; i <= end; i++) {
        if (i < bars.length) {
            bars[i].classList.add(className);
        }
    }
    await this.sleep(this.animationSpeed / 2);
};

SortingVisualizer.prototype.clearRangeHighlighting = function(start, end) {
    const bars = document.querySelectorAll('.array-bar');
    for (let i = start; i <= end; i++) {
        if (i < bars.length) {
            bars[i].classList.remove('comparing', 'swapping', 'sorted');
        }
    }
};
