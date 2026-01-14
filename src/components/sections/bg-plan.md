# Animated Background Implementation Plan

I will implement a reusable, modern "Web3-style" animated background to enhance the visual appeal of the website.

## New Component: `AnimatedBackground`
- **Location**: `src/components/ui/animated-background.tsx`
- **Features**:
  - **Dynamic Gradient Orbs**: Moving blobs of color (Primary, Purple, Blue) using `framer-motion`.
  - **Grid Overlay**: A subtle vector grid pattern that adds structure.
  - **Noise Texture**: An optional grain overlay for texture.
  - **Props**: `className`, `intensity` (to control opacity).

## Component Updates

### 1. `Hero.tsx`
- Replace (or enhance) the current manual blob animation with the new `AnimatedBackground`.
- Ensure content remains readable above the animation.

### 2. `Features.tsx`
- Add `AnimatedBackground` with lower intensity.
- Set `overflow-hidden` on the section to contain the animation.

### 3. `Pricing.tsx`
- Add `AnimatedBackground` to the section.
- Use a specific color variant if needed (e.g., gold/purple for premium feel).

### 4. `Newsletter.tsx`
- Replace current simple blobs with the standardized component.

## Verification
- **Visual Inspection**: Manually check `localhost:3000` to ensure:
  - Animations are smooth (60fps).
  - Text contrast is maintained.
  - The design feels cohesive and "modern".
- **Responsive Check**: Ensure animations don't break mobile layout (horizontal scroll issues).
