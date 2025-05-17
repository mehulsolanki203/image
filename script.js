document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resultArea = document.getElementById('resultArea');
    const loadingModal = document.getElementById('loadingModal');
    const conversionProgress = document.getElementById('conversionProgress');
    const originalImage = document.getElementById('originalImage');
    const convertedImage = document.getElementById('convertedImage');
    const originalSize = document.getElementById('originalSize');
    const originalResolution = document.getElementById('originalResolution');
    const convertedSize = document.getElementById('convertedSize');
    const convertedResolution = document.getElementById('convertedResolution');
    
    let uploadedFile = null;
    let convertedFileUrl = null;

    // Event Listeners
    fileInput.addEventListener('change', handleFileSelect);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    convertBtn.addEventListener('click', convertImage);
    downloadBtn.addEventListener('click', downloadImage);

    // Functions

    // Add this to your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for features
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.style.borderColor = 'var(--primary-color)';
        dropZone.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.style.borderColor = '#ddd';
        dropZone.style.backgroundColor = '#fafbff';
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        handleDragLeave(e);
        
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    }

    function processFile(file) {
        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, or WEBP)');
            return;
        }
        
        // Check file size (20MB max)
        if (file.size > 20 * 1024 * 1024) {
            alert('File size exceeds 20MB limit');
            return;
        }
        
        uploadedFile = file;
        
        // Display original image
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage.src = e.target.result;
            
            // Get image dimensions
            const img = new Image();
            img.onload = function() {
                originalResolution.textContent = `${img.width} × ${img.height}`;
            };
            img.src = e.target.result;
            
            // Display file size
            originalSize.textContent = formatFileSize(file.size);
        };
        reader.readAsDataURL(file);
        
        // Hide result area if shown from previous conversion
        resultArea.classList.add('hidden');
    }

    function convertImage() {
        if (!uploadedFile) {
            alert('Please upload an image first');
            return;
        }
        
        // Show loading modal
        loadingModal.classList.remove('hidden');
        
        // Simulate conversion progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            conversionProgress.style.width = `${progress}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(finishConversion, 500);
            }
        }, 200);
    }

    function finishConversion() {
        // Hide loading modal
        loadingModal.classList.add('hidden');
        
        // In a real app, this would be the actual converted image from your API
        // For demo purposes, we're just using the original image
        convertedFileUrl = originalImage.src;
        convertedImage.src = convertedFileUrl;
        
        // Simulate converted image info
        const img = new Image();
        img.onload = function() {
            // 4x resolution for 4K
            const upscaleFactor = parseInt(document.getElementById('upscaleFactor').value);
            const newWidth = img.width * upscaleFactor;
            const newHeight = img.height * upscaleFactor;
            
            convertedResolution.textContent = `${newWidth} × ${newHeight}`;
            
            // Simulate larger file size
            const originalSizeBytes = uploadedFile.size;
            const convertedSizeBytes = originalSizeBytes * (upscaleFactor / 2); // Rough estimate
            convertedSize.textContent = formatFileSize(convertedSizeBytes);
            
            // Show result area
            resultArea.classList.remove('hidden');
            
            // Scroll to results
            resultArea.scrollIntoView({ behavior: 'smooth' });
        };
        img.src = convertedFileUrl;
    }

    function downloadImage() {
        if (!convertedFileUrl) return;
        
        const a = document.createElement('a');
        a.href = convertedFileUrl;
        
        // Get output format
        const outputFormat = document.getElementById('outputFormat').value;
        
        // Set download filename
        const originalName = uploadedFile.name.split('.')[0];
        a.download = `${originalName}_4k.${outputFormat}`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
    }

    // Demo: Load a sample image for the hero section
    const heroDemo = document.getElementById('hero-demo');
    heroDemo.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format';
});