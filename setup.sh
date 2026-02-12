#!/bin/bash
# Portfolio Setup Script

echo "🚀 Setting up Prathvir's Professional Portfolio Website"
echo "======================================================"
echo ""

# Check if files exist
echo "✅ Checking project structure..."

files_to_check=(
    "index.html"
    "about.html"
    "projects.html"
    "services.html"
    "contact.html"
    "testimonials.html"
    "resume.html"
    "assets/css/style.css"
    "assets/css/animation.css"
    "assets/css/theme.css"
    "assets/css/rsponsive.css"
    "assets/js/main.js"
    "assets/js/animation.js"
    "assets/js/form.js"
    "assets/js/theme-toggle.js"
    "assets/data/projects.json"
    "assets/data/skills.json"
    "components/navbar.html"
    "components/footer.html"
    "seo/meta.html"
    "package.json"
    "mainfest.json"
    "README.md"
)

missing_files=0
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file (MISSING)"
        ((missing_files++))
    fi
done

echo ""
if [ $missing_files -eq 0 ]; then
    echo "✅ All files present!"
else
    echo "⚠️  $missing_files file(s) missing"
fi

echo ""
echo "🌐 To start the website locally, run:"
echo ""
echo "  Python 3:     python -m http.server 8000"
echo "  Python 2:     python -m SimpleHTTPServer 8000"
echo "  Node.js:      npx http-server"
echo ""
echo "Then open: http://localhost:8000"
echo ""
echo "📚 Documentation:"
echo "  - README.md        - Full documentation"
echo "  - QUICKSTART.md    - Quick start guide"
echo "  - IMPLEMENTATION.md - Implementation details"
echo ""
echo "✨ Your portfolio is ready to go! 🎉"
