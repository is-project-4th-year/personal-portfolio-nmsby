# 🌟 Nelson Muyodi - Portfolio Website

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://is-project-4th-year.github.io/personal-portfolio-nmsby/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)](https://developers.google.com/web/tools/lighthouse)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-blue)](https://www.w3.org/WAI/WCAG21/quickref/)

> A modern, responsive portfolio website showcasing the skills and projects of Nelson Masbayi Muyodi, Computer Science student at Strathmore University.

## 🚀 Live Demo

**Website:** [https://is-project-4th-year.github.io/personal-portfolio-nmsby/](https://is-project-4th-year.github.io/personal-portfolio-nmsby/)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Deployment](#deployment)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

### Core Features
- 📱 **Fully Responsive Design** - Optimized for all devices
- 🎨 **Modern UI/UX** - Clean, professional design
- ⚡ **Fast Performance** - Optimized loading and interactions
- ♿ **Accessibility Compliant** - WCAG 2.1 AA standards
- 🔍 **SEO Optimized** - Structured data and meta tags
- 🌐 **PWA Ready** - Service worker and manifest

### Interactive Elements
- 🎯 **Smooth Scrolling Navigation** - Seamless section transitions
- ✨ **Animated Progress Bars** - Visual skill representation
- 🔄 **Project Filtering** - Dynamic content filtering
- 📝 **Form Validation** - Real-time input validation
- 🎪 **Hover Effects** - Engaging micro-interactions
- 📊 **Counter Animations** - Animated statistics

### Advanced Features
- 🚀 **Lazy Loading** - Optimized image loading
- 💾 **Offline Support** - Service worker caching
- 🎨 **Custom Cursor** - Enhanced desktop experience
- 🔊 **Screen Reader Support** - Full accessibility
- 📱 **Touch Gestures** - Mobile-friendly interactions
- 🌙 **Reduced Motion** - Accessibility preferences

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript ES6+** - Interactive functionality
- **Font Awesome** - Icons and symbols
- **Google Fonts** - Typography (Poppins)

### Development Tools
- **NPM** - Package management
- **Terser** - JavaScript minification
- **Clean-CSS** - CSS optimization
- **HTML Minifier** - HTML compression

### Deployment & CI/CD
- **GitHub Actions** - Automated deployment
- **GitHub Pages** - Static site hosting
- **Service Worker** - Offline functionality
- **PWA** - Progressive Web App features

## 📁 Project Structure

```
personal-portfolio-nmsby/
├── 📄 index.html              # Main HTML file
├── 📁 css/
│   ├── 📄 style.css          # Main stylesheet
│   ├── 📄 responsive.css     # Responsive design
│   └── 📁 components/        # Modular CSS components
├── 📁 js/
│   ├── 📄 main.js           # Main JavaScript
│   └── 📁 components/       # Modular JS components
├── 📁 assets/
│   ├── 📁 images/           # Optimized images
│   ├── 📁 icons/            # App icons
│   └── 📁 docs/             # Documents
├── 📁 .github/
│   ├── 📁 workflows/        # GitHub Actions
│   └── 📁 ISSUE_TEMPLATE/   # Issue templates
├── 📄 sw.js                 # Service Worker
├── 📄 manifest.json         # PWA Manifest
├── 📄 sitemap.xml          # SEO Sitemap
├── 📄 robots.txt           # Search engine rules
├── 📄 package.json         # Dependencies
└── 📄 README.md            # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- Git
- Modern web browser

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/is-project-4th-year/personal-portfolio-nmsby.git
cd personal-portfolio-nmsby
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run serve
```

4. **Open in browser**
```
http://localhost:3000
```

## 💻 Usage

### Development Commands

```bash
# Start development server
npm run serve

# Build for production
npm run build

# Run tests
npm test

# Validate code
npm run validate
```

### Customization

1. **Update Personal Information**
    - Edit `index.html` for content
    - Update `assets/images/` for photos
    - Modify `assets/docs/` for documents

2. **Styling Changes**
    - Main styles in `css/style.css`
    - Component styles in `css/components/`
    - Responsive design in `css/responsive.css`

3. **JavaScript Functionality**
    - Core logic in `js/main.js`
    - Component scripts in `js/components/`

## 🏗️ Development

### Workflow
1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push branch: `git push origin feature/feature-name`
4. Create Pull Request
5. Review and merge

### Code Standards
- **HTML**: Semantic, accessible markup
- **CSS**: BEM methodology, mobile-first
- **JavaScript**: ES6+, modular architecture
- **Commits**: Conventional commit messages

### Testing
- Cross-browser compatibility
- Responsive design testing
- Accessibility validation
- Performance auditing

## 📦 Deployment

### Automatic Deployment
- Pushes to `main` branch trigger GitHub Actions
- Automated build and optimization
- Deployment to GitHub Pages

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy `dist/` folder to hosting service
3. Configure domain and SSL

### Environment Variables
- `NODE_ENV`: Development/production environment
- `BASE_URL`: Base URL for deployment

## ⚡ Performance

### Metrics
- **Lighthouse Score**: 95+ (All categories)
- **First Contentful Paint**: < 2.5s
- **Largest Contentful Paint**: < 4.0s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimizations
- Image lazy loading and compression
- CSS and JavaScript minification
- Service worker caching
- Font optimization
- Critical CSS inlining

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

### Testing Tools
- Lighthouse Accessibility Audit
- WAVE Web Accessibility Evaluator
- Screen reader testing (NVDA, JAWS)
- Keyboard navigation testing

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Nelson Masbayi Muyodi**
- 📧 Email: [nelson.muyodi@strathmore.edu](mailto:nelson.muyodi@strathmore.edu)
- 💼 LinkedIn: [linkedin.com/in/nelsonmuyodi](https://linkedin.com/in/nelsonmuyodi)
- 🐙 GitHub: [github.com/nelsonmuyodi](https://github.com/nelsonmuyodi)
- 🌐 Portfolio: [https://is-project-4th-year.github.io/personal-portfolio-nmsby/](https://is-project-4th-year.github.io/personal-portfolio-nmsby/)

---

## 🙏 Acknowledgments

- **Strathmore University** - For providing excellent education
- **GitHub** - For hosting and CI/CD platform
- **Open Source Community** - For amazing tools and libraries
- **Instructors** - For guidance and support

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>Built with ❤️ by Nelson Muyodi</p>
</div>