declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}

// For CSS modules (files imported as modules with classes)
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// For global CSS files (side-effect imports)
declare module "*.css";

// Handle side-effect only imports
declare module "./globals.css" {
  const content: never;
  export default content;
}
