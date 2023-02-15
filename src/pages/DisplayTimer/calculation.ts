export const toGetTime = (time: number) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  let duration = `00 : ${minutes < 10 ? "0" + minutes : minutes} : ${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  return duration;
};


