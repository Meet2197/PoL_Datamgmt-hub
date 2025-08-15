const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Resources files (your frontend HTML, CSS, JS) from the 'Resources' directory
// Assumes CSS is in Resources/css/ and JS is in Resources/js/
app.use('/Resources', express.Resources(path.join(__dirname, 'Resources')));

// --- Migrate SOFTWARE_DATA from app.py ---
const SOFTWARE_DATA = {
    'elabftw': {
        'name': 'eLabFTW',
        'description': 'A free and open source electronic lab notebook for researchers',
        'url': 'https://www.elabftw.net/',
        'github': 'https://github.com/elabftw/elabftw',
        'category': 'Lab Management',
        'features': ['Open Source', 'Multi-team Support', 'Database Integration'],
        'institution_access': 'Available at CMCB TUD',
        'support_email': 'elabftw-support@cmcb.tu-dresden.de'
    },
    'omero': {
        'name': 'OMERO',
        'description': 'Open Microscopy Environment Remote Objects for bioimage data management',
        'url': 'https://www.openmicroscopy.org/omero/',
        'github': 'https://github.com/ome/openmicroscopy',
        'category': 'Image Management',
        'features': ['Image Management', 'Multi-format Support', 'Web Interface'],
        'institution_access': 'Available at CMCB TUD',
        'support_email': 'omero-support@cmcb.tu-dresden.de'
    },
    'bioimage_archive': {
        'name': 'Bio-image Archive',
        'description': 'Repository for life-sciences microscopy data',
        'url': 'https://www.ebi.ac.uk/bioimage-archive/',
        'github': 'https://github.com/IDR/bioimage-archive',
        'category': 'Data Repository',
        'features': ['Data Repository', 'Reproducibility', 'Public Access'],
        'institution_access': 'Public Access',
        'support_email': 'bioimage-archive@ebi.ac.uk'
    },
    'bioimage_io': {
        'name': 'bioimage.io',
        'description': 'BioImage Model Zoo - AI models for bioimage analysis',
        'url': 'https://bioimage.io/',
        'github': 'https://github.com/bioimage-io/bioimage.io',
        'category': 'AI/ML Models',
        'features': ['AI Models', 'Community Driven', 'Standardized'],
        'institution_access': 'Public Access',
        'support_email': 'bioimage-io@embl.de'
    },
    'image_sc': {
        'name': 'image.sc',
        'description': 'Scientific image analysis community forum',
        'url': 'https://forum.image.sc/',
        'github': 'https://github.com/imagesc/forum.image.sc',
        'category': 'Community',
        'features': ['Community Forum', 'Expert Support', 'Knowledge Base'],
        'institution_access': 'Public Access',
        'support_email': 'admin@image.sc'
    }
};

// --- API Endpoints (replacing Flask routes) ---

// Main page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// API endpoint to get software data
app.get('/api/software', (req, res) => {
    try {
        res.json({
            success: true,
            data: SOFTWARE_DATA,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(`Error fetching software data: ${error.message}`);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get details for specific software
app.get('/api/software/:software_id', (req, res) => {
    try {
        const softwareId = req.params.software_id;
        if (SOFTWARE_DATA[softwareId]) {
            res.json({
                success: true,
                data: SOFTWARE_DATA[softwareId]
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Software not found'
            });
        }
    } catch (error) {
        console.error(`Error fetching software details: ${error.message}`);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Handle contact form submissions
app.post('/api/contact', (req, res) => {
    try {
        const data = req.body;

        // Validate required fields
        const requiredFields = ['name', 'email', 'message'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return res.status(400).json({
                    success: false,
                    error: `Missing required field: ${field}`
                });
            }
        }

        console.info(`Contact form submission from ${data.email}`);
        // In a real application, you would save to a database or send an email here.

        res.json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.'
        });
    } catch (error) {
        console.error(`Error handling contact form: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'An error occurred processing your request'
        });
    }
});

// Search software by name or description
app.get('/api/search', (req, res) => {
    try {
        const query = (req.query.q || '').toLowerCase();

        if (!query) {
            return res.status(400).json({
                success: false,
                error: 'Search query is required'
            });
        }

        const results = {};
        for (const softwareId in SOFTWARE_DATA) {
            const softwareData = SOFTWARE_DATA[softwareId];
            if (
                softwareData.name.toLowerCase().includes(query) ||
                softwareData.description.toLowerCase().includes(query) ||
                softwareData.features.some(feature => feature.toLowerCase().includes(query))
            ) {
                results[softwareId] = softwareData;
            }
        }

        res.json({
            success: true,
            data: results,
            query: query
        });
    } catch (error) {
        console.error(`Error searching software: ${error.message}`);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Track user interactions for analytics
app.post('/api/analytics', (req, res) => {
    try {
        const data = req.body;
        console.info(`Analytics event: ${JSON.stringify(data)}`);
        // In a real application, you would save this to an analytics database.
        res.json({
            success: true
        });
    } catch (error) {
        console.error(`Error tracking analytics: ${error.message}`);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get additional resources and links
app.get('/api/resources', (req, res) => {
    try {
        const resources = {
            'documentation': {
                'elabftw': 'https://doc.elabftw.net/',
                'omero': 'https://omero-guides.readthedocs.io/',
                'imagej': 'https://imagej.net/learn/'
            },
            'training': {
                // Corrected YouTube URL format
                'ome_youtube': 'https://www.youtube.com/user/OpenMicroscopyEnvironment',
                'community_forum': 'https://forum.image.sc/c/usage-help/9',
                'bioimage_docs': 'https://bioimage.io/docs/'
            },
            'support': {
                'cmcb_support': 'support@cmcb.tu-dresden.de',
                'cmcb_website': 'https://www.cmcb.tu-dresden.de/',
                'tud_portal': 'https://tu-dresden.de/'
            }
        };

        res.json({
            success: true,
            data: resources
        });
    } catch (error) {
        console.error(`Error fetching resources: ${error.message}`);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Custom 404 page (serve HTML file)
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'templates', '404.html'));
});

// Custom 500 page (serve HTML file)
app.use((err, req, res, next) => {
    console.error(`Internal server error: ${err.message}`);
    res.status(500).sendFile(path.join(__dirname, 'templates', '500.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});