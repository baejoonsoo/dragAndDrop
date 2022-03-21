const ball = document.querySelectorAll("#ball");

const getLocation = (oneBall) => {
  const { top, left, width, height } = oneBall.getBoundingClientRect();

  return {
    top: top + "px",
    left: left + "px",
    width: width * 1.5 + "px",
    height: height * 1.5 + "px",
  };
};

Object.keys(ball).map(async (key) => {
  const oneBall = ball[key];

  const { top, left, width, height } = await getLocation(oneBall);

  oneBall.style.width = width;
  oneBall.style.height = height;

  oneBall.style.position = "absolute";
  oneBall.style.zIndex = 1000;
  oneBall.style.top = top;
  oneBall.style.left = left;

  oneBall.addEventListener("mousedown", (event) => {
    //  공의 가장자리를 눌러도 공이 마우스포인터의 가장자리에 그대로 위치해 있게 한다
    let shiftX = event.clientX - oneBall.getBoundingClientRect().left;
    let shiftY = event.clientY - oneBall.getBoundingClientRect().top;

    // 초기 이동을 고려한 좌표 (pageX, pageY)로 공을 이동
    const moveAt = (pageX, pageY) => {
      oneBall.style.left = pageX - shiftX + "px";
      oneBall.style.top = pageY - shiftY + "px";
    };

    // 포인터 아래로 공을 이동
    // moveAt(event.pageX, event.pageY);

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    };

    document.addEventListener("mousemove", onMouseMove);

    oneBall.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      oneBall.onmouseup = null;
    });

    // 이런 문법도 있네...
    //이벤트리스너랑 똑같음...
    oneBall.ondragstart = () => {
      return false;
    };
  });
});
