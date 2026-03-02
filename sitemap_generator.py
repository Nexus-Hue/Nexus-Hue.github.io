#!/usr/bin/env python3
"""
Static Site Sitemap Generator for NexusHue
Scans a local folder for HTML files and generates an XML sitemap
"""

import os
import sys
from datetime import datetime
from pathlib import Path
import re

def get_priority(path):
    """Determine priority based on URL depth and type"""
    # Homepage gets highest priority
    if path == '' or path == 'index.html':
        return '1.00'
    
    # Count directory depth
    depth = path.count('/')
    
    # Main pages (about, services, contact, etc.) - high priority
    if depth == 0 or (depth == 1 and not path.startswith('blog/')):
        return '0.80'
    
    # Blog posts and deeper pages
    if depth >= 1:
        return '0.64'
    
    return '0.64'

def clean_url(file_path, base_path):
    """Convert file path to clean URL"""
    # Get relative path from base
    rel_path = os.path.relpath(file_path, base_path)
    
    # Convert backslashes to forward slashes (Windows compatibility)
    rel_path = rel_path.replace('\\', '/')
    
    # Remove index.html from paths
    if rel_path.endswith('/index.html'):
        rel_path = rel_path[:-10]  # Remove 'index.html'
    elif rel_path == 'index.html':
        rel_path = ''
    elif rel_path.endswith('.html'):
        rel_path = rel_path[:-5]  # Remove '.html' extension
    
    return rel_path

def find_html_files(directory):
    """Recursively find all HTML files in directory"""
    html_files = []
    
    for root, dirs, files in os.walk(directory):
        # Skip common directories that shouldn't be in sitemap
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.cache', '__pycache__', 'assets', 'css', 'js', 'images', 'img', 'fonts']]
        
        for file in files:
            if file.endswith('.html') and not file.startswith('.'):
                full_path = os.path.join(root, file)
                html_files.append(full_path)
    
    return sorted(html_files)

def generate_sitemap(website_folder, domain):
    """Generate XML sitemap from local website files"""
    
    if not os.path.exists(website_folder):
        print(f"Error: Folder '{website_folder}' does not exist!")
        return None
    
    html_files = find_html_files(website_folder)
    
    if not html_files:
        print(f"Error: No HTML files found in '{website_folder}'")
        return None
    
    print(f"Found {len(html_files)} HTML files")
    
    # Get current date in ISO format
    current_date = datetime.now().strftime('%Y-%m-%dT%H:%M:%S+00:00')
    
    # Build XML sitemap
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
        '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ]
    
    # Process each HTML file
    urls_added = []
    for html_file in html_files:
        url_path = clean_url(html_file, website_folder)
        full_url = f"{domain.rstrip('/')}/{url_path}"
        
        # Ensure URL ends with / for directories (except homepage)
        if url_path and not url_path.endswith('.html') and '.' not in url_path.split('/')[-1]:
            full_url += '/'
        
        priority = get_priority(url_path)
        
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{full_url}</loc>')
        xml_lines.append(f'    <lastmod>{current_date}</lastmod>')
        xml_lines.append(f'    <priority>{priority}</priority>')
        xml_lines.append('  </url>')
        
        urls_added.append(full_url)
    
    xml_lines.append('</urlset>')
    
    # Print preview
    print("\n=== URLs that will be in sitemap ===")
    for url in urls_added:
        print(f"  {url}")
    
    return '\n'.join(xml_lines)

def main():
    print("=" * 60)
    print("NexusHue Sitemap Generator")
    print("=" * 60)
    
    # Get website folder
    if len(sys.argv) > 1:
        website_folder = sys.argv[1]
    else:
        website_folder = input("\nEnter the path to your website folder: ").strip('"').strip("'")
    
    # Get domain
    if len(sys.argv) > 2:
        domain = sys.argv[2]
    else:
        domain = input("Enter your domain (e.g., https://www.nexushue.com): ").strip()
    
    if not domain.startswith('http'):
        domain = 'https://' + domain
    
    print(f"\nScanning: {website_folder}")
    print(f"Domain: {domain}\n")
    
    # Generate sitemap
    sitemap_xml = generate_sitemap(website_folder, domain)
    
    if sitemap_xml:
        # Save to file
        output_file = 'sitemap.xml'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(sitemap_xml)
        
        print(f"\n✓ Sitemap generated successfully!")
        print(f"✓ Saved to: {os.path.abspath(output_file)}")
        print(f"\nNext steps:")
        print(f"1. Upload 'sitemap.xml' to your website root folder")
        print(f"2. Submit to Google Search Console: {domain}/sitemap.xml")
        print(f"3. Add to robots.txt: Sitemap: {domain}/sitemap.xml")
    else:
        print("\n✗ Failed to generate sitemap")

if __name__ == '__main__':
    main()
