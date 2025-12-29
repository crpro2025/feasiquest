from PIL import Image, ImageDraw, ImageFont
import math

# Create a high-resolution image for the logo
width, height = 1000, 200
image = Image.new('RGB', (width, height), color='white')
draw = ImageDraw.Draw(image)

# Define colors
primary_blue = (37, 99, 235)  # #2563eb
secondary_green = (16, 185, 129)  # #10b981
accent_orange = (245, 158, 11)  # #f59e0b
dark_gray = (31, 41, 55)  # #1f2937
light_gray = (107, 114, 128)  # #6b7280

# Draw the icon - a stylized compass/target with checkmark
center_x, center_y = 100, 100

# Outer circle with gradient effect
for i in range(3):
    radius = 50 - i * 3
    alpha = 255 - i * 40
    color = tuple(list(primary_blue) + [alpha])
    draw.ellipse([center_x - radius, center_y - radius, center_x + radius, center_y + radius], 
                 outline=primary_blue, width=4)

# Inner circles (target rings)
draw.ellipse([center_x - 35, center_y - 35, center_x + 35, center_y + 35], 
             outline=secondary_green, width=3)
draw.ellipse([center_x - 20, center_y - 20, center_x + 20, center_y + 20], 
             outline=accent_orange, width=3)

# Center dot
draw.ellipse([center_x - 8, center_y - 8, center_x + 8, center_y + 8], 
             fill=primary_blue)

# Draw compass points (4 directions)
for angle in [0, 90, 180, 270]:
    rad = math.radians(angle)
    x1 = center_x + 40 * math.cos(rad)
    y1 = center_y + 40 * math.sin(rad)
    x2 = center_x + 55 * math.cos(rad)
    y2 = center_y + 55 * math.sin(rad)
    draw.line([x1, y1, x2, y2], fill=primary_blue, width=4)

# Draw checkmark in the center
check_points = [
    (center_x - 6, center_y),
    (center_x - 1, center_y + 5),
    (center_x + 6, center_y - 5)
]
draw.line(check_points, fill='white', width=3, joint='curve')

# Add text "FeasiQuest"
try:
    font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 70)
    font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
except:
    font_large = ImageFont.load_default()
    font_medium = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Main text "FeasiQuest"
text = "FeasiQuest"
text_x = 220
text_y = 50

# Draw text with slight shadow for depth
draw.text((text_x + 2, text_y + 2), text, fill=(0, 0, 0, 30), font=font_large)
draw.text((text_x, text_y), text, fill=dark_gray, font=font_large)

# Tagline "Mastering Clinical Trial Feasibility"
tagline = "Mastering Clinical Trial Feasibility"
tagline_x = 220
tagline_y = 125
draw.text((tagline_x, tagline_y), tagline, fill=primary_blue, font=font_medium)

# "by Clinical Research Pro" text
byline = "by Clinical Research Pro"
byline_x = 220
byline_y = 155
draw.text((byline_x, byline_y), byline, fill=light_gray, font=font_small)

# Save the logo
image.save('FeasiQuest_Logo_New.png', 'PNG', quality=95)
print("New logo created successfully: FeasiQuest_Logo_New.png")