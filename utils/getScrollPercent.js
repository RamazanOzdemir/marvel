const getScrollPercent = () =>
  ((document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight) || 0) * 100;

export default getScrollPercent;
