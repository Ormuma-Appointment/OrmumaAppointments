declare module '*.module.css' {
    interface CssExports {
      [key: string]: string;
    }
    const cssExports: CssExports;
    export default cssExports;
  }
  