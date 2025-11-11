# Service Images Setup

## Image Files Needed

Place the following images in the `/public/services/` directory:

### 1. Namaste Bharat Ice Cream Banner
**Filename:** `namaste-bharat-icecream.jpg`
**Source:** First image provided (banner with logo and contact info)
- Shows: Namaste Bharat Ice Cream branding
- GSTIN: 10DOVPK4627H2ZR
- Location: Konhwa, Gopalganj (Bihar)
- Contact: 9931584900

### 2. Vahan Beema Kendra (Vehicle Insurance)
**Filename:** `vahan-beema.jpg`
**Source:** Second image provided (vehicle insurance banner)
- Shows: Various vehicles (bike, truck, car, bus, JCB)
- Text: "वाहन बीमा केन्द्र" 
- Insurance for 1st & 3rd party
- Multiple brand logos

### 3. Ravi Enterprises Tour & Travels
**Filename:** `ravi-enterprises.jpg`
**Source:** Third and Fourth images provided (travel services)
- Shows: Air travel, bus services
- Services: Railway tickets, passport, visa, driving license
- Konhwa more Mod, Gopalganj
- Contact: 9931584900

## How to Add Images

1. Save the images you provided to this directory:
   ```
   /Users/gulshan36/Desktop/Nameste bahart/public/services/
   ```

2. Rename them as:
   - `namaste-bharat-icecream.jpg` (First banner image)
   - `vahan-beema.jpg` (Vehicle insurance banner)
   - `ravi-enterprises.jpg` (Travel services banner)

3. The page will automatically display them!

## Current Images

The Our Services page is configured to display these images. If the images are not found, the page will still work perfectly - the image spaces will be hidden automatically.

## Optional: Use Images from Assets

Alternatively, you can:
1. Place images in `/src/assets/services/`
2. Update the image imports in `OurServices.tsx`
3. Use import statements instead of public path

---

**Note:** The page is fully functional with or without images. The content and design are complete!
