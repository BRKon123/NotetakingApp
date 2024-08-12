export const getHeaderTextSizeTailwindClasses = (level: number): string => {
  switch (level) {
    case 1:
      return "text-3xl font-bold";
    case 2:
      return "text-2xl font-bold";
    case 3:
      return "text-xl font-bold";
    case 4:
      return "text-lg font-bold";
    case 5:
      return "text-base font-bold";
    case 6:
      return "text-sm font-bold";
    default:
      return "";
  }
};

export const isValidMarkdownHeading = (str: string): boolean =>
  /^#{1,6}$/.test(str);
