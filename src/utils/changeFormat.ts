export const changeFormat = {
  outer: (content: string[]) => {
    const contentLength = content.length;
    if (contentLength === 1) return content[0];
    else return `${content[0]} 외 ${contentLength - 1}개`;
  },
};
