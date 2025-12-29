from PIL import Image, ImageDraw, ImageFont
import math

# Create a high-resolution image for the logo
width, height = 800, 300
image = Image.new('RGB', (width, height), color='white')
draw = ImageDraw.Draw(image)

# Define colors
primary_blue = (37, 99, 235)  # #2563eb
secondary_green = (16, 185, 129)  # #10b981
accent_orange = (245, 158, 11)  # #f59e0b
dark_gray = (31, 41, 55)  # #1f2937

# Draw background gradient effect (circles)
for i in range(5):
    radius = 150 - i * 30
    alpha = 30 - i * 5
    # Create semi-transparent circles
    circle_img = Image.new('RGBA', (width, height), (255, 255, 255, 0))
    circle_draw = ImageDraw.Draw(circle_img)
    circle_draw.ellipse([100 - radius, 150 - radius, 100 + radius, 150 + radius], 
                        fill=(37, 99, 235, alpha))
    image.paste(circle_img, (0, 0), circle_img)

# Draw the icon - a stylized compass/target representing feasibility assessment
center_x, center_y = 120, 150

# Outer circle
draw.ellipse([center_x - 60, center_y - 60, center_x + 60, center_y + 60], 
             outline=primary_blue, width=6)

# Inner circles (target rings)
draw.ellipse([center_x - 45, center_y - 45, center_x + 45, center_y + 45], 
             outline=secondary_green, width=4)
draw.ellipse([center_x - 30, center_y - 30, center_x + 30, center_y + 30], 
             outline=accent_orange, width=4)

# Center dot
draw.ellipse([center_x - 10, center_y - 10, center_x + 10, center_y + 10], 
             fill=primary_blue)

# Draw compass points (4 directions)
for angle in [0, 90, 180, 270]:
    rad = math.radians(angle)
    x1 = center_x + 50 * math.cos(rad)
    y1 = center_y + 50 * math.sin(rad)
    x2 = center_x + 65 * math.cos(rad)
    y2 = center_y + 65 * math.sin(rad)
    draw.line([x1, y1, x2, y2], fill=primary_blue, width=5)

# Draw checkmark in the center
check_points = [
    (center_x - 8, center_y),
    (center_x - 2, center_y + 6),
    (center_x + 8, center_y - 6)
]
draw.line(check_points, fill='white', width=4, joint='curve')

# Add text "FeasiQuest"
try:
    # Try to use a nice font
    font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
    font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)
except:
    # Fallback to default font
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Main text
text = "FeasiQuest"
text_bbox = draw.textbbox((0, 0), text, font=font_large)
text_width = text_bbox[2] - text_bbox[0]
text_x = 250
text_y = 100

# Draw text with slight shadow for depth
draw.text((text_x + 2, text_y + 2), text, fill=(0, 0, 0, 50), font=font_large)
draw.text((text_x, text_y), text, fill=dark_gray, font=font_large)

# Tagline
tagline = "Mastering Clinical Trial Feasibility"
tagline_bbox = draw.textbbox((0, 0), tagline, font=font_small)
tagline_width = tagline_bbox[2] - tagline_bbox[0]
tagline_x = 250
tagline_y = 190

draw.text((tagline_x, tagline_y), tagline, fill=primary_blue, font=font_small)

# Save the logo
image.save('FeasiQuest_Logo.png', 'PNG', quality=95)
print("Logo created successfully: FeasiQuest_Logo.png")